import { getBasicInfoByDateModel, getRecordByDateModel } from "../../model/common.model";
import { add_times } from "./time_helper";

export function getPanjangamInfoByDate(date: any, type?: string) {
    if (type === 'allInfo') {
        return getRecordByDateModel(date);
    } else {
        return getBasicInfoByDateModel(date);
    }
}

export function getNaligaiByHours(hours: string | number) {
    hours = hours.toString();
    const temp1: any = hours.split('.');
    const temp2 = (temp1[0] * 2.5);
    const temp3 = temp2.toString().split('.');
    // Calculate vinadi for Hours
    let vinadi = '00';
    if (temp3[1]) {
        if ((temp3[1] === '50') || (temp3[1] === '5')) {
            vinadi = '30';
        }
    }
    // Calculate for Minutes
    const temp4 = (temp1[1] * 2.5);
    const temp5: any = temp4.toString().split('.');
    if (temp5[0] < 10) {
        temp5[0] = temp5[0].toString().padStart(2, '0');
    }
    // Final Total
    const val1 = temp3[0] + '.' + vinadi;
    const val2 = '00.' + temp5[0];
    const total = add_times(val1, val2);
    return total;
}
