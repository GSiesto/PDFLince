"use client";

import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useDictionary } from '../../i18n/LocaleProvider';
import { getPdfPageCount, renderPdfThumbnail } from '../../lib/pdf-processor';

type FileListProps = {
  files: File[];
  onMoveFileAction?: (index: number, direction: 'up' | 'down') => void;
  onRemoveFileAction: (index: number) => void;
  currentIndex?: number; // Selected file index for extraction
  onFileSelectAction?: (index: number) => void; // Handler for selecting a file
};

export default function FileList({ 
  files, 
  onMoveFileAction, 
  onRemoveFileAction, 
  currentIndex,
  onFileSelectAction 
}: FileListProps) {
  const dictionary = useDictionary();
  const fileListStrings = dictionary.components.fileList;
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [draggedOverItem, setDraggedOverItem] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const lastSwappedRef = useRef<{from: number, to: number} | null>(null);

  // Use WeakMap to store image previews with file objects as keys
  // This ensures previews persist when files are reordered and WeakMap allows garbage collection
  const previewsMapRef = useRef(new WeakMap<File, string>());
  const [, setPreviewsUpdated] = useState(0); // Force re-renders when previews change
  const [pdfMetaState, setPdfMetaState] = useState<Record<string, { thumbnail?: string; pageCount?: number; error?: boolean; loading?: boolean; loaded?: boolean }>>({});
  const pdfMetaStateRef = useRef(pdfMetaState);

  const buildFileKey = useCallback((file: File) => `${file.name}_${file.size}_${file.lastModified}`, []);

  // Reset itemRefs when files change
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, files.length);
  }, [files.length]);

  // Cleanup function for blob URLs when component unmounts
  useEffect(() => {
    const filesSnapshot = [...files];
    const previewsMap = previewsMapRef.current;

    return () => {
      filesSnapshot.forEach(file => {
        const url = previewsMap.get(file);
        if (url) {
          URL.revokeObjectURL(url);
          previewsMap.delete(file);
        }
      });
    };
  }, [files, buildFileKey]);

  // Track files that need to be removed from the WeakMap
  useEffect(() => {
    // Create previews for any new image files
    files.forEach(file => {
      if (isImageFile(file) && !previewsMapRef.current.has(file)) {
        const url = URL.createObjectURL(file);
        previewsMapRef.current.set(file, url);
        setPreviewsUpdated(prev => prev + 1); // Force re-render
      }
    });
  }, [files]);

  const isPdfFile = (file: File): boolean => {
    if (file.type === 'application/pdf') {
      return true;
    }

    return file.name.toLowerCase().endsWith('.pdf');
  };

  useEffect(() => {
    setPdfMetaState(prev => {
      const next: typeof prev = {};
      files.forEach(file => {
        const key = buildFileKey(file);
        if (prev[key]) {
          next[key] = prev[key];
        }
      });

      const prevKeys = Object.keys(prev);
      const nextKeys = Object.keys(next);
      if (prevKeys.length === nextKeys.length && nextKeys.every(key => prev[key] === next[key])) {
        return prev;
      }

      return next;
    });
  }, [files, buildFileKey]);

  useEffect(() => {
    pdfMetaStateRef.current = pdfMetaState;
  }, [pdfMetaState]);

  useEffect(() => {
    let cancelled = false;

    const loadPdfMeta = async (file: File, key: string) => {
      try {
        const [thumbnail, pageCount] = await Promise.all([
          renderPdfThumbnail(file, 1).catch(() => undefined),
          getPdfPageCount(file).catch(() => undefined),
        ]);

        if (cancelled) {
          return;
        }

        setPdfMetaState(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            thumbnail: thumbnail ?? prev[key]?.thumbnail,
            pageCount: pageCount ?? prev[key]?.pageCount,
            error: undefined,
            loading: false,
            loaded: true,
          },
        }));
      } catch {
        if (cancelled) {
          return;
        }

        setPdfMetaState(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            error: true,
            loading: false,
            loaded: true,
          },
        }));
      }
    };

    files.forEach(file => {
      if (!isPdfFile(file)) {
        return;
      }

      const key = buildFileKey(file);
      const entry = pdfMetaStateRef.current[key];
      if (entry?.loading || entry?.loaded) {
        return;
      }

      setPdfMetaState(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          loading: true,
          loaded: prev[key]?.loaded ?? false,
        },
      }));

      void loadPdfMeta(file, key);
    });

    return () => {
      cancelled = true;
    };
  }, [files, buildFileKey]);

  // Format the file size into a human-readable string
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // Truncate filename in the middle only if necessary
  const truncateFilename = (filename: string, maxLength: number = 28): string => {
    if (filename.length <= maxLength) {
      // If filename fits, return it unmodified
      return filename;
    }
    
    // Get file extension
    const lastDotIndex = filename.lastIndexOf('.');
    const extension = lastDotIndex !== -1 ? filename.substring(lastDotIndex) : '';
    const nameWithoutExtension = lastDotIndex !== -1 ? filename.substring(0, lastDotIndex) : filename;
    
    // Calculate how many characters to keep from start and end
    const availableChars = maxLength - 3 - extension.length; // 3 for the ellipsis
    const startChars = Math.ceil(availableChars * 0.6); // 60% from start
    const endChars = availableChars - startChars; // remaining from end
    
    // Create the truncated filename
    return `${nameWithoutExtension.substring(0, startChars)}...${nameWithoutExtension.substring(nameWithoutExtension.length - endChars)}${extension}`;
  };

  // Check if file is an image based on type or extension
  const isImageFile = (file: File): boolean => {
    const imageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/tiff'];
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif'];
    
    // Check mime type first
    if (imageTypes.includes(file.type)) {
      return true;
    }
    
    // Fallback to extension check
    const fileName = file.name.toLowerCase();
    return imageExtensions.some(ext => fileName.endsWith(ext));
  };

  // Enhanced drag start with custom ghost image
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.stopPropagation();
    setIsDragging(true);
    
    // Store the mouse offset within the dragged item for more accurate positioning
  const rect = e.currentTarget.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;
    
    // Create custom ghost image
    const ghostElement = e.currentTarget.cloneNode(true) as HTMLElement;
    ghostElement.style.width = `${rect.width}px`;
    ghostElement.style.transform = 'rotate(2deg)';
    ghostElement.style.opacity = '0.8';
    ghostElement.classList.add('dragging-ghost');
    
    // Position offscreen initially
    ghostElement.style.position = 'absolute';
    ghostElement.style.top = '-1000px';
    ghostElement.style.left = '-1000px';
    
    // Add to DOM, set as drag image, then remove
    document.body.appendChild(ghostElement);
    e.dataTransfer.setDragImage(ghostElement, offsetX, offsetY);
    
    // Schedule removal after drag image is captured
    setTimeout(() => {
      document.body.removeChild(ghostElement);
    }, 0);
    
    setDraggedItem(index);
    
    // Add dragging class to the dragged item
    if (itemRefs.current[index]) {
      itemRefs.current[index].classList.add('dragging');
    }
    
    // Add a class to indicate dragging state to the list
    if (listRef.current) {
      listRef.current.classList.add('is-dragging');
    }
    
    e.dataTransfer.effectAllowed = 'move';
    
    // Reset the last swapped reference
    lastSwappedRef.current = null;
  };

  // Enhanced drag over with visual placeholder
  const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    
    if (!isDragging || draggedItem === null || draggedItem === index) {
      return;
    }
    
    // Update the currently dragged-over item for visual feedback
    setDraggedOverItem(index);
    
    // If we've already swapped these items, don't do it again until we move to a new target
    if (lastSwappedRef.current && 
        lastSwappedRef.current.from === draggedItem && 
        lastSwappedRef.current.to === index) {
      return;
    }
    
    // Only move when the drag has crossed the midpoint of the target
    const targetRect = e.currentTarget.getBoundingClientRect();
    const targetMidY = targetRect.top + targetRect.height / 2;
    
    const shouldReorder = 
      (draggedItem < index && e.clientY > targetMidY) || 
      (draggedItem > index && e.clientY < targetMidY);
    
  if (shouldReorder && onMoveFileAction) {
      // Record this swap to prevent duplicate swaps
      lastSwappedRef.current = { from: draggedItem, to: index };
      
      if (draggedItem < index) {
  onMoveFileAction(draggedItem, 'down');
        setDraggedItem(draggedItem + 1);
      } else {
  onMoveFileAction(draggedItem, 'up');
        setDraggedItem(draggedItem - 1);
      }
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    if (!isDragging || draggedItem === null) return;
    
    // Add a drop animation to the receiving item
    if (itemRefs.current[index]) {
      itemRefs.current[index].classList.add('item-drop-animation');
      setTimeout(() => {
        if (itemRefs.current[index]) {
          itemRefs.current[index].classList.remove('item-drop-animation');
        }
      }, 300);
    }
    
    // Clear drag states
    setDraggedOverItem(null);
  };

  // Clean up drag state
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedItem(null);
    setDraggedOverItem(null);
    lastSwappedRef.current = null;
    
    // Remove dragging class from all items
    itemRefs.current.forEach(item => {
      if (item) item.classList.remove('dragging');
    });
    
    // Remove dragging class from list
    if (listRef.current) {
      listRef.current.classList.remove('is-dragging');
    }
  };

  // Enhanced drag enter for better visual feedback
  const handleDragEnter = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;
    setDraggedOverItem(index);
  };

  // Clear the dragged-over state when leaving an item
  const handleDragLeave = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    // Only clear if we're leaving the element (not entering a child)
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDraggedOverItem(null);
    }
  };

  // Handle file selection for extraction
  const handleFileClick = (index: number) => {
    if (onFileSelectAction) {
      onFileSelectAction(index);
    }
  };

  // Visibly show button press animation and apply it to adjacent elements
  const animateButtonPress = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const button = event.currentTarget;
    
    // Add animation class to button
    button.classList.remove('btn-press-animation');
    void button.offsetWidth; // Force reflow to restart animation
    button.classList.add('btn-press-animation');
    
    // Make item flash to indicate it will move
    const item = itemRefs.current[index];
    if (item) {
      item.classList.add('item-flash-animation');
      setTimeout(() => {
        item.classList.remove('item-flash-animation');
      }, 300);
    }
  };

  // Add animation to item being moved
  const handleMoveFile = (index: number, direction: 'up' | 'down') => {
    if (!onMoveFileAction) return;
    
    const item = itemRefs.current[index];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const targetItem = itemRefs.current[targetIndex];
    
    if (item && targetItem) {
      // Add animation classes with a visible delay
      item.classList.add(direction === 'up' ? 'move-up' : 'move-down');
      targetItem.classList.add(direction === 'up' ? 'move-down' : 'move-up');
      
      // Ensure there's a delay before file order actually changes
      setTimeout(() => {
  onMoveFileAction(index, direction);
        
        // Remove animation classes after animation completes
        setTimeout(() => {
          if (item) item.classList.remove('move-up', 'move-down');
          if (targetItem) targetItem.classList.remove('move-up', 'move-down');
        }, 850); // Match the new animation duration
      }, 50);
    } else {
      // If for some reason we don't have references to the items, still move the file
  onMoveFileAction(index, direction);
    }
  };

  return (
    <ul 
      ref={listRef}
      className="space-y-2 max-h-60 overflow-y-scroll overflow-x-hidden scrollbar-thin pl-2 pb-4 pt-4 pr-2 pdf-file-list"
    >
      {files.map((file, index) => {
        const isImage = isImageFile(file);
        const previewUrl = isImage ? previewsMapRef.current.get(file) : null;
        const isPdf = isPdfFile(file);
        const fileKey = buildFileKey(file);
  const pdfMeta = isPdf ? pdfMetaState[fileKey] : undefined;
        const pdfThumbnail = pdfMeta?.thumbnail;
        const pageCount = isPdf && typeof pdfMeta?.pageCount === 'number' ? pdfMeta.pageCount : undefined;
        const pageCountLabel = pageCount !== undefined ? fileListStrings.pagesLabel(pageCount) : undefined;
        const showPreviewLoading = isPdf && (!pdfMeta?.loaded || pdfMeta.loading);
        
        return (
          <li 
            key={`${file.name}-${index}`}
            ref={el => {
              itemRefs.current[index] = el;
            }}
            className={`pdf-preview ${onMoveFileAction ? (isDragging ? (draggedItem === index ? 'cursor-grabbing' : '') : 'cursor-grab') : ''} 
              ${currentIndex === index ? 'border-[var(--accent)] bg-[var(--accent)]/5' : ''}
              ${onFileSelectAction ? 'cursor-pointer' : ''}
              ${draggedItem === index ? 'dragging' : ''}
              ${draggedOverItem === index ? 'drag-over' : ''}`}
            draggable={onMoveFileAction !== undefined}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => onFileSelectAction && handleFileClick(index)}
          >
            {/* Show visual drop indicator when being dragged over */}
            {draggedOverItem === index && draggedItem !== null && draggedItem < index && (
              <div className="drop-indicator drop-indicator-bottom"></div>
            )}
            {draggedOverItem === index && draggedItem !== null && draggedItem > index && (
              <div className="drop-indicator drop-indicator-top"></div>
            )}
            
            <div className="flex items-center w-full">
              {/* Drag handle for better UX */}
              {onMoveFileAction && (
                <div className="drag-handle mr-2">
                  <svg className="w-5 h-5 text-[var(--tx-3)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path>
                  </svg>
                </div>
              )}
              
              {/* File icon or image preview */}
              {isImage && previewUrl ? (
                <div className="file-preview-thumbnail">
                  <Image
                    src={previewUrl}
                    alt={file.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover rounded"
                    unoptimized
                  />
                </div>
              ) : isPdf && pdfThumbnail ? (
                <div className="file-preview-thumbnail">
                  <Image
                    src={pdfThumbnail}
                    alt={file.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded border border-[var(--ui-2)] object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <svg className="pdf-preview-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 17H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              
              {/* File info with improved filename display */}
              <div className="pdf-preview-info">
                <div className="pdf-preview-name" title={file.name}>
                  {truncateFilename(file.name)}
                </div>
                <div className="pdf-preview-size">
                  {isPdf
                    ? `${fileListStrings.pdfLabel} - ${formatFileSize(file.size)}${pageCountLabel ? ` • ${pageCountLabel}` : ''}`
                    : isImage
                      ? `${fileListStrings.imageLabel} - ${formatFileSize(file.size)}`
                      : `${fileListStrings.fileLabel} - ${formatFileSize(file.size)}`}
                </div>
                {showPreviewLoading && (
                  <div className="text-xs text-[var(--tx-3)]">{fileListStrings.previewLoading}</div>
                )}
              </div>
              
              {/* Controls */}
              <div className="flex gap-1">
                {onMoveFileAction && (
                  <>
                    <button 
                      className={`p-1.5 rounded hover:bg-[var(--ui-2)] text-[var(--tx-3)] ${index === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-[var(--accent)]'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (index > 0) {
                          animateButtonPress(e, index);
                          handleMoveFile(index, 'up');
                        }
                      }}
                      disabled={index === 0}
                      title={fileListStrings.moveUp}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                      </svg>
                    </button>
                    <button 
                      className={`p-1.5 rounded hover:bg-[var(--ui-2)] text-[var(--tx-3)] ${index === files.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-[var(--accent)]'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (index < files.length - 1) {
                          animateButtonPress(e, index);
                          handleMoveFile(index, 'down');
                        }
                      }}
                      disabled={index === files.length - 1}
                      title={fileListStrings.moveDown}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                  </>
                )}
                <button 
                  className="p-1.5 rounded hover:bg-[var(--ui-2)] text-[var(--tx-3)] hover:text-[var(--accent)]"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Revoke the blob URL before removing the file
                    const previewUrl = previewsMapRef.current.get(file);
                    if (previewUrl) {
                      URL.revokeObjectURL(previewUrl);
                      previewsMapRef.current.delete(file);
                    }
                    onRemoveFileAction(index);
                  }}
                  title={fileListStrings.remove}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
