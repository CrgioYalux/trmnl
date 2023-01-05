const Themes = ["dark", "light"] as const;

export type Theme = typeof Themes[number];

export function getSystemTheme(): Theme {
    if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) return 'dark';
    return 'light';
}

export function applyTheme(theme: Theme) {
    document.documentElement.className = theme;
}
