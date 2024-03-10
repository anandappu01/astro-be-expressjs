export function add_times(val1: string | number, val2: string | number) {
    const val1_sec = convert_seconds(val1);
    const val2_sec = convert_seconds(val2);
    const val = val1_sec + val2_sec;
    return convert_hours(val);
}

export function subtract_times(val1: string | number, val2: string | number) {
    const val1_sec = convert_seconds(val1);
    const val2_sec = convert_seconds(val2);
    const val = val1_sec - val2_sec;
    return convert_hours(val);
}

export function convert_seconds(naligai: string | number) {
    // console.log(naligai);
    naligai = naligai.toString();
    const type1 = naligai.includes(".");
    const type2 = naligai.includes(":");

    let val1: any = 0;
    let val2: any = 0;
    if (type1) {
        const type1Array = naligai.split(".");
        val1 = type1Array[0];
        val2 = type1Array[1];
    } else if (type2) {
        const type2Array = naligai.split(":");
        val1 = type2Array[0];
        val2 = type2Array[1];
    } else {
        console.warn('Invalid input - convertSeconds');
        return 0;
     }

    const sec1 = (val1 * 3600);
    const sec2 = (val2 * 60);
    const seconds = (sec1 + sec2);
    return seconds;
}

export function convert_hours(seconds: number) {
    const hoursMinutes = (seconds / 3600);
    const hhmmArray = hoursMinutes.toString().split(".");
    const temp1 = (Number(hhmmArray[0]) * 3600);
    const val1 = (seconds - temp1);
    const temp2 = (temp1 / 3600);
    let temp3: any = (val1 / 60);
    if (temp3 < 10) {
        temp3 = temp3.toString().padStart(2, '0');
    }
    return temp2 + '.' + temp3;
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
    return hrs + '.' + min.padStart(2, "0");
}
