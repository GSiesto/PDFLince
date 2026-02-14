"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { renderPdfThumbnail } from "../../lib/pdf-processor";

type CompressionDiffSliderProps = {
  originalFile: File;
  compressedBlob: Blob;
  label: string;
  hint: string;
  originalLabel: string;
  resultLabel: string;
  errorLabel: string;
};

type DiffState =
  | { state: "idle" | "loading" }
  | { state: "ready"; original: string; compressed: string }
  | { state: "error" };

const THUMBNAIL_HEIGHT = 224;

export default function CompressionDiffSlider({
  originalFile,
  compressedBlob,
  label,
  hint,
  originalLabel,
  resultLabel,
  errorLabel,
}: CompressionDiffSliderProps) {
  const [diffState, setDiffState] = useState<DiffState>({ state: "idle" });
  const [sliderValue, setSliderValue] = useState(50);

  const compressedSource = useMemo(() => {
    if (compressedBlob instanceof File) {
      return compressedBlob;
    }

    return new File([compressedBlob], `${originalFile.name.replace(/\.pdf$/i, "")}-compressed.pdf`, {
      type: "application/pdf",
    });
  }, [compressedBlob, originalFile.name]);

  useEffect(() => {
    let cancelled = false;
    setDiffState({ state: "loading" });

    const loadThumbnails = async () => {
      try {
        const [originalThumb, compressedThumb] = await Promise.all([
          renderPdfThumbnail(originalFile, 1),
          renderPdfThumbnail(compressedSource, 1),
        ]);

        if (cancelled) {
          return;
        }

        setDiffState({ state: "ready", original: originalThumb, compressed: compressedThumb });
      } catch {
        if (!cancelled) {
          setDiffState({ state: "error" });
        }
      }
    };

    void loadThumbnails();

    return () => {
      cancelled = true;
    };
  }, [originalFile, compressedSource]);

  const renderContent = () => {
    if (diffState.state === "ready") {
      const { original, compressed } = diffState;

      return (
        <div className="relative h-full w-full">
          <Image src={original} alt={originalLabel} fill className="object-contain" unoptimized />
          <div
            className="absolute inset-0 overflow-hidden border-r border-[var(--accent)]"
            style={{ width: `${sliderValue}%` }}
          >
            <Image
              src={compressed}
              alt={resultLabel}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      );
    }

    if (diffState.state === "error") {
      return (
        <div className="flex h-full w-full items-center justify-center text-sm text-[var(--tx-3)]">
          {errorLabel}
        </div>
      );
    }

    return (
      <div className="relative h-full w-full">
        <div className="flex h-full w-full items-center justify-center text-sm text-[var(--tx-3)]">
          {hint}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <p className="font-medium text-[var(--tx)]">{label}</p>
        <p className="text-xs text-[var(--tx-3)]">{hint}</p>
      </div>
      <div className="relative w-full overflow-hidden rounded-md border border-[var(--ui-2)] bg-white" style={{ height: THUMBNAIL_HEIGHT }}>
        {renderContent()}
      </div>
      <div className="space-y-1">
        <input
          type="range"
          min={0}
          max={100}
          value={sliderValue}
          onChange={(event) => setSliderValue(parseInt(event.target.value, 10))}
          className="w-full accent-[var(--accent)]"
        />
        <div className="flex justify-between text-xs text-[var(--tx-3)]">
          <span>{originalLabel}</span>
          <span>{resultLabel}</span>
        </div>
      </div>
    </div>
  );
}
