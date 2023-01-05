import './StatusBar.css';

import { useState } from 'react';
import { DateTime, getNowDateTime } from './utils';
import { useSystemOptions } from '../../providers/SystemOptions';
import { updateDateTime } from './updateDateTime';

import { SunIcon } from '../Icons/SunIcon';
import { MoonIcon } from '../Icons/MoonIcon';

interface StatusBarProps {
    className?: string;
}

const NUMOF_ENVS = 4;
const ENVS = [...Array(NUMOF_ENVS).keys()].map((e) => e + 1);

export const StatusBar: React.FC<StatusBarProps> = ({ className = '' }) => {
    const [activeEnv, setActiveEnv] = useState<number>(NUMOF_ENVS);
    const [{ date, time }, setDateTime] = useState<DateTime>(getNowDateTime);
    const {
        plasmaBackgroundVisibility, switchPlasmaBackgroundVisibility,
        theme, switchTheme
    } = useSystemOptions();

    updateDateTime(setDateTime);

    return (
        <div className={`StatusBar ${className}`}>
            <ul className='StatusBar__box StatusBar__envs_box'>
                {ENVS.map((n) => {
                    return (
                        <li
                            key={n}
                            onClick={() => setActiveEnv(n)}
                            className={`StatusBar__item envs_item ${(activeEnv === n) ? '--active' : '--inactive'}`}
                            tabIndex={n}
                        >{n}</li>
                    )
                })}
            </ul>
            <p className='StatusBar__box StatusBar__datetime_box'>
                <span>{date}</span><span>{time}</span>
            </p>
            <ul className='StatusBar__box StatusBar__system_options_box'>
                <li 
                    className={`StatusBar__item system_options_item ${(plasmaBackgroundVisibility) ? '--active' : '--inactive'}`}
                    onClick={() => switchPlasmaBackgroundVisibility()}
                    tabIndex={NUMOF_ENVS + 1}
                >bg</li>
                <li 
                    className='StatusBar__item system_options_item'
                    tabIndex={NUMOF_ENVS + 2}
                >En</li>
                <li
                    className='StatusBar__item system_options_item'
                    onClick={() => switchTheme()}
                    tabIndex={NUMOF_ENVS + 3}
                >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </li>
                <li 
                    className='StatusBar__item system_options_item'
                    tabIndex={NUMOF_ENVS + 4}
                >Q</li>
            </ul>
        </div>
    );
}
