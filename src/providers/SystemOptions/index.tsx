import { createContext, useContext, useState } from "react";
import { Theme, getSystemTheme, applyTheme } from './theme';
import { Lang } from "./lang";

interface SystemOptionsContext {
    switchPlasmaBackgroundVisibility: () => void;
    plasmaBackgroundVisibility: boolean;

    switchTheme: () => void;
    theme: Theme;

    switchLang: () => void;
    lang: Lang;
}

const SystemOptionsContext = createContext<SystemOptionsContext>({
    switchPlasmaBackgroundVisibility: () => {},
    plasmaBackgroundVisibility: true,

    switchTheme: () => {},
    theme: 'dark',

    switchLang: () => {},
    lang: 'EN',
});

export const useSystemOptions = () => useContext<SystemOptionsContext>(SystemOptionsContext);

interface SystemOptionsProviderProps {
    children: React.ReactNode;
};

export const SystemOptionsProvider: React.FC<SystemOptionsProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const theme = getSystemTheme();
        applyTheme(theme);
        return theme;
    });
    const [lang, setLang] = useState<Lang>('EN');
    const [plasmaBackgroundVisibility, setPlasmaBackgroundVisibility] = useState<boolean>(false);

    const switchPlasmaBackgroundVisibility = () => {
        setPlasmaBackgroundVisibility((prev) => !prev);
    };

    const switchLang = () => {
        setLang((prev) => prev === 'EN' ? 'ES' : 'EN');
    };

    const switchTheme = () => {
        setTheme(
            (prev) => {
                const updated = prev === 'dark' ? 'light' : 'dark';
                applyTheme(updated);
                return updated;
            }
        );
    };

    const value: SystemOptionsContext = {
        switchPlasmaBackgroundVisibility,
        plasmaBackgroundVisibility,

        switchTheme,
        theme,

        switchLang,
        lang,
    };

    return (
        <SystemOptionsContext.Provider value={value}>
            {children}
        </SystemOptionsContext.Provider>
    );
};
