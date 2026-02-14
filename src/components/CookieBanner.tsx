'use client';

import { useState, useEffect } from 'react';
import { useDictionary } from '../i18n/LocaleProvider';

interface WindowWithGtag extends Window {
    gtag: (
        command: 'consent' | 'config' | 'event' | 'js',
        targetId: string,
        config?: Record<string, unknown>
    ) => void;
}

export default function CookieBanner() {
    const dictionary = useDictionary();
    const t = dictionary.components.cookieBanner;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (consent === null) {
            setIsVisible(true);
        } else if (consent === 'true') {
            // Restore consent if previously granted
            if (typeof window !== 'undefined' && (window as unknown as WindowWithGtag).gtag) {
                (window as unknown as WindowWithGtag).gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'analytics_storage': 'granted'
                });
            }
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);

        // Update GA consent
        if (typeof window !== 'undefined' && (window as unknown as WindowWithGtag).gtag) {
            (window as unknown as WindowWithGtag).gtag('consent', 'update', {
                'ad_storage': 'granted',
                'analytics_storage': 'granted'
            });
        }
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-[var(--bg-2)]/90 backdrop-blur-md border-t border-[var(--ui)] shadow-2xl animate-in slide-in-from-bottom duration-500">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl">
                <p className="text-sm text-[var(--tx-2)] text-center md:text-left">
                    {t.message}
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={handleDecline}
                        className="px-4 py-2 text-xs text-[var(--tx-3)] opacity-60 hover:opacity-100 hover:text-[var(--tx-1)] transition-all"
                    >
                        {t.decline}
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2 text-xs font-medium bg-[var(--accent)] text-white rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-[var(--accent)]/20"
                    >
                        {t.accept}
                    </button>
                </div>
            </div>
        </div>
    );
}
