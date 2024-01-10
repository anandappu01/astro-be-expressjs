import { Request, Response } from 'express';
import { convert_seconds, getPanjangamInfoByDate } from '../assets/utils/common_helper';
import { ChartInfo, Dayinfo } from '../assets/interface/common.interface';
import { formatDate_DMY_WITH_HYPHENS, nextDateByCount, previousDateByCount } from '../assets/utils/date_helper';
import { getTamilMonthModel } from '../model/common.model';
import { getTimeDifference_HHMM } from '../assets/utils/time_helper';

const result: ChartInfo = {};

export async function getAstroChart(req: Request, res: Response) {
    console.log("getAstroChart attempt ...");
    const inputDate = req.body['date'];
    const birth_time = req.body['time'];
    const { time_type, gender } = req.body;
    console.log(req.body);
    result.inputDate = inputDate;
    result.birth_date = formatDate_DMY_WITH_HYPHENS(new Date(inputDate));
    result.birth_time = birth_time;
    result.time_type = time_type;
    result.gender = gender;
    const inputDateinfoArray = await getPanjangamInfoByDate(inputDate);
    let before_date_details;
    let that_date_details;
    let next_date_details;
    if (inputDateinfoArray.length) {
        const inputDateRes: Dayinfo = inputDateinfoArray[0];
        // console.log(inputDateRes.sunrise);
        let before_date;
        let that_date;
        let next_date;
        const sunrise = '' + inputDateRes.sunrise;
        result.sunrise = sunrise;
        result.eng_date = inputDate;
        if (time_type == 'AM') {
            const sunrise_seconds = convert_seconds(sunrise);
            const time_birth_seconds = convert_seconds(birth_time);
            const middle_seconds = convert_seconds('11.59');
            // console.log(sunrise_seconds);
            //  NOTE: Befor night after 12.00 PM also satisfyed ($time_birth_seconds > $sunrise_seconds) ITS WRONG
            //  SO WE NEED TO CREATE Another 1 condition followes.
            if (time_birth_seconds > middle_seconds) {    // EG(12.40 AM > 11.59 PM)
                // Previous day calculation.
                before_date = previousDateByCount(inputDate, 2);
                that_date = previousDateByCount(inputDate, 1);
                next_date = inputDate;
            } else if (time_birth_seconds > sunrise_seconds) {
                // That day calculation.
                before_date = previousDateByCount(inputDate, 1);
                that_date = inputDate;
                next_date = nextDateByCount(inputDate, 1);
            } else if (time_birth_seconds == sunrise_seconds) {
                res.status(200).json('Sunrise and time of birth is Equal pls adjust birth time');
                return false;
            } else {
                // Previous day calculation.
                before_date = previousDateByCount(inputDate, 2);
                that_date = previousDateByCount(inputDate, 1);
                next_date = inputDate;
            }
        } else if (time_type == 'PM') {
            // That day calculation.
            before_date = previousDateByCount(inputDate, 1);
            that_date = inputDate;
            next_date = nextDateByCount(inputDate, 1);
        }
        before_date_details = await getPanjangamInfoByDate(before_date);
        that_date_details = await getPanjangamInfoByDate(that_date);
        next_date_details = await getPanjangamInfoByDate(next_date);
        result.before_date_details = before_date_details[0];
        result.that_date_details = that_date_details[0];
        result.next_date_details = next_date_details[0];
        if (!before_date_details.length) {
            res.status(200).json('Record Not Found in DB for that year You Entered! <br> Before Date Not Available <br> <b>Error Id 02 </b> ');
            return false;
        }
        if (!next_date_details.length) {
            res.status(200).json('Record Not Found in DB for that year You Entered! <br> Next Date Not Available <br> <b>Error Id 03 </b> ');
            return false;
        }
    } else {
        res.status(200).json('Record Not Found in DB for that year You Entered! <br> <b>Error Id 01 </b> ');
        return false;
    }
    // console.log(before_date_details);
    // console.log(that_date_details);
    // console.log(next_date_details);
    result.tamil_date = that_date_details[0]['tamil_date'];
    const month_details = await getTamilMonthModel(that_date_details[0]['month_id']);
    result.tamil_month_id = month_details[0].tamilmonth_id;
    result.tamil_month = month_details[0].month_name;
    // console.log(month_details);
    result.basehrs = getBasehrs();
    // getNaligai();
    console.log(result);
}
export function getBasehrs() {
    const sunRise = '' + result.that_date_details.sun_rise_value;
    const birthTime = '' + result.birth_time;
    const sunriceArray: any = sunRise.split('.');
    const birthTimeArray: any = birthTime.split('.');
    const dateTime1 = `${result.that_date_details?.eng_date} ${sunriceArray[0].padStart(2, '0')}:${sunriceArray[1]} AM`;
    // Here both result.inputDate and birthdate are same but formate is different.
    const dateTime2 = `${result.inputDate} ${birthTimeArray[0].padStart(2, '0')}:${birthTimeArray[1]} ${result.time_type}`;
    const diff = getTimeDifference_HHMM(dateTime1, dateTime2);
    // console.log(diff);
    return diff;
}