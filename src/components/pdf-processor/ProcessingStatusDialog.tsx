"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { trackEvent } from "../../lib/analytics";
import { FeedbackWidget } from "../FeedbackWidget";

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
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="11" className="fill-current opacity-20" />
          <path
            className="stroke-current"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12.5l2.5 2.5L16 9"
          />
        </svg>
      );
    case "error":
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="11" className="fill-current opacity-20" />
          <path
            className="stroke-current"
            strokeWidth="2"
            strokeLinecap="round"
            d="M8.5 8.5l7 7m0-7l-7 7"
          />
        </svg>
      );
    default:
      return (
        <svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle
            className="opacity-25 stroke-current"
            cx="12"
            cy="12"
            r="10"
            strokeWidth="4"
          />
          <path
            className="opacity-75 fill-current"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      );
  }
};

export function ProcessingStatusDialog({
  open,
  status,
  title,
  description,
  highlights,
  donationPrompt,
  actions,
  closeLabel,
  onClose,
  analyticsContext,
}: ProcessingStatusDialogProps) {
  const [mounted, setMounted] = useState(false);
  const previousFocus = useRef<Element | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

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
            <svg className="h-4 w-4" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M3 3l6 6m0-6L3 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
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
            <div className="border-t border-[var(--ui-2)] pt-4">
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
