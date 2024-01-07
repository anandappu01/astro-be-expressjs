import { Request, Response } from 'express';
import { convert_seconds, getPanjangamInfoByDate } from '../assets/utils/common_helper';
import { ChartInfo, Dayinfo } from '../assets/interface/common.interface';
import { nextDateByCount, previousDateByCount } from '../assets/utils/dateformat_helper';
import { getTamilMonthModel } from '../model/common.model';

const result: ChartInfo = {};

export async function getAstroChart(req: Request, res: Response) {
    console.log("getAstroChart attempt ...");
    const inputDate = req.body['date'];
    const { time, time_type, gender } = req.body;
    console.log(req.body);
    const inputDateinfoArray = await getPanjangamInfoByDate(inputDate);
    let before_date_details;
    let that_date_details;
    let next_date_details;
    if (inputDateinfoArray.length) {
        const inputDateRes: Dayinfo = inputDateinfoArray[0];
        // console.log(inputDateRes.sunrise);
        // console.log(inputDateRes);
        let before_date;
        let that_date;
        let next_date;

        const sunrise = '' + inputDateRes.sunrise;
        result.sunrise = sunrise;
        result.eng_date = inputDate;
        if (time_type == 'AM') {
            const sunrise_seconds = convert_seconds(sunrise);
            const time_birth_seconds = convert_seconds(time);
            const middle_seconds = convert_seconds('11.59');
            // console.log(sunrise_seconds);
            // console.log(time_birth_seconds);
            // console.log(middle_seconds);

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
    console.log(before_date_details);
    console.log(that_date_details);
    console.log(next_date_details);
    result.tamil_date = that_date_details[0]['tamil_date'];
    const month_details = await getTamilMonthModel(that_date_details[0]['month_id']);
    result.tamil_month_id = month_details[0].tamilmonth_id;
    result.tamil_month = month_details[0].month_name;
    // console.log(month_details);
    console.log(result);
    // result.tamil_month = that_date_details[0]['month_name'];
} 