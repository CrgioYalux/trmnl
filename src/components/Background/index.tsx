import './Background.css';

interface BackgroundProps {
    children?: React.ReactNode;
    className?: string;
}

export const Background: React.FC<BackgroundProps> = ({ className = '', children }) => {
    return (
        <div className={`Background ${className}`}>
            {children}
        </div>
    );
}
