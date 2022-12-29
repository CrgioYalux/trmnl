import './PlasmaBackground.css';

import { useState } from 'react';

interface PlasmaBackgroundProps {
    className?: string;
    colors?: string[],
    duration?: number,
    areaSize?: number
}

const defaultPlasmaBackgroundProps = {
    className: '',
    colors: ['rgb(222,25,58)','rgb(81,15,59)','rgb(92,21,192)'],
    duration: 16,
    areaSize: 4
};

export const PlasmaBackground: React.FC<PlasmaBackgroundProps> = (props) => {
    const [{ className, colors, duration, areaSize }] = useState(() => {
        return {
            className: props.className ?? defaultPlasmaBackgroundProps.className,
            colors: props.colors ?? defaultPlasmaBackgroundProps.colors,
            duration: props.duration ?? defaultPlasmaBackgroundProps.duration,
            areaSize: props.areaSize ?? defaultPlasmaBackgroundProps.areaSize
        }
    });

    return (
        <>
            <div className={`PlasmaBackground ${className}`}>
                {
                    colors.map((c, i) => {
                        const n = i + 1;
                        const size = ((colors.length * areaSize) * 100) - (n * 100 - 50);

                        const style = {
                            background: c,
                            animationDuration: `${duration}s`,
                            animationName: `animation-gradient-${n}`,
                            zIndex: n * (-1),
                            height: size,
                            width: size,
                            top: `${50 + (Math.random() > .5 ? (n * 10) : (n * 10 * (-1)))}%`,
                            left: `${50 + (Math.random() > .5 ? (n * 10) : (n * 10 * (-1)))}%`,

                        };
                        const className = `gradient gradient-${(n % 3) + 1}`;

                        return (
                            <div 
                                key={n}
                                style={style}
                                className={className}
                            ></div>
                        )
                    })
                }
            </div>
        </>
    );
};


