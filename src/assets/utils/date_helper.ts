export function padTo2Digits(num: any) {
    return num.toString().padStart(2, '0');
}
export function formatDate_YMD_WITH_HYPHENS(date: Date) {
    // console.log(date);
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}
export function formatDate_DMY_WITH_HYPHENS(date: Date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('-');
}
export function getPreviousDate(inputDate: string) {
    const inputDateObj = new Date(inputDate);
    const previous = new Date(inputDateObj.getTime());
    previous.setDate(inputDateObj.getDate() - 1);
    // return previous;
    return formatDate_YMD_WITH_HYPHENS(previous);
}
export function getNextDate(inputDate: string) {
    const inputDateObj = new Date(inputDate);
    const next = new Date(inputDateObj.getTime());
    next.setDate(inputDateObj.getDate() + 1);
    return formatDate_YMD_WITH_HYPHENS(next);
}
export function nextDateByCount(inputDate: string, days: number) {
    const inputDateObj = new Date(inputDate);
    const next = new Date(inputDateObj.getTime());
    next.setDate(inputDateObj.getDate() + days);
    return formatDate_YMD_WITH_HYPHENS(next);
}
export function previousDateByCount(inputDate: string, days: number) {
    const inputDateObj = new Date(inputDate);
    const next = new Date(inputDateObj.getTime());
    next.setDate(inputDateObj.getDate() - days);
    return formatDate_YMD_WITH_HYPHENS(next);
}