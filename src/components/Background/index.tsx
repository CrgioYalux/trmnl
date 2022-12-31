import './Background.css';

import { useSystemOptions } from '../../providers/SystemOptions';
import { PlasmaBackground } from './PlasmaBackground';

interface BackgroundProps {
    children?: React.ReactNode;
    className?: string;
}

export const Background: React.FC<BackgroundProps> = ({ className = '', children }) => {
    const { plasmaBackgroundVisibility } = useSystemOptions();
    return (
        <div className={`Background ${className}`}>
            {plasmaBackgroundVisibility && <PlasmaBackground />}
            {children}
        </div>
    );
}
