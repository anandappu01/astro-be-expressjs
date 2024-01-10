export function add_times(val1: string, val2: string) {
    // const val1_sec = convert_seconds(val1);
    // const val2_sec = convert_seconds(val2);
    // const val = val1_sec + val2_sec;
    // return convert_hours(val);
}

export function getTimeDifference_HHMM(dateTime1: string, dateTime2: string) {
    // const d = new Date('2024-01-09 00:00').valueOf();
    // const d2 = new Date('2024-01-10 10:46').valueOf();
    const d = new Date(dateTime1).valueOf();
    const d2 = new Date(dateTime2).valueOf();
    const timeDiff = (d2 - d);
    const hDiff = timeDiff / 3600000; //in hours
    const hrs = Math.floor(hDiff);
    const minsDiff = timeDiff - (hrs * 3600000);
    const min = '' + (minsDiff / 60000); //in minutes
    // console.log(dateTime1 + ',' + dateTime2);
    // console.log(d + ',' + d2);
    // console.log(timeDiff);
    return hrs + '.' + min.padStart(2, "0");
}
