import './Background.css';

import { PlasmaBackground } from './PlasmaBackground';

interface BackgroundProps {
    children?: React.ReactNode;
    className?: string;
}

export const Background: React.FC<BackgroundProps> = ({ className = '', children }) => {
    return (
        <div className={`Background ${className}`} >
            <PlasmaBackground />
            {children}
        </div>
    );
}
