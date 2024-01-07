export function add_times(val1: string, val2: string) {
    // const val1_sec = convert_seconds(val1);
    // const val2_sec = convert_seconds(val2);
    // const val = val1_sec + val2_sec;
    // return convert_hours(val);
}

export function padTo2Digits(num: any) {
    return num.toString().padStart(2, '0');
}

export function formatDate(date: Date) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}

export function getPreviousDate(inputDate: string) {
    const inputDateObj = new Date(inputDate);
    const previous = new Date(inputDateObj.getTime());
    previous.setDate(inputDateObj.getDate() - 1);
    // return previous;
    return formatDate(previous);
}

export function getNextDate(inputDate: string) {
    const inputDateObj = new Date(inputDate);
    const next = new Date(inputDateObj.getTime());
    next.setDate(inputDateObj.getDate() + 1);
    return formatDate(next);
}

export function nextDateByCount(inputDate: string, days: number) {
    const inputDateObj = new Date(inputDate);
    const next = new Date(inputDateObj.getTime());
    next.setDate(inputDateObj.getDate() + days);
    return formatDate(next);
}
export function previousDateByCount(inputDate: string, days: number) {
    const inputDateObj = new Date(inputDate);
    const next = new Date(inputDateObj.getTime());
    next.setDate(inputDateObj.getDate() - days);
    return formatDate(next);
}