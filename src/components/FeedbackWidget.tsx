'use client';

import { useState } from 'react';
import { useDictionary } from '../i18n/LocaleProvider';
import { Heart, Mail, ThumbsDown, ThumbsUp } from './ui/Icons';

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
                <p className="text-sm text-green-600 font-medium inline-flex items-center justify-center gap-1.5">
                    <span>{t.thanks}</span>
                    <Heart className="w-4 h-4 text-green-600 shrink-0" strokeWidth={2} />
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
                    <Mail className="w-4 h-4 shrink-0" strokeWidth={1.85} />
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
                    <ThumbsUp className="w-5 h-5" strokeWidth={1.85} />
                </button>
                <button
                    onClick={() => handleFeedback('negative')}
                    className="p-2 rounded-full hover:bg-[var(--bg-2)] text-[var(--tx-2)] hover:text-red-500 transition-colors ring-1 ring-transparent hover:ring-red-500/20"
                    aria-label="Thumbs down"
                >
                    <ThumbsDown className="w-5 h-5" strokeWidth={1.85} />
                </button>
            </div>
        </div>
    );
}
