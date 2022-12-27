import './Frame.css';

interface FrameProps {
    children?: React.ReactNode;
}

export const Frame: React.FC<FrameProps> = ({ children }) => {
    return (
        <div className='Frame'>
            {children}
        </div>
    );
}
