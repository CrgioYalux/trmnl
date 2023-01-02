import { useEffect } from 'react';
import { DateTime, getNowDateTime } from './utils';

export function updateDateTime(setter: React.Dispatch<React.SetStateAction<DateTime>>) {
    useEffect(() => {
        const intervalDateTime = setInterval(() => {
            setter(getNowDateTime());
        }, 1000);
        return () => clearInterval(intervalDateTime);
    }, []);
}
