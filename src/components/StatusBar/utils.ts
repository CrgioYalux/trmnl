enum WeekDays {
    'Monday' = 1,
    'Tuesday' = 2,
    'Wednesday' = 3,
    'Thursday' = 4,
    'Friday' = 5,
    'Satuday' = 6,
    'Sunday' = 7,
}

enum YearMonths {
    'January' = 1,
    'February' = 2,
    'March' = 3,
    'April' = 4,
    'May' = 5,
    'June' = 6,
    'July' = 7,
    'August' = 8,
    'September' = 9,
    'October' = 10,
    'November' = 11,
    'December' = 12
}

type DateTime = {
    date: string,
    time: string
}

function getDateString(): string {
    const now = new Date();
    
    const weekDay = now.getDay();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    return `${WeekDays[weekDay].slice(0, 3)}, ${YearMonths[month].slice(0, 3)} ${day}`;
}


function getTimeString(): string {
    const now = new Date();

    const _ = (n: number): string => n < 10 ? `0${n}` : `${n}`;

    let seconds = _(now.getSeconds());
    let minutes = _(now.getMinutes());
    let hours = _(now.getHours());

    return `${hours}:${minutes}:${seconds}`;
}

function getNowDateTime(): DateTime {
    return {
        date: getDateString(),
        time: getTimeString()
    }
}

export {
    getNowDateTime,
    type DateTime
}

