import { SystemOptionsProvider } from '../../providers/SystemOptions';
import { TerminalProvider } from '../../providers/Terminal';

interface ProvidersWrapperProps {
    children: React.ReactNode;
}

export const ProvidersWrapper: React.FC<ProvidersWrapperProps> = ({ children }) => {
    return (
        <SystemOptionsProvider>
            <TerminalProvider>       
                {children}
            </TerminalProvider>
        </SystemOptionsProvider>
    );
}
