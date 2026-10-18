"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { trackEvent } from "../../lib/analytics";
import { FeedbackWidget } from "../FeedbackWidget";
import { AlertCircle, CheckCircle2, Loader2, Share2, X } from "../ui/Icons";

export type DialogStatus = "processing" | "success" | "error";

export interface DialogHighlight {
  label: string;
  value?: string;
}

export interface DialogAction {
  label: string;
  onClick?: () => void;
  href?: string;
  target?: "_self" | "_blank";
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
}

export interface DonationPrompt {
  message: string;
  actionLabel: string;
  href: string;
  target?: "_self" | "_blank";
}

interface ProcessingStatusDialogProps {
  open: boolean;
  status: DialogStatus;
  title: string;
  description?: string;
  highlights?: DialogHighlight[];
  donationPrompt?: DonationPrompt | null;
  sharePrompt?: { dialogMessage: string; shareText: string; actionLabel: string; copiedLabel: string } | null;
  actions?: DialogAction[];
  closeLabel: string;
  onClose: () => void;
  analyticsContext?: {
    mode?: string;
  };
}

const statusAccent: Record<DialogStatus, string> = {
  processing: "bg-blue-100 text-blue-700 border-blue-200",
  success: "bg-green-100 text-green-700 border-green-200",
  error: "bg-red-100 text-red-700 border-red-200",
};

const actionStyles: Record<NonNullable<DialogAction["variant"]>, string> = {
  primary:
    "bg-[var(--accent)] text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]",
  secondary:
    "border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]",
  ghost: "text-[var(--tx-3)] hover:text-[var(--tx)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]",
};

const statusIcon = (status: DialogStatus) => {
  switch (status) {
    case "success":
      return <CheckCircle2 className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden="true" />;
    case "error":
      return <AlertCircle className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden="true" />;
    default:
      return <Loader2 className="h-5 w-5 shrink-0 animate-spin" strokeWidth={2} aria-hidden="true" />;
  }
};

export function ProcessingStatusDialog({
  open,
  status,
  title,
  description,
  highlights,
  donationPrompt,
  sharePrompt,
  actions,
  closeLabel,
  onClose,
  analyticsContext,
}: ProcessingStatusDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const previousFocus = useRef<Element | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleShareClick = async () => {
    const currentLocale = window.location.pathname.split('/')[1] || 'en';
    const shareUrl = `https://pdflince.com/${currentLocale}?utm_source=app&utm_medium=share&utm_campaign=user_referral_success`;

    const shareData = {
      title: 'PDFLince - Free Private PDF Toolkit',
      text: sharePrompt ? `${sharePrompt.shareText}\n` : undefined,
      url: shareUrl
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // User aborted
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback failed
      }
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    previousFocus.current = document.activeElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (previousFocus.current instanceof HTMLElement) {
        previousFocus.current.focus();
      }
    };
  }, [open, onClose]);

  if (!mounted || !open) {
    return null;
  }

  const renderAction = (action: DialogAction, index: number) => {
    const variant = action.variant ?? "secondary";
    const className = `inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none ${actionStyles[variant]}${action.disabled ? " opacity-50 cursor-not-allowed" : ""
      }`;

    if (action.href) {
      return (
        <a
          key={`${action.label}-${index}`}
          href={action.href}
          target={action.target ?? "_self"}
          rel={action.target === "_blank" ? "noopener noreferrer" : undefined}
          className={className}
          aria-disabled={action.disabled}
          onClick={event => {
            if (action.disabled) {
              event.preventDefault();
            } else if (action.onClick) {
              action.onClick();
            }
          }}
        >
          {action.label}
        </a>
      );
    }

    return (
      <button
        key={`${action.label}-${index}`}
        type="button"
        className={className}
        onClick={action.onClick}
        disabled={action.disabled}
      >
        {action.label}
      </button>
    );
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4 py-6">
      <div
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
        onClick={onClose}
      ></div>
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-xl rounded-lg bg-white shadow-xl"
      >
        <div className="flex items-start justify-between border-b border-[var(--ui-2)] px-6 py-4">
          <div className={`flex items-center gap-3 rounded-md border px-3 py-2 text-sm font-medium ${statusAccent[status]}`}>
            {statusIcon(status)}
            <span>{title}</span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--tx-3)] transition hover:bg-[var(--bg-2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
          >
            <span className="sr-only">{closeLabel}</span>
            <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
        <div className="space-y-4 px-6 py-5 text-[var(--tx)]">
          {description ? <p className="text-sm leading-relaxed text-[var(--tx-2)]">{description}</p> : null}

          {highlights && highlights.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {highlights.map(item => (
                <li
                  key={`${item.label}-${item.value ?? "single"}`}
                  className="rounded-md bg-[var(--bg-2)] px-3 py-2"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-medium text-[var(--tx)]">{item.label}</span>
                    {item.value ? (
                      <span className="text-sm text-[var(--tx-2)] sm:text-right">{item.value}</span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          ) : null}

          {donationPrompt ? (
            <div className="rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-4">
              <p className="text-sm text-[var(--tx)]">{donationPrompt.message}</p>
              <a
                href={donationPrompt.href}
                target={donationPrompt.target ?? "_self"}
                rel={donationPrompt.target === "_blank" ? "noopener noreferrer" : undefined}
                className="mt-3 inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
                onClick={() => {
                  trackEvent({
                    action: "donation_prompt_clicked",
                    category: "processor",
                    label: analyticsContext?.mode,
                    params: {
                      status,
                      href: donationPrompt.href,
                    },
                  });
                }}
              >
                {donationPrompt.actionLabel}
              </a>
            </div>
          ) : null}

          {status === 'success' && (
            <div className="border-t border-[var(--ui-2)] pt-4 space-y-4">
              {sharePrompt && (
                <div className="rounded-md border border-[var(--ui-3)] bg-[var(--bg-2)] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-sm text-[var(--tx-2)] flex-1">{sharePrompt.dialogMessage}</p>
                  <button
                    type="button"
                    onClick={handleShareClick}
                    className="inline-flex shrink-0 items-center justify-center rounded-md border border-[var(--ui-3)] bg-white px-3 py-1.5 text-sm font-medium text-[var(--tx)] shadow-sm transition hover:bg-[var(--bg-2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    <Share2 className="mr-2 h-4 w-4 text-[var(--tx-3)]" strokeWidth={1.85} />
                    {copied ? sharePrompt.copiedLabel : sharePrompt.actionLabel}
                  </button>
                </div>
              )}
              <FeedbackWidget operation={analyticsContext?.mode} />
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[var(--ui-2)] px-6 py-4">
          {actions?.map(renderAction)}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-[var(--tx-3)] transition hover:text-[var(--tx)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
            onClick={onClose}
          >
            {closeLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
