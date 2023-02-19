import { useEffect } from 'react';
import { useTerminalContext } from './useTerminalContext';
import { Context } from "./useTerminalContext";
import main from './useTerminalContext/commands/DirectoryTree';

interface TerminalProviderProps {
    children: React.ReactNode;
}

export const TerminalProvider: React.FC<TerminalProviderProps> = ({ children }) => {
    const value = useTerminalContext();
    useEffect(() => {
        main();
    }, []);
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};
