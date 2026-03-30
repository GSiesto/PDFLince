// Script injected in <head> to apply the correct theme as early as possible.
// This prevents a flash of incorrect theme before React hydration.

const themeInitScript = `
(function () {
  const STORAGE_KEY = "theme-preference";

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "system";
    } catch {
      return "system";
    }
  }

  function getResolvedTheme(theme) {
    if (theme === "light" || theme === "dark") return theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    const resolvedTheme = getResolvedTheme(theme);
    const root = document.documentElement;

    root.dataset.theme = theme;
    root.dataset.resolvedTheme = resolvedTheme;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.style.colorScheme = resolvedTheme;
  }

  applyTheme(getStoredTheme());
})();
`;

// Dark theme CSS variables. These override the existing design tokens when dark mode is active,
// allowing the rest of the app to keep using the same variables.

const themeVariableStyles = `
:root.dark,
:root[data-resolved-theme="dark"] {
  --bg: #140d0d;
  --bg-2: #1b1212;
  --ui: #2a1b1b;
  --ui-2: #3a2323;
  --ui-3: #4a2b2b;

  --tx: #fff3ef;
  --tx-2: #f3d8d0;
  --tx-3: #dfb7ac;

  --accent: #ff7a45;
  --accent-2: #ff5a36;

  --re: #ff7f66;
  --or: #ff8b52;
  --gr: #3ac48b;
  --bl: #4bb7ff;
  --pu: #ff8fad;
  --ma: #ff4d6d;

  --btn-bg: #ff7a45;
  --btn-border: #e65f31;
  --btn-hover: #ff8a5c;
  --btn-hover-border: #f06c3e;
  --btn-active: #e85d2d;
  --btn-active-border: #c94d21;
  --btn-disabled: #5a3434;
  --btn-text: #fffaf8;
}
`;

export default function ThemeScript() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      <style dangerouslySetInnerHTML={{ __html: themeVariableStyles }} />
    </>
  );
}