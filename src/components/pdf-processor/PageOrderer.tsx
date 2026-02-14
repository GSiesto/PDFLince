"use client";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { getPdfPageCount, renderPdfThumbnail } from '../../lib/pdf-processor';
import { useDictionary } from '../../i18n/LocaleProvider';

type PageOrdererProps = {
  file: File;
  onOrderChangeAction: (newOrder: number[]) => void;
  initialOrder?: number[];
};

const ordersMatch = (a: number[], b: number[]) => {
  if (a.length !== b.length) {
    return false;
  }

  for (let index = 0; index < a.length; index += 1) {
    if (a[index] !== b[index]) {
      return false;
    }
  }

  return true;
};

export default function PageOrderer({ file, onOrderChangeAction, initialOrder }: PageOrdererProps) {
  const [pageCount, setPageCount] = useState<number>(0);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [pageOrder, setPageOrder] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [draggedPage, setDraggedPage] = useState<number | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);
  const [dragImage, setDragImage] = useState<HTMLElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const initializedRef = useRef(false);
  const lastSwappedRef = useRef<{ from: number; to: number } | null>(null);
  const onOrderChangeActionRef = useRef(onOrderChangeAction);
  const initialOrderRef = useRef<number[] | undefined>(initialOrder);
  const dictionary = useDictionary();
  const ordererStrings = dictionary.components.pageOrderer;
  const fileListStrings = dictionary.components.fileList;

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, pageOrder.length);
  }, [pageOrder.length]);

  useEffect(() => {
    onOrderChangeActionRef.current = onOrderChangeAction;
  }, [onOrderChangeAction]);

  useEffect(() => {
    initialOrderRef.current = initialOrder;
  }, [initialOrder]);

  useEffect(() => {
    let isMounted = true;

    async function loadPdfInfo() {
      setLoading(true);
      setError(null);
      try {
        const count = await getPdfPageCount(file);
        if (!isMounted) return;
        setPageCount(count);

        const defaultOrder = Array.from({ length: count }, (_, i) => i + 1);

        const inputInitial = initialOrderRef.current;
        const normalizedInitial = Array.isArray(inputInitial)
          ? inputInitial.filter(page => Number.isInteger(page) && page >= 1 && page <= count)
          : [];

        const startingOrder =
          normalizedInitial.length === count && new Set(normalizedInitial).size === count
            ? [...normalizedInitial]
            : defaultOrder;

        setPageOrder(startingOrder);

        if (!initializedRef.current) {
          initializedRef.current = true;
          onOrderChangeActionRef.current(startingOrder);
        }

        const maxPages = Math.min(count, 120);
        setThumbnails([]); // Reset

        for (let i = 1; i <= maxPages; i++) {
          if (!isMounted) return;
          const thumbnail = await renderPdfThumbnail(file, i);
          if (!isMounted) return;
          setThumbnails(prev => [...prev, thumbnail]);
          // Small yield to ensure UI updates
          await new Promise(resolve => setTimeout(resolve, 0));
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Error loading PDF info:', err);
        setError(ordererStrings.error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (file) {
      loadPdfInfo();
    }

    return () => {
      isMounted = false;
      initializedRef.current = false;
    };
  }, [file, ordererStrings.error]);

  useEffect(() => {
    if (!initialOrder || initialOrder.length === 0 || pageCount === 0) {
      return;
    }

    const normalizedInitial = initialOrder.filter(
      page => Number.isInteger(page) && page >= 1 && page <= pageCount
    );

    if (
      normalizedInitial.length !== pageCount ||
      new Set(normalizedInitial).size !== pageCount
    ) {
      return;
    }

    if (ordersMatch(pageOrder, normalizedInitial)) {
      return;
    }

    setPageOrder([...normalizedInitial]);
  }, [initialOrder, pageCount, pageOrder]);

  const movePage = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === pageOrder.length - 1)
    ) {
      return;
    }

    const newOrder = [...pageOrder];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    const item = itemRefs.current[index];
    const targetItem = itemRefs.current[newIndex];

    if (item && targetItem) {
      item.classList.add(direction === 'up' ? 'move-up' : 'move-down');
      targetItem.classList.add(direction === 'up' ? 'move-down' : 'move-up');

      setTimeout(() => {
        [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
        setPageOrder(newOrder);
        onOrderChangeActionRef.current(newOrder);

        setTimeout(() => {
          if (itemRefs.current[index]) {
            itemRefs.current[index].classList.remove('move-up', 'move-down');
          }
          if (itemRefs.current[newIndex]) {
            itemRefs.current[newIndex].classList.remove('move-up', 'move-down');
          }
        }, 850); // Match the longer animation duration
      }, 50);
    } else {
      [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
      setPageOrder(newOrder);
      onOrderChangeActionRef.current(newOrder);
    }
  };

  const animateButtonPress = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const button = event.currentTarget;

    button.classList.remove('btn-press-animation');
    void button.offsetWidth;
    button.classList.add('btn-press-animation');

    const item = itemRefs.current[index];
    if (item) {
      item.classList.add('item-flash-animation');
      setTimeout(() => {
        item.classList.remove('item-flash-animation');
      }, 300);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation();
    setIsDragging(true);
    setDraggedPage(index);

    e.dataTransfer.effectAllowed = 'move';

    const rect = e.currentTarget.getBoundingClientRect();
    const ghost = e.currentTarget.cloneNode(true) as HTMLElement;

    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    ghost.style.transform = 'rotate(3deg) scale(0.95)';
    ghost.style.opacity = '0.8';
    ghost.style.position = 'absolute';
    ghost.style.top = '-1000px';
    ghost.style.left = '-1000px';
    ghost.style.zIndex = '9999';
    ghost.style.pointerEvents = 'none';
    ghost.style.boxShadow = '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)';
    ghost.style.transition = 'none';
    ghost.classList.add('dragging-ghost');

    document.body.appendChild(ghost);

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    e.dataTransfer.setDragImage(ghost, offsetX, offsetY);

    setDragImage(ghost);

    if (containerRef.current) {
      containerRef.current.classList.add('is-dragging');
    }

    if (itemRefs.current[index]) {
      itemRefs.current[index].classList.add('dragging');
    }

    lastSwappedRef.current = null;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();

    if (!isDragging || draggedPage === null || draggedPage === index) {
      return;
    }

    setDraggedOverIndex(index);

    if (
      lastSwappedRef.current &&
      lastSwappedRef.current.from === draggedPage &&
      lastSwappedRef.current.to === index
    ) {
      return;
    }

    const targetRect = e.currentTarget.getBoundingClientRect();
    const targetMidY = targetRect.top + targetRect.height / 2;

    const shouldReorder =
      (draggedPage < index && e.clientY > targetMidY) ||
      (draggedPage > index && e.clientY < targetMidY);

    if (shouldReorder) {
      lastSwappedRef.current = { from: draggedPage, to: index };

      const newOrder = [...pageOrder];
      const movedPage = newOrder[draggedPage];

      newOrder.splice(draggedPage, 1);
      newOrder.splice(index, 0, movedPage);

      setPageOrder(newOrder);
      onOrderChangeActionRef.current(newOrder);
      setDraggedPage(index);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (!isDragging || draggedPage === null || draggedPage === index) return;
    setDraggedOverIndex(index);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDraggedOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (!isDragging || draggedPage === null) return;

    if (itemRefs.current[index]) {
      itemRefs.current[index].classList.add('item-drop-animation');
      setTimeout(() => {
        if (itemRefs.current[index]) {
          itemRefs.current[index].classList.remove('item-drop-animation');
        }
      }, 300);
    }

    setDraggedOverIndex(null);
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    itemRefs.current.forEach((item) => {
      if (item) item.classList.remove('dragging');
    });

    if (dragImage) {
      document.body.removeChild(dragImage);
      setDragImage(null);
    }

    if (containerRef.current) {
      containerRef.current.classList.remove('is-dragging');
      containerRef.current.classList.add('reorder-complete');
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.classList.remove('reorder-complete');
        }
      }, 500);
    }

    setDraggedPage(null);
    setDraggedOverIndex(null);
    lastSwappedRef.current = null;
  };

  const resetOrder = () => {
    const originalOrder = Array.from({ length: pageCount }, (_, i) => i + 1);

    if (containerRef.current) {
      containerRef.current.classList.add('order-reset');
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.classList.remove('order-reset');
        }
      }, 500);
    }

    setPageOrder(originalOrder);
    onOrderChangeActionRef.current(originalOrder);
  };

  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="w-full max-w-md mx-auto">
          <div className="loading-dots mb-4">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="mb-2 text-[var(--tx-2)]">{ordererStrings.loading}</p>

          {/* Progress Bar */}
          <div className="w-full bg-[var(--ui-2)] rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-[var(--accent)] h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(100, (thumbnails.length / Math.max(1, Math.min(pageCount || 120, 120))) * 100)}%` }}
            ></div>
          </div>
          {pageCount > 0 && (
            <p className="mt-2 text-xs text-[var(--tx-3)]">
              {thumbnails.length} / {Math.min(pageCount, 120)}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  if (pageCount > 120) {
    return (
      <div className="text-center p-6 bg-[var(--bg-2)] rounded-lg">
        <p className="text-[var(--tx-2)] mb-4">{ordererStrings.limitReached(pageCount)}</p>
        <p className="text-[var(--tx-3)] text-sm">{ordererStrings.limitHint}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="text-sm text-[var(--tx-2)]">{ordererStrings.summary(pageCount)}</p>
        <button
          className="text-sm text-[var(--tx-3)] hover:text-[var(--accent)] transition-colors flex items-center"
          onClick={resetOrder}
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            ></path>
          </svg>
          {ordererStrings.reset}
        </button>
      </div>

      <div
        ref={containerRef}
        className="pl-2 pt-4 pb-4 pr-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 page-thumbnail-grid overflow-y-auto overflow-x-hidden max-h-[70vh]"
      >
        {pageOrder.map((pageNumber, index) => {
          const thumbnailIndex = pageNumber - 1;
          const thumbnail = thumbnailIndex < thumbnails.length ? thumbnails[thumbnailIndex] : null;

          return (
            <div
              key={`page-${pageNumber}`}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`page-thumbnail relative border rounded-md overflow-hidden transition-all duration-300
                ${draggedPage === index ? 'dragging scale-95 opacity-60 z-20 shadow-lg' : ''}
                ${draggedOverIndex === index ? 'drag-over scale-[1.02] z-10' : ''}
                ${isDragging ? (draggedPage === index ? 'cursor-grabbing' : '') : 'cursor-grab'} 
                hover:border-[var(--accent)] hover:shadow-md`}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              {draggedOverIndex === index && draggedPage !== null && (
                <div
                  className={`drop-indicator ${draggedPage < index ? 'drop-indicator-bottom' : 'drop-indicator-top'
                    }`}
                ></div>
              )}

              <div className="drag-handle absolute top-2 right-2 z-10 bg-[var(--ui-2)] rounded-full p-1 opacity-60 hover:opacity-100">
                <svg
                  className="w-4 h-4 text-[var(--tx-3)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8h16M4 16h16"
                  ></path>
                </svg>
              </div>

              <div className="aspect-[3/4] relative">
                {thumbnail ? (
                  <Image
                    src={thumbnail}
                    alt={ordererStrings.pageLabel(pageNumber)}
                    width={160}
                    height={200}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[var(--bg-2)]">
                    <span className="text-[var(--tx-2)]">{ordererStrings.pageLabel(pageNumber)}</span>
                  </div>
                )}
                <div className="absolute top-2 left-2 rounded-full w-6 h-6 flex items-center justify-center bg-[var(--accent)] text-white page-number">
                  {index + 1}
                </div>
              </div>

              <div className="bg-[var(--bg-2)] p-2 flex justify-between items-center">
                <span className="text-sm text-[var(--tx-2)]">{ordererStrings.originalLabel(pageNumber)}</span>
                <div className="flex space-x-1">
                  <button
                    className={`p-1 rounded hover:bg-[var(--ui-2)] text-[var(--tx-3)] ${index === 0
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:text-[var(--accent)]'
                      }`}
                    onClick={(e) => {
                      if (index > 0) {
                        animateButtonPress(e, index);
                        movePage(index, 'up');
                      }
                    }}
                    disabled={index === 0}
                    title={fileListStrings.moveUp}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      ></path>
                    </svg>
                  </button>
                  <button
                    className={`p-1 rounded hover:bg-[var(--ui-2)] text-[var(--tx-3)] ${index === pageOrder.length - 1
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:text-[var(--accent)]'
                      }`}
                    onClick={(e) => {
                      if (index < pageOrder.length - 1) {
                        animateButtonPress(e, index);
                        movePage(index, 'down');
                      }
                    }}
                    disabled={index === pageOrder.length - 1}
                    title={fileListStrings.moveDown}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-4 bg-[var(--bg-2)] rounded-lg">
        <p className="text-sm text-[var(--tx-2)]">{ordererStrings.instructions}</p>
      </div>
    </div>
  );
}
