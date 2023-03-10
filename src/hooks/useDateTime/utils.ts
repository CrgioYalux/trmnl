const WeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
type WeekDay = typeof WeekDays[number];

const YearMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const;
type YearMonth = typeof YearMonths[number];

type DateTime = {
    date: string;
    time: string;
}

function getDateString(): string {
    const now = new Date();
    
    const weekDay: WeekDay = WeekDays[now.getDay()];
    const month: YearMonth = YearMonths[now.getMonth()];
    const day = now.getDate();

    return `${weekDay.slice(0, 3)}, ${month.slice(0, 3)} ${day}`;
}


function getTimeString(): string {
    const now = new Date();

    const format = (n: number): string => n < 10 ? `0${n}` : `${n}`;

    const seconds = format(now.getSeconds());
    const minutes = format(now.getMinutes());
    const hours = format(now.getHours());

    return `${hours}:${minutes}:${seconds}`;
}

function getNowDateTime(): DateTime {
    return {
        date: getDateString(),
        time: getTimeString()
    }
}

export type { DateTime };
export { getNowDateTime };
