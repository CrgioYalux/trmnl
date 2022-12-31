export enum Theme { Dark = 'dark', Light = 'light' }

export function getSystemTheme(): Theme {
    if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) return Theme.Dark;
    return Theme.Light;
}

export function applyTheme(theme: Theme) {
    document.documentElement.className = theme;
}
