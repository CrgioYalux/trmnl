import { useState, useEffect } from 'react';
import { getNowDateTime } from './utils';
import type { DateTime } from './utils';

export function useDateTime(): DateTime {
    const [dateTime, setDateTime] = useState<DateTime>(() => getNowDateTime());

    useEffect(() => {
        const intervalDateTime = setInterval(() => {
            setDateTime(getNowDateTime());
        }, 1000);
        return () => clearInterval(intervalDateTime);
    }, []);

    return dateTime;
}
