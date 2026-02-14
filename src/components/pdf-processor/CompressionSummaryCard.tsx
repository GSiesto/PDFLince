"use client";

import type { CompressionSummaryStrings } from "../../i18n/dictionaries/dictionary-types";
import type { ProcessingResult } from "../../lib/pdf-processor";

type CompressionSummaryCardProps = {
  strings: CompressionSummaryStrings;
  result: ProcessingResult;
  fileName: string;
  elapsedSeconds: number;
  formatFileSizeAction: (bytes: number) => string;
  downloadAction: () => void;
  clearAction: () => void;
};

const formatPercent = (original: number, processed: number): string => {
  if (original <= 0) {
    return "0.0";
  }

  const reduction = ((original - processed) / original) * 100;
  return reduction.toFixed(1);
};

const formatSaved = (original: number, processed: number): number => {
  return Math.max(0, original - processed);
};

export default function CompressionSummaryCard({
  strings,
  result,
  fileName,
  elapsedSeconds,
  formatFileSizeAction,
  downloadAction,
  clearAction,
}: CompressionSummaryCardProps) {
  const percent = formatPercent(result.originalSize, result.processedSize);
  const savedBytes = formatSaved(result.originalSize, result.processedSize);
  const savedLabel = strings.saved(formatFileSizeAction(savedBytes));
  const durationLabel = strings.duration(elapsedSeconds.toFixed(1));

  return (
    <div className="mt-4 rounded-lg border border-[var(--ui-2)] bg-[var(--bg-1)] p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-[var(--tx)]">{strings.title}</h3>
          <p className="text-sm text-[var(--tx-2)]">{fileName}</p>
        </div>
        <div className="text-sm font-medium text-[var(--accent)]">
          {strings.ratio(percent)}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-[var(--tx-3)]">{strings.original}</p>
          <p className="text-sm font-medium text-[var(--tx)]">
            {formatFileSizeAction(result.originalSize)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-[var(--tx-3)]">{strings.result}</p>
          <p className="text-sm font-medium text-[var(--tx)]">
            {formatFileSizeAction(result.processedSize)}
          </p>
        </div>
        <div className="space-y-1 text-sm text-[var(--tx-2)]">
          <p>{savedLabel}</p>
          <p>{durationLabel}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="btn-primary px-4 py-2 text-sm font-medium"
          onClick={downloadAction}
        >
          {strings.download}
        </button>
        <button
          type="button"
          className="text-sm text-[var(--tx-3)] hover:text-[var(--accent)]"
          onClick={clearAction}
        >
          {strings.clear}
        </button>
      </div>
    </div>
  );
}
