import './StatusBar.css';

import { useState, useEffect } from 'react';
import { getDateString, getTimeString } from './utils';
import { useSystemOptions } from '../../providers/SystemOptions';
import { Theme } from '../../providers/SystemOptions/theme';

import { SunIcon } from '../Icons/SunIcon';
import { MoonIcon } from '../Icons/MoonIcon';

interface StatusBarProps {
    className?: string;
}

type DateTime = {
    date: string,
    time: string
}

export const StatusBar: React.FC<StatusBarProps> = ({ className = '' }) => {
    const [activeEnv, setActiveEnv] = useState<number>(4);
    const [{ date, time }, setDateTime] = useState<DateTime>(() => (
        {
            date: getDateString(),
            time: getTimeString()
        }
    ));
    const {
        plasmaBackgroundVisibility, switchPlasmaBackgroundVisibility,
        theme, switchTheme
    } = useSystemOptions();


    useEffect(() => {
        const intervalDateTime = setInterval(() => {
            setDateTime({
                date: getDateString(),
                time: getTimeString()
            });

        }, 1000);
        return () => clearInterval(intervalDateTime);
    }, []);

    return (
        <div className={`StatusBar ${className}`}>
            <ul className='StatusBar__box StatusBar__envs_box'>
                {[...Array(4).keys()].map((i) => {
                    const n = i + 1;
                    return (
                        <li
                            key={n}
                            onClick={() => setActiveEnv(n)}
                            className={`StatusBar__item envs_item ${(activeEnv === n) ? '--active' : '--inactive'}`}
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
                >bg</li>
                <li className='StatusBar__item system_options_item'>En</li>
                <li
                    className='StatusBar__item system_options_item'
                    onClick={() => switchTheme()}
                >
                {theme === Theme.Dark ? <SunIcon /> : <MoonIcon />}
                </li>
                <li className='StatusBar__item system_options_item'>Q</li>
            </ul>
        </div>
    );
}
