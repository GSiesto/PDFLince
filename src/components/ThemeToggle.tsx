"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "../i18n/LocaleProvider";

type ThemePreference = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme-preference";
const THEME_ORDER: ThemePreference[] = ["light", "dark", "system"]; // Order used to cycle themes on click

const COPY = {
  es: {
    label: "Tema",
    light: "Claro",
    dark: "Oscuro",
    system: "Sistema",
  },
  en: {
    label: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  pt: {
    label: "Tema",
    light: "Claro",
    dark: "Escuro",
    system: "Sistema",
  },
  de: {
    label: "Design",
    light: "Hell",
    dark: "Dunkel",
    system: "System",
  },
  it: {
    label: "Tema",
    light: "Chiaro",
    dark: "Scuro",
    system: "Sistema",
  },
} as const;

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(theme: ThemePreference): ResolvedTheme {
  return theme === "system" ? getSystemTheme() : theme;
}

function applyTheme(theme: ThemePreference) {
  const resolvedTheme = resolveTheme(theme);
  const root = document.documentElement;

  root.dataset.theme = theme;
  root.dataset.resolvedTheme = resolvedTheme;
  root.classList.toggle("dark", resolvedTheme === "dark");
  root.style.colorScheme = resolvedTheme;
}

function getStoredTheme(): ThemePreference {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "light" || value === "dark" || value === "system") {
      return value;
    }
  } catch {
    // noop
  }

  return "system";
}

function getNextTheme(theme: ThemePreference): ThemePreference {
  const index = THEME_ORDER.indexOf(theme);
  return THEME_ORDER[(index + 1) % THEME_ORDER.length];
}

function SunIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5" />
      <path d="M12 19.5V22" />
      <path d="M4.93 4.93l1.77 1.77" />
      <path d="M17.3 17.3l1.77 1.77" />
      <path d="M2 12h2.5" />
      <path d="M19.5 12H22" />
      <path d="M4.93 19.07l1.77-1.77" />
      <path d="M17.3 6.7l1.77-1.77" />
    </svg>
  );
}

function MoonIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

function MonitorIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
    </svg>
  );
}
// Selects correct icon based on current theme
function ThemeIcon({ theme }: { theme: ThemePreference }) {
  if (theme === "light") return <SunIcon />;
  if (theme === "dark") return <MoonIcon />;
  return <MonitorIcon />;
}

export default function ThemeToggle() {
  const locale = useLocale();
  const copy = useMemo(() => COPY[locale] ?? COPY.en, [locale]);

  const [theme, setTheme] = useState<ThemePreference>("system");

  useEffect(() => {
    const savedTheme = getStoredTheme();
    setTheme(savedTheme);
    applyTheme(savedTheme);
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");     // Sync with system changes when using "system" mode

    const handleSystemChange = () => {
      const currentTheme = getStoredTheme();
      if (currentTheme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, []);

  const currentLabel =
    theme === "light" ? copy.light : theme === "dark" ? copy.dark : copy.system;

  const nextTheme = getNextTheme(theme);
  const nextLabel =
    nextTheme === "light" ? copy.light : nextTheme === "dark" ? copy.dark : copy.system;

  const handleClick = () => {
    const updatedTheme = getNextTheme(theme);

    setTheme(updatedTheme);

    try {
      localStorage.setItem(STORAGE_KEY, updatedTheme);
    } catch {
      // noop
    }

    applyTheme(updatedTheme);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ui)] bg-[var(--bg)] text-[var(--tx)] shadow-sm transition-all
        hover:scale-[1.05] hover:border-[var(--ui-2)] hover:bg-[var(--ui)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]
        active:scale-[0.96]"
      aria-label={`${copy.label}: ${currentLabel}. Next: ${nextLabel}`}
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full">
        <ThemeIcon theme={theme} />
      </span>
    </button>
  );
}
