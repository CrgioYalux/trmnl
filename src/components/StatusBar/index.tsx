import { useState } from 'react';
import './StatusBar.css';

interface StatusBarProps {
    className?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ className = '' }) => {
    const [activeEnv, setActiveEnv] = useState<number>(4);

    return (
        <div className={`StatusBar ${className}`}>
            <ul className='StatusBar__box StatusBar__envs_box'>
                {[...Array(4).keys()].map((i) => {
                    let n = i + 1;
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
                <span>Mon, Dec 26</span><span>04:04:04</span>
            </p>
            <ul className='StatusBar__box StatusBar__system_options_box'>
                <li className='StatusBar__item system_options_item'>En</li>
                <li className='StatusBar__item system_options_item'>Q</li>
            </ul>
        </div>
    );
}
