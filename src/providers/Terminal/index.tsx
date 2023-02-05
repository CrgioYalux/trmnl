import { useTerminalContext } from './useTerminalContext';
import { Context } from "./useTerminalContext";

interface TerminalProviderProps {
    children: React.ReactNode;
}

export const TerminalProvider: React.FC<TerminalProviderProps> = ({ children }) => {
    const value = useTerminalContext();
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};
