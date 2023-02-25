import './StatusBar.css';

import { useSystemOptions } from '../../providers/SystemOptions';
import { useDateTime } from '../../hooks/useDateTime';

import { SunIcon } from '../Icons/SunIcon';
import { MoonIcon } from '../Icons/MoonIcon';

interface StatusBarProps {
    className?: string;
}

const ENVS: number[] = [1, 2, 3, 4];

export const StatusBar: React.FC<StatusBarProps> = ({ className = '' }) => {
    const { date, time } = useDateTime();
    const {
        plasmaBackgroundVisibility, switchPlasmaBackgroundVisibility,
        theme, switchTheme
    } = useSystemOptions();

    return (
        <div className={`StatusBar ${className}`}>
            <div className='StatusBar__box StatusBar__envs_box'>
            {ENVS.map((n) => (
                <label
                    key={n}
                    htmlFor={`env_${n}`}
                    className={`StatusBar__item envs_item`}
                >
                    <input
                        type='radio'
                        name='env'
                        value={n}
                        tabIndex={n}
                        id={`env_${n}`}
                        defaultChecked={n === ENVS.length}
                    />
                    <span>{n}</span>
                </label>
            ))}
            </div>
            <p className='StatusBar__box StatusBar__datetime_box'>
                <span>{date}</span><span>{time}</span>
            </p>
            <ul className='StatusBar__box StatusBar__system_options_box'>
                <li 
                    className={`StatusBar__item system_options_item ${(plasmaBackgroundVisibility) ? '--active' : '--inactive'}`}
                    onClick={() => switchPlasmaBackgroundVisibility()}
                    tabIndex={ENVS.length + 1}
                >bg</li>
                <li
                    className='StatusBar__item system_options_item'
                    onClick={() => switchTheme()}
                    tabIndex={ENVS.length + 2}
                >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </li>
            </ul>
        </div>
    );
}
