import { getRecordByDateModel } from "../../model/common.model";

export function getPanjangamInfoByDate(date: any) {
    return getRecordByDateModel(date);
}

export function getNaligaiByHours(hours: string) {
    const hrsArray = hours.split(".");
    const hrs: any = hrsArray[0];
    const mins: any = hrsArray[1];
    // Convert Hours into Naligai
    const temp_hrs_naligaiVinadi = (hrs * 2.5);
    const hrs_naligaiArray = temp_hrs_naligaiVinadi.toString().split(".");
    const hrs_naligai = hrs_naligaiArray[0];
    let hrs_vinadi = hrs_naligaiArray[1];
    if (hrs_vinadi) {
        if ((hrs_vinadi === '50') || (hrs_vinadi === '5')) {
            hrs_vinadi = '30';
        }
    }
    // Convert Mins into Naligai (Only Vinadi Later we convert as Naligai.Vinadi)
    const mins_vinadi = (mins * 2.5);
    const mins_vinadiArray = mins_vinadi.toString().split(".");

    const val1 = `${hrs_naligai}.${hrs_vinadi}`;
    const val2 = `00.${mins_vinadiArray[0]}`;
    const total = add_times(val1, val2);
    return total;
}

export function add_times(val1: string, val2: string) {
    const val1_sec = convert_seconds(val1);
    const val2_sec = convert_seconds(val2);
    const val = val1_sec + val2_sec;
    return convert_hours(val);
}

export function subtract_times(val1: string, val2: string) {
    const val1_sec = convert_seconds(val1);
    const val2_sec = convert_seconds(val2);
    const val = val1_sec - val2_sec;
    return convert_hours(val);
}

export function convert_seconds(naligai: string) {
    // console.log(naligai);
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
    }

    const sec1 = (val1 * 3600);
    const sec2 = (val2 * 60);
    const seconds = (sec1 + sec2);
    return seconds;
}

export function convert_hours(sections: number) {
    const val: any = (sections / 3600);
    const arround = val.split(".");
    const temp1 = (arround[0] * 3600);
    const val1 = (sections - temp1);
    const temp2 = (temp1 / 3600);
    let temp3: any = (val1 / 60);
    if (temp3 < 10) {
        temp3 = `0.${temp3}`;
    }
    return `${temp2}.${temp3}`;
}