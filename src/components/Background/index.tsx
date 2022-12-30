import './Background.css';

import { useState } from 'react';
import { PlasmaBackground } from './PlasmaBackground';

interface BackgroundProps {
    children?: React.ReactNode;
    className?: string;
}

export const Background: React.FC<BackgroundProps> = ({ className = '', children }) => {
    const [usingPlasmaBackground, setUsingPlasmaBackground] = useState<boolean>(true);
    return (
        <div className={`Background ${className}`}>
            {usingPlasmaBackground && <PlasmaBackground />}
            {children}
        </div>
    );
}
