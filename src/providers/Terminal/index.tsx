import { createContext, useContext, useEffect, useRef } from 'react';
import useTerminal from '../../hooks/useTerminal';
import type { useTerminalState } from '../../hooks/useTerminal';

interface TerminalProviderProps {
    children: React.ReactNode;
}

type TerminalContext = readonly [
    state: useTerminalState[0],
    actions: useTerminalState[1],
];

const Context = createContext<TerminalContext>([{ directoryTree: [], logs: [], prompt: '' }, { interpretInput: () => {} }]);

const useTerminalContext = () => useContext<TerminalContext>(Context);

const TerminalProvider: React.FC<TerminalProviderProps> = ({ children }) => {
    const value = useTerminal();
    const firstRenderRef = useRef<boolean>(true);

    useEffect(() => {
        if (firstRenderRef.current) value[1].interpretInput('help');
        firstRenderRef.current = false;
    }, []);

    return (
        <Context.Provider value={value}>
        {children}
        </Context.Provider>
    );
};

export { TerminalProvider, useTerminalContext };
