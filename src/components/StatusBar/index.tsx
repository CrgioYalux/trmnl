import './StatusBar.css';

interface StatusBarProps {
    className?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ className = '' }) => {
    return (
        <div className={`StatusBar ${className}`}>
            <ul className='StatusBar__box StatusBar__envs_box'>
                <li className='StatusBar__item envs_item'>1</li>
                <li className='StatusBar__item envs_item'>2</li>
                <li className='StatusBar__item envs_item'>3</li>
                <li className='StatusBar__item envs_item --active'>4</li>
            </ul>
            <p className='StatusBar__box StatusBar__datetime_box'>
                <span>Mon, Dec 26</span><span>04:04:04</span>
            </p>
            <ul className='StatusBar__box StatusBar__system_options_box'>
                <li className='StatusBar__item system_options_item'>En</li>
                <li className='StatusBar__item system_options_item'>Q</li>
            </ul>
        </div>
    );
}
