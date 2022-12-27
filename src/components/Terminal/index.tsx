import './Terminal.css';

export const Terminal: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div className={`Terminal ${className}`}>
        </div>
    );
}
