'use client';

import Link from 'next/link';
import { useDictionary } from '../i18n/LocaleProvider';
import type { OperationKey } from '../types/operations';

export default function Footer() {
  const dictionary = useDictionary();
  const footer = dictionary.components.footer;
  const routes = dictionary.routes;
  const footerOperationLinks = (Object.keys(routes.operations) as OperationKey[])
    .map((operation) => {
      const href = routes.operations[operation];
      const label = footer.operations[operation];

      if (!href || !label) {
        return null;
      }

      return { operation, href, label };
    })
    .filter((link): link is { operation: OperationKey; href: string; label: string } => link !== null);

  return (
    <footer className="text-center py-6 relative z-10 bg-[var(--bg-2)] border-t border-[var(--ui)]">
      <div className="container mx-auto px-4">
        <p className="text-[var(--tx-3)] mb-2">{footer.privacy}</p>
        <p className="text-[var(--tx-2)] text-sm">{footer.rights}</p>

        <div className="flex justify-center gap-4 my-3">
          <Link href={routes.home} className="text-[var(--tx-2)] hover:text-[var(--accent)] font-medium">
            {footer.links.home}
          </Link>
          <Link href={routes.faq} className="text-[var(--tx-2)] hover:text-[var(--accent)] font-medium">
            {footer.links.faq}
          </Link>

          <a
            href="https://fotolince.com"
            className="text-[var(--tx-2)] hover:text-[var(--accent)] font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            {footer.links.photo}
          </a>
          <a
            href="mailto:info@pdflince.com"
            className="text-[var(--tx-2)] hover:text-[var(--accent)] font-medium"
          >
            {footer.links.contact}
          </a>
          <a
            href="https://github.com/GSiesto/pdflince"
            className="text-[var(--tx-2)] hover:text-[var(--accent)] font-medium flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            GitHub
          </a>
        </div>

        <p className="mt-6 text-[var(--tx-3)] text-xs uppercase tracking-wide">{footer.capabilitiesLabel}</p>

        <div className="flex flex-wrap justify-center gap-3 mt-3 text-xs text-[var(--tx-3)]">
          {footerOperationLinks.map(({ operation, href, label }) => (
            <Link key={operation} href={href} className="hover:text-[var(--accent)] transition-colors">
              {label}
            </Link>
          ))}
        </div>

        <p className="mt-4 text-[10px] text-[var(--tx-3)]/60">{footer.license}</p>
        {footer.disclaimer && (
          <p className="mt-2 mx-auto max-w-3xl text-[10px] text-[var(--tx-3)]/50">{footer.disclaimer}</p>
        )}
      </div>
    </footer>
  );
}
