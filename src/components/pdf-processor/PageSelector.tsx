"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getPdfPageCount, renderPdfThumbnail } from '../../lib/pdf-processor';
import { useDictionary } from '../../i18n/LocaleProvider';

type PageSelectorProps = {
  file: File;
  selectedPages: Record<number, boolean>;
  onPageSelectAction: (pageNumber: number, selected: boolean) => void;
};

export default function PageSelector({ file, selectedPages, onPageSelectAction }: PageSelectorProps) {
  const [pageCount, setPageCount] = useState<number>(0);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dictionary = useDictionary();
  const selectorStrings = dictionary.components.pageSelector;

  useEffect(() => {
    let isMounted = true;

    async function loadPdfInfo() {
      setLoading(true);
      setError(null);
      try {
        // Get page count from the PDF
        const count = await getPdfPageCount(file);
        if (!isMounted) return;
        setPageCount(count);

        // Generate thumbnails for the first 20 pages
        const maxPages = Math.min(count, 20);
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
        setError(selectorStrings.error);
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
    };
  }, [file, selectorStrings.error]);

  // Helper for page selection
  const togglePageSelection = (pageNumber: number) => {
    onPageSelectAction(pageNumber, !selectedPages[pageNumber]);
  };

  // Handle "Select All" and "Deselect All" actions
  const selectAllPages = () => {
    const newSelection: Record<number, boolean> = {};
    for (let i = 1; i <= pageCount; i++) {
      newSelection[i] = true;
    }
    Object.keys(newSelection).forEach(page => {
      onPageSelectAction(parseInt(page), true);
    });
  };

  const deselectAllPages = () => {
    Object.keys(selectedPages).forEach(page => {
      onPageSelectAction(parseInt(page), false);
    });
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
          <p className="mb-2 text-[var(--tx-2)]">{selectorStrings.loading}</p>

          {/* Progress Bar */}
          <div className="w-full bg-[var(--ui-2)] rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-[var(--accent)] h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(100, (thumbnails.length / Math.max(1, Math.min(pageCount || 20, 20))) * 100)}%` }}
            ></div>
          </div>
          {pageCount > 0 && (
            <p className="mt-2 text-xs text-[var(--tx-3)]">
              {thumbnails.length} / {Math.min(pageCount, 20)}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="text-sm text-[var(--tx-2)]">
          {selectorStrings.summary(pageCount, Object.keys(selectedPages).length)}
        </p>
        <div className="space-x-2">
          <button
            className="text-sm text-[var(--tx-3)] hover:text-[var(--accent)]"
            onClick={selectAllPages}
          >
            {selectorStrings.selectAll}
          </button>
          <button
            className="text-sm text-[var(--tx-3)] hover:text-[var(--accent)]"
            onClick={deselectAllPages}
            disabled={Object.keys(selectedPages).length === 0}
          >
            {selectorStrings.deselectAll}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {thumbnails.map((thumbnail, index) => {
          const pageNumber = index + 1;
          return (
            <div
              key={pageNumber}
              className={`relative border rounded-md overflow-hidden cursor-pointer hover:border-[var(--accent)] transition-colors
                ${selectedPages[pageNumber] ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/30' : 'border-[var(--ui-2)]'}`}
              onClick={() => togglePageSelection(pageNumber)}
            >
              <div className="aspect-[3/4] relative">
                <Image
                  src={thumbnail}
                  alt={selectorStrings.pageLabel(pageNumber)}
                  width={160}
                  height={200}
                  className="w-full h-full object-contain"
                  unoptimized
                />
                <div className="absolute top-2 left-2 rounded-full w-6 h-6 flex items-center justify-center bg-[var(--bg)] border border-[var(--ui-2)]">
                  {selectedPages[pageNumber] ? (
                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : null}
                </div>
              </div>
              <div className="text-center py-1 text-sm text-[var(--tx-2)]">
                {selectorStrings.pageLabel(pageNumber)}
              </div>
            </div>
          );
        })}

        {/* If there are more pages than we're showing thumbnails for */}
        {pageCount > thumbnails.length && (
          <div className="col-span-full mt-4 p-4 bg-[var(--bg-2)] rounded-lg text-center">
            <p className="text-[var(--tx-2)]">
              {selectorStrings.extraPages(thumbnails.length, pageCount)}
            </p>
            <div className="mt-3">
              <label className="block text-sm font-medium text-[var(--tx-2)] mb-1">
                {selectorStrings.manualLabel}
              </label>
              <input
                type="text"
                className="w-full p-2 border border-[var(--ui-2)] rounded-md"
                placeholder={selectorStrings.manualPlaceholder}
                onChange={(e) => {
                  // Parse input for page ranges
                  const input = e.target.value;
                  try {
                    // Clear previous selections beyond thumbnail count
                    for (let i = thumbnails.length + 1; i <= pageCount; i++) {
                      if (selectedPages[i]) {
                        onPageSelectAction(i, false);
                      }
                    }

                    // Process the input
                    if (input.trim()) {
                      const parts = input.split(',').map(part => part.trim());
                      for (const part of parts) {
                        if (part.includes('-')) {
                          // Range like "5-10"
                          const [start, end] = part.split('-').map(Number);
                          if (!isNaN(start) && !isNaN(end) && start <= end && start >= 1 && end <= pageCount) {
                            for (let i = start; i <= end; i++) {
                              onPageSelectAction(i, true);
                            }
                          }
                        } else {
                          // Single page like "7"
                          const page = Number(part);
                          if (!isNaN(page) && page >= 1 && page <= pageCount) {
                            onPageSelectAction(page, true);
                          }
                        }
                      }
                    }
                  } catch (err) {
                    console.error('Error parsing page ranges:', err);
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
