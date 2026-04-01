"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { getPdfPageDimensions, renderPdfThumbnail } from '../../lib/pdf-processor';
import { useDictionary } from '../../i18n/LocaleProvider';

type CropMargins = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

type ManualCropSelectorProps = {
  file: File;
  pageNumber: number;
  cropMargins: CropMargins;
  onCropChangeAction: (nextMargins: CropMargins) => void;
};

type Rect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const almostZero = (value: number) => Math.abs(value) < 0.5;

export default function ManualCropSelector({
  file,
  pageNumber,
  cropMargins,
  onCropChangeAction,
}: ManualCropSelectorProps) {
  const dictionary = useDictionary();
  const cropStrings = dictionary.components.processingOptions.crop;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<{ width: number; height: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dragRect, setDragRect] = useState<Rect | null>(null);
  const [error, setError] = useState<string | null>(null);
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPreview() {
      setIsLoading(true);
      setError(null);

      try {
        const [thumbnail, dimensions] = await Promise.all([
          renderPdfThumbnail(file, pageNumber, 960),
          getPdfPageDimensions(file, pageNumber),
        ]);

        if (!isMounted) {
          return;
        }

        setPreviewUrl(thumbnail);
        setPageSize(dimensions);
      } catch (err) {
        if (!isMounted) {
          return;
        }
        console.error('Error loading crop preview:', err);
        setError(cropStrings.manual.error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadPreview();

    return () => {
      isMounted = false;
    };
  }, [file, pageNumber, cropStrings.manual.error]);

  const displayRect = useMemo(() => {
    const host = surfaceRef.current;
    if (!host || !pageSize) {
      return null;
    }

    const width = host.clientWidth;
    const height = host.clientHeight;
    if (width <= 0 || height <= 0) {
      return null;
    }

    const nextWidth = width - (cropMargins.left / pageSize.width) * width - (cropMargins.right / pageSize.width) * width;
    const nextHeight = height - (cropMargins.top / pageSize.height) * height - (cropMargins.bottom / pageSize.height) * height;

    if (almostZero(cropMargins.left) && almostZero(cropMargins.right) && almostZero(cropMargins.top) && almostZero(cropMargins.bottom)) {
      return null;
    }

    return {
      left: (cropMargins.left / pageSize.width) * width,
      top: (cropMargins.top / pageSize.height) * height,
      width: Math.max(0, nextWidth),
      height: Math.max(0, nextHeight),
    };
  }, [cropMargins, pageSize, previewUrl]);

  const getPoint = (clientX: number, clientY: number) => {
    const host = surfaceRef.current;
    if (!host) {
      return null;
    }

    const bounds = host.getBoundingClientRect();
    const x = clamp(clientX - bounds.left, 0, bounds.width);
    const y = clamp(clientY - bounds.top, 0, bounds.height);
    return { x, y, width: bounds.width, height: bounds.height };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const point = getPoint(event.clientX, event.clientY);
    if (!point) {
      return;
    }

    dragStartRef.current = { x: point.x, y: point.y };
    setDragRect({ left: point.x, top: point.y, width: 0, height: 0 });
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = dragStartRef.current;
    if (!start) {
      return;
    }

    const point = getPoint(event.clientX, event.clientY);
    if (!point) {
      return;
    }

    const left = Math.min(start.x, point.x);
    const top = Math.min(start.y, point.y);
    const width = Math.abs(point.x - start.x);
    const height = Math.abs(point.y - start.y);

    setDragRect({ left, top, width, height });
  };

  const commitDragRect = (rect: Rect | null) => {
    const host = surfaceRef.current;
    if (!rect || !host || !pageSize) {
      return;
    }

    const hostWidth = host.clientWidth;
    const hostHeight = host.clientHeight;
    if (hostWidth <= 0 || hostHeight <= 0) {
      return;
    }

    if (rect.width < 6 || rect.height < 6) {
      return;
    }

    const left = (rect.left / hostWidth) * pageSize.width;
    const top = (rect.top / hostHeight) * pageSize.height;
    const right = ((hostWidth - (rect.left + rect.width)) / hostWidth) * pageSize.width;
    const bottom = ((hostHeight - (rect.top + rect.height)) / hostHeight) * pageSize.height;

    onCropChangeAction({
      top: Math.max(0, Math.round(top)),
      right: Math.max(0, Math.round(right)),
      bottom: Math.max(0, Math.round(bottom)),
      left: Math.max(0, Math.round(left)),
    });
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current) {
      commitDragRect(dragRect);
    }
    dragStartRef.current = null;
    setDragRect(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleReset = () => {
    onCropChangeAction({ top: 0, right: 0, bottom: 0, left: 0 });
  };

  const activeRect = dragRect ?? displayRect;

  return (
    <div className="rounded-lg border border-[var(--ui-2)] bg-[var(--bg-2)] p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-semibold text-[var(--tx)]">{cropStrings.manual.title}</h4>
          <p className="text-xs text-[var(--tx-3)]">
            {cropStrings.manual.pagePreview(pageNumber)}
          </p>
        </div>
        <button
          type="button"
          className="text-xs text-[var(--tx-3)] hover:text-[var(--accent)]"
          onClick={handleReset}
        >
          {cropStrings.manual.reset}
        </button>
      </div>

      <p className="mb-3 text-xs text-[var(--tx-3)]">{cropStrings.manual.hint}</p>

      {isLoading ? (
        <div className="rounded-lg border border-dashed border-[var(--ui-2)] bg-white/70 p-6 text-center text-sm text-[var(--tx-3)]">
          {cropStrings.manual.loading}
        </div>
      ) : error || !previewUrl ? (
        <div className="rounded-lg border border-dashed border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
          {error ?? cropStrings.manual.error}
        </div>
      ) : (
        <div
          ref={surfaceRef}
          className="relative mx-auto w-full max-w-[360px] touch-none select-none overflow-hidden rounded-lg border border-[var(--ui-2)] bg-white shadow-sm"
          style={{ aspectRatio: pageSize ? `${pageSize.width} / ${pageSize.height}` : '3 / 4' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <img
            src={previewUrl}
            alt={cropStrings.manual.pagePreview(pageNumber)}
            className="h-full w-full object-contain"
            draggable={false}
          />

          {activeRect ? (
            <>
              <div className="absolute inset-0 bg-black/25" />
              <div
                className="absolute border-2 border-[var(--accent)] bg-white/10 shadow-[0_0_0_9999px_rgba(0,0,0,0.28)]"
                style={{
                  left: `${activeRect.left}px`,
                  top: `${activeRect.top}px`,
                  width: `${activeRect.width}px`,
                  height: `${activeRect.height}px`,
                }}
              />
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
