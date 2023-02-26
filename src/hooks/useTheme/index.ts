import { useState } from 'react';
import { getSystemTheme, applyTheme } from './utils';
import type { Theme } from "./utils";

type useThemeState = readonly [
    theme: Theme,
    switchTheme: () => void,
]

export function useTheme(): useThemeState {
    const [state, setState] = useState<Theme>(() => {
        const theme = getSystemTheme();
        applyTheme(theme);
        return theme;
    });

    const switchTheme = (): void => {
        const theme = state === 'dark' ? 'light' : 'dark';
        setState(theme);
        applyTheme(theme);
    };

    return [state, switchTheme] as const;
};
