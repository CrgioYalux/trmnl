import { createContext, useContext, useState } from "react";

enum Theme { Dark, Light }
enum Lang { EN, ES }

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
    theme: Theme.Dark,

    switchLang: () => {},
    lang: Lang.EN
});

export const useSystemOptions = () => useContext<SystemOptionsContext>(SystemOptionsContext);

interface SystemOptionsProviderProps {
    children: React.ReactNode;
};

export const SystemOptionsProvider: React.FC<SystemOptionsProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(Theme.Dark);
    const [lang, setLang] = useState<Lang>(Lang.EN);
    const [plasmaBackgroundVisibility, setPlasmaBackgroundVisibility] = useState<boolean>(true);

    const switchPlasmaBackgroundVisibility = () => {
        setPlasmaBackgroundVisibility((prev) => !prev);
    };

    const switchLang = () => {
        setLang((prev) => prev === Lang.EN ? Lang.ES : Lang.EN);
    };

    const switchTheme = () => {
        setTheme((prev) => prev === Theme.Dark ? Theme.Light : Theme.Dark);
    };

    const value: SystemOptionsContext = {
        switchPlasmaBackgroundVisibility,
        plasmaBackgroundVisibility,

        switchTheme,
        theme,

        switchLang,
        lang
    };

    return (
        <SystemOptionsContext.Provider value={value}>
            {children}
        </SystemOptionsContext.Provider>
    );
};
