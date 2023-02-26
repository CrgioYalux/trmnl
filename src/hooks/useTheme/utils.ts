const Themes = ["dark", "light"] as const;

type Theme = typeof Themes[number];

function getSystemTheme(): Theme {
    if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) return 'dark';
    return 'light';
}

function applyTheme(theme: Theme) {
    document.documentElement.className = theme;
}

export type { Theme };
export { Themes, getSystemTheme, applyTheme };
