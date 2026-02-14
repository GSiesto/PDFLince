"use client";

import type { CompressionPreviewStrings } from "../../i18n/dictionaries/dictionary-types";
import type { ProcessingResult } from "../../lib/pdf-processor";

export type PreviewStatus = "idle" | "running" | "ready" | "error";

type CompressionPreviewCardProps = {
  strings: CompressionPreviewStrings;
  status: PreviewStatus;
  result?: ProcessingResult;
  formatFileSizeAction: (bytes: number) => string;
  errorMessage?: string;
  retryAction?: () => void;
  fileName?: string;
  order?: number;
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

import { Sparkles } from "lucide-react";

export default function CompressionPreviewCard({
  strings,
  status,
  result,
  formatFileSizeAction,
  errorMessage,
  retryAction,
  fileName,
  order,
}: CompressionPreviewCardProps) {
  const hasResult = status === "ready" && result;
  const percent = hasResult ? formatPercent(result.originalSize, result.processedSize) : "0.0";
  const savedBytes = hasResult ? formatSaved(result.originalSize, result.processedSize) : 0;
  const savedLabel = strings.saved(formatFileSizeAction(savedBytes));
  const timeSeconds = hasResult
    ? typeof result.processingTimeMs === "number" && result.processingTimeMs > 0
      ? (result.processingTimeMs / 1000).toFixed(1)
      : "0.0"
    : "0.0";

  const showUniversalBadge = hasResult && (result.universalOptimizedCount ?? 0) > 0;

  return (
    <div className="rounded-lg border border-[var(--ui-2)] bg-[var(--bg-2)] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-[var(--tx)]">
            {strings.title}
            {typeof order === "number" ? ` #${order + 1}` : ""}
          </h3>
          {fileName && <p className="text-sm text-[var(--tx-2)]">{fileName}</p>}
          {status === "idle" && (
            <p className="text-sm text-[var(--tx-2)]">{strings.description}</p>
          )}
        </div>
        {status === "running" && (
          <svg
            className="h-5 w-5 animate-spin text-[var(--accent)]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </div>

      {status === "running" && (
        <p className="mt-3 text-sm text-[var(--tx-2)]">{strings.running}</p>
      )}

      {status === "error" && (
        <div className="mt-3 space-y-2 text-sm text-[var(--tx-2)]">
          <p>{strings.error}</p>
          {errorMessage && <p className="text-xs text-[var(--tx-3)]">{errorMessage}</p>}
          {retryAction && (
            <button
              className="text-sm font-medium text-[var(--accent)] hover:underline"
              type="button"
              onClick={retryAction}
            >
              {strings.retry}
            </button>
          )}
        </div>
      )}

      {hasResult && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[var(--tx)]">{strings.readyLabel}</p>
            {showUniversalBadge && (
              <span className="flex items-center gap-1.5 rounded-full bg-[var(--accent)]/10 px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
                <Sparkles className="h-3 w-3" />
                {strings.universalBadge}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-[var(--tx-3)]">&nbsp;</p>
              <p className="text-sm font-medium text-[var(--tx)]">{strings.ratio(percent)}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-[var(--tx-2)]">
            <span>{savedLabel}</span>
            <span>•</span>
            <span>{strings.time(timeSeconds)}</span>
          </div>
          <p className="text-xs text-[var(--tx-3)]">{strings.notice}</p>
        </div>
      )}
    </div>
  );
}
