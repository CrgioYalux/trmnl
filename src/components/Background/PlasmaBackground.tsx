import './PlasmaBackground.css';

import { useState } from 'react';

interface PlasmaBackgroundProps {
    className?: string;
    colors?: string[];
    duration?: number;
    areaSize?: number;
}

const defaultPlasmaBackgroundProps = {
    className: '',
    colors: ['red','blue','green', 'purple'],
    duration: 12,
    areaSize: 10
};

const randomTop = Math.random();
const randomLeft = Math.random();

export const PlasmaBackground: React.FC<PlasmaBackgroundProps> = (props) => {
    const [animation] = useState(() => {
        const className: string = props.className ?? defaultPlasmaBackgroundProps.className;
        const colors: string[] = props.colors ?? defaultPlasmaBackgroundProps.colors;
        const duration: number = props.duration ?? defaultPlasmaBackgroundProps.duration;
        const areaSize: number = (props.areaSize ?? defaultPlasmaBackgroundProps.areaSize) * 100;
        return {
            className,
            colors,
            duration,
            areaSize
        }
    });

    return (
            <div className={`PlasmaBackground ${animation.className}`}>
                {
                    animation.colors.map((c, i) => {
                        const n = i + 1;
                        const gradientNum = (n % 3) + 1;

                        const size = animation.areaSize - (i * 100);
                        const top = randomTop > .5 ? gradientNum * 10 : gradientNum * -10;
                        const left = randomLeft > .5 ? gradientNum * 10 : gradientNum * -10;

                        const style = {
                            background: c,
                            animationDuration: `${animation.duration}s`,
                            animationName: `animation-gradient-${gradientNum}`,
                            zIndex: n * (-1),
                            height: size,
                            width: size,
                            top: `${50 + top}%`,
                            left: `${50 + left}%`,
                        }

                        return (
                            <div 
                                key={n}
                                style={style}
                                className='gradient'
                            ></div>
                        )
                    })
                }
            </div>
    );
};
