import { createContext, useContext, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import type { Theme } from "../../hooks/useTheme/utils";

interface SystemOptionsContext {
    switchPlasmaBackgroundVisibility: () => void;
    plasmaBackgroundVisibility: boolean;

    switchTheme: () => void;
    theme: Theme;
}

const SystemOptionsContext = createContext<SystemOptionsContext>({
    switchPlasmaBackgroundVisibility: () => {},
    plasmaBackgroundVisibility: true,

    switchTheme: () => {},
    theme: 'dark',
});

export const useSystemOptions = () => useContext<SystemOptionsContext>(SystemOptionsContext);

interface SystemOptionsProviderProps {
    children: React.ReactNode;
};

export const SystemOptionsProvider: React.FC<SystemOptionsProviderProps> = ({ children }) => {
    const [plasmaBackgroundVisibility, setPlasmaBackgroundVisibility] = useState<boolean>(true);
    const [theme, switchTheme] = useTheme();

    const switchPlasmaBackgroundVisibility = () => {
        setPlasmaBackgroundVisibility((prev) => !prev);
    };

    const value: SystemOptionsContext = {
        switchPlasmaBackgroundVisibility,
        plasmaBackgroundVisibility,

        theme,
        switchTheme,
    };

    return (
        <SystemOptionsContext.Provider value={value}>
            {children}
        </SystemOptionsContext.Provider>
    );
};
