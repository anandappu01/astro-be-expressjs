import { Request, Response } from 'express';
import { getNaligaiByHours, getPanjangamInfoByDate } from '../assets/utils/common_helper';
import { ChartInfo, Dayinfo } from '../assets/interface/common.interface';
import { formatDate_DMY_WITH_HYPHENS, nextDateByCount, previousDateByCount } from '../assets/utils/date_helper';
import { getAllLagunamModel, getTamilMonthModel } from '../model/common.model';
import { add_times, convert_seconds, getTimeDifference_HHMM, subtract_times } from '../assets/utils/time_helper';

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
            //  NOTE: Befor night after 12.00 PM also satisfyed (time_birth_seconds > sunrise_seconds) ITS WRONG
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
    result.birthNaligai = getNaligaiByHours(result.basehrs);
    result.Kalam_no = getKaalam(result.basehrs);
    // getLagunam(get_naligai, that_date_details[0]['lagunam_id'], that_date_details[0]['lagunam_val']);
    // Calculate Lagunam Details
    const lagunamList = await getAllLagunamModel();
    // console.log(lagunamList);
    getLagunam(lagunamList);
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
export function getKaalam(basehrs: string) { // Male or Female
    const sec_for_half_hour = 1800;
    const basehrs_sec = convert_seconds(basehrs);
    return Math.ceil(basehrs_sec / sec_for_half_hour);
}
export function getLagunam(lagunamList: []) {
    // console.log(result.birthNaligai);
    // console.log(result.that_date_details['lagunam_id']);
    // console.log(result.that_date_details['lagunam_val']);
    const birthNaligai: any = result.birthNaligai;
    const thatDayLagunamId = result.that_date_details['lagunam_id'];
    const thatDayLagunamVal = result.that_date_details['lagunam_val'];

    let total = '';
    if (birthNaligai === thatDayLagunamVal) {  // 4.50 = 4.50
        result.lagnam_name = lagunamList[thatDayLagunamId - 1]['lagunam'];
        result.lagnam_val = lagunamList[thatDayLagunamId - 1]['lagunam_val'];
        result.lagnam_id = lagunamList[thatDayLagunamId - 1]['lagunam_id'];
        result.lagunam_palan = lagunamList[thatDayLagunamId - 1]['laguna_palan'];
        result.lagunam_eruppu = 0.00;
        result.lagunam_sell = result.lagunam_eruppu;
        // $amsam_details = get_amsalagunam($lagnamid_temp, $lagunam_val, $lagunam_sell);
        total = '';
        result.lagunam_eruppu = result.lagunam_eruppu;
    } else if (birthNaligai < thatDayLagunamVal) {  // 1.17 < 4.50
        result.lagnam_name = lagunamList[thatDayLagunamId - 1]['lagunam'];
        result.lagnam_val = lagunamList[thatDayLagunamId - 1]['lagunam_val'];
        result.lagnam_id = lagunamList[thatDayLagunamId - 1]['lagunam_id'];
        result.lagunam_palan = lagunamList[thatDayLagunamId - 1]['laguna_palan'];
        result.lagunam_eruppu = Number(subtract_times(thatDayLagunamVal, birthNaligai));
        result.lagunam_sell = Number(subtract_times(result.lagnam_val, result.lagunam_eruppu.toString()));
        const amsam_details = get_amsalagunam(result.lagnam_id, result.lagnam_val, result.lagunam_sell);
        total = '';
        result.lagunam_eruppu = result.lagunam_eruppu;
    }
    // console.log(result);
    // return result;
}
export function get_amsalagunam(lagnamid: number, lagnam_val: number, lagunam_sell: number) {
    // // get laguna sell naligai start
    // const b = convert_naligai_to_vinadi(lagunam_sell);
    // // get laguna sell naligai End

    // let oneNinth = 0;
    // let muthalAdhi = 1;
    // if (lagnamid === 1) {         // Messam
    //     oneNinth = 30.3333;
    //     muthalAdhi = 1;    /* Messa,Simma,Dhanusu --> Messam Muthal Adhi */
    //     // athi = 'Mesam';
    // }
    // if (lagnamid === 2) {         // Risha
    //     oneNinth = 34.1111;
    //     muthalAdhi = 10;   /* Rishaba,Kanni,Maharam --> Maharam Muthal Adhi */
    //     // athi = 'Magaram';
    // }
    // if (lagnamid === 3) {         // Mithu
    //     oneNinth = 36.4444;
    //     muthalAdhi = 7;    /* Mithuna,Thulam,Kumbam --> Thulam Muthal Adhi */
    //     // athi = 'Thulam';
    // }
    // if (lagnamid === 4) {         // Kadagam
    //     oneNinth = 35.5555;
    //     muthalAdhi = 4;
    //     // athi = 'Kadagam';
    // }
    // if (lagnamid === 5) {         // Simmam
    //     oneNinth = 33.6666;
    //     muthalAdhi = 1;    /* Messa,Simma,Dhanusu --> Messam Muthal Adhi */
    //     // athi = 'Mesam';
    // }
    // if (lagnamid === 6) {         // Kanni
    //     oneNinth = 33.2222;
    //     muthalAdhi = 10;   /* Rishaba,Kanni,Maharam --> Maharam Muthal Adhi */
    //     // athi = 'Magaram';
    // }
    // if (lagnamid === 7) {         // Thulam
    //     oneNinth = 34.6666;
    //     muthalAdhi = 7;    /* Mithuna,Thulam,Kumbam --> Thulam Muthal Adhi */
    //     // athi = 'Thulam';
    // }
    // if (lagnamid === 8) {         // Viruchi
    //     oneNinth = 36.3333;
    //     muthalAdhi = 4;
    //     // athi = 'Kadagam';
    // }
    // if (lagnamid === 9) {         // Dhanusu
    //     oneNinth = 35.5555;
    //     muthalAdhi = 1;    /* Messa,Simma,Dhanusu --> Messam Muthal Adhi */
    //     // athi = 'Mesam';
    // }
    // if (lagnamid === 10) {         // Magaram
    //     oneNinth = 32;
    //     muthalAdhi = 10;   /* Rishaba,Kanni,Maharam --> Maharam Muthal Adhi */
    //     // athi = 'Magaram';
    // }
    // if (lagnamid === 11) {         // Kumbam
    //     oneNinth = 28.7777;
    //     muthalAdhi = 7;    /* Mithuna,Thulam,Kumbam --> Thulam Muthal Adhi */
    //     // athi = 'Thulam';
    // }
    // if (lagnamid === 12) {         // Menam
    //     oneNinth = 28.2222;
    //     muthalAdhi = 4;
    //     // athi = 'Kadagam';
    // }

    // const c = (b / oneNinth)
    // const d = c.toString().split('.');
    // const f = mb_substr(d[1], 0, 1);
    // let g = '0';
    // if (f == 0) {
    //     g = d[0];
    // } else {
    //     g = d[0] + 1;
    // }
    // //        echo 'g =>'.g.'<br>';
    // result = all_lagunam('*');
    // l = array();
    // foreach(result as key => row) {
    //     lagunam_id = row['lagunam_id'];
    //     l[lagunam_id] = row;
    // }

    // limit = (muthalAdhi + g);
    // /* For Default Amsa Lagunam ***START*** ERROR FIXED ON 21-Dec-2017 For Below Senario 
    //  * Assumed Lagunam is Mithunam -> 5.28  -> 36.444
    //  * Mithunam Eruppu -> 5.26
    //  * Mithunam Sel -> 0.2
    //  * So (2/36.444) => 0.054 so Equals to ZERO
    //  * So Condition Fails on below for Loop.
    //  * So Mithuna,Thulam,Kumbam --> Thulam Muthal Adhi
    //  */
    // xx = limit;
    // if (xx >= 13) {
    //     xx = (xx - 12);
    // }
    // //        echo xx; die;
    // amsam = l[xx]['lagunam'];
    // /* For Default Amsa Lagunam ***END*** ON 21-Dec-2017 */
    // for (i = muthalAdhi; i < limit; i++) {
    //     xx = i;
    //     if (xx >= 13) {
    //         xx = (xx - 12);
    //     }
    //     amsam = l[xx]['lagunam'];
    // }
    // amsam_details = array('amsam_id' => xx, 'amsam' => amsam);
    // return amsam_details;
}