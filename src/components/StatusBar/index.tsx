import './StatusBar.css';

import { useSystemOptions } from '../../providers/SystemOptions';
import { useDateTime } from '../../hooks/useDateTime';

import { SunIcon } from '../Icons/SunIcon';
import { MoonIcon } from '../Icons/MoonIcon';

interface StatusBarProps {
    className?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ className = '' }) => {
    const { date, time } = useDateTime();
    const {
        plasmaBackgroundVisibility, switchPlasmaBackgroundVisibility,
        theme, switchTheme
    } = useSystemOptions();

    return (
        <div className={`StatusBar ${className}`}>
            <div className='StatusBar__box StatusBar__title_box'>
                <span>Trmnl</span>
            </div>
            <div className='StatusBar__box StatusBar__datetime_box'>
                <span>{date}</span><span>{time}</span>
            </div>
            <div className='StatusBar__box StatusBar__system_options_box'>
                <button 
                    className={`StatusBar_system_options__item ${(plasmaBackgroundVisibility) ? '--active' : '--inactive'}`}
                    onClick={switchPlasmaBackgroundVisibility}
                >Background: {plasmaBackgroundVisibility ? 'Yes' : 'No'}</button>
                <button
                    className='StatusBar_system_options__item'
                    onClick={switchTheme}
                >
                {theme === 'dark' 
                ? <SunIcon className='StatusBar_system_options_item__icon' /> 
                : <MoonIcon className='StatusBar_system_options_item__icon' />}
                </button>
            </div>
        </div>
    );
}
