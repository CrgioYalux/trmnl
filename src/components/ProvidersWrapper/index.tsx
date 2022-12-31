import { SystemOptionsProvider } from '../../providers/SystemOptions';

interface ProvidersWrapperProps {
    children: React.ReactNode;
}

export const ProvidersWrapper: React.FC<ProvidersWrapperProps> = ({ children }) => {
    return (
        <SystemOptionsProvider>
            {children}
        </SystemOptionsProvider>
    );
}
