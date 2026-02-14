'use client';

import { useState } from 'react';
import { useDictionary } from '../i18n/LocaleProvider';

interface WindowWithGtag extends Window {
    gtag: (
        command: 'event',
        action: string,
        params?: Record<string, unknown>
    ) => void;
}

export function FeedbackWidget({ operation }: { operation?: string }) {
    const dictionary = useDictionary();
    // Fallback if translation is missing (safety check)
    const t = dictionary.components?.feedback || {
        question: "Was this helpful?",
        thanks: "Thanks for your feedback!",
        whatWrong: "Tell us what went wrong",
        emailSubject: "Feedback for PDFLince"
    };

    const [status, setStatus] = useState<'idle' | 'positive' | 'negative'>('idle');

    const handleFeedback = (type: 'positive' | 'negative') => {
        setStatus(type);

        // Track event
        if (typeof window !== 'undefined' && (window as unknown as WindowWithGtag).gtag) {
            (window as unknown as WindowWithGtag).gtag('event', `feedback_${type}`, {
                event_category: 'engagement',
                event_label: operation || 'unknown_operation',
                operation_type: operation
            });
        }
    };

    if (status === 'positive') {
        return (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-center animate-in fade-in">
                <p className="text-sm text-green-600 font-medium">
                    {t.thanks} ❤️
                </p>
            </div>
        );
    }

    if (status === 'negative') {
        return (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center animate-in fade-in">
                <a
                    href={`mailto:contact@pdflince.com?subject=${encodeURIComponent(t.emailSubject)}`}
                    className="text-sm text-red-600 font-medium hover:underline flex items-center justify-center gap-2"
                >
                    <span>{t.whatWrong}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </a>
            </div>
        );
    }

    return (
        <div className="mt-6 flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-sm text-[var(--tx-2)]">{t.question}</p>
            <div className="flex gap-3">
                <button
                    onClick={() => handleFeedback('positive')}
                    className="p-2 rounded-full hover:bg-[var(--bg-2)] text-[var(--tx-2)] hover:text-green-500 transition-colors ring-1 ring-transparent hover:ring-green-500/20"
                    aria-label="Thumbs up"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                </button>
                <button
                    onClick={() => handleFeedback('negative')}
                    className="p-2 rounded-full hover:bg-[var(--bg-2)] text-[var(--tx-2)] hover:text-red-500 transition-colors ring-1 ring-transparent hover:ring-red-500/20"
                    aria-label="Thumbs down"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
