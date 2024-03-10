import { Request, Response } from 'express';
import { getNaligaiByHours, getPanjangamInfoByDate } from '../assets/utils/common_helper';
import { ChartInfo, ChartRes, Dayinfo, lagunam } from '../assets/interface/common.interface';
import { formatDate_DMY_WITH_HYPHENS, nextDateByCount, previousDateByCount } from '../assets/utils/date_helper';
import { getTamilMonthModel, rasi_amsam_box_detail } from '../model/common.model';
import { add_times, convert_seconds, getTimeDifference_HHMM, subtract_times } from '../assets/utils/time_helper';
import { getRasiAmsamPositionId } from '../assets/utils/rasi_amsam_map_helper';
import { naligai2vinadi } from '../assets/utils/naligai2vinadi_helper';
import { getLagunam } from '../assets/utils/lagunam_helper';
import { getRasi } from '../assets/utils/rasi_helper';
import { getMonth } from '../assets/utils/month_helper';
import { getYear } from '../assets/utils/year_helper';
import { getStar } from '../assets/utils/star_helper';
import { getLagunamPalan } from '../assets/utils/lagunapalan_helper';

const result: ChartInfo = {};

export async function getAstroChart(req: Request, res: Response) {
    console.log("getAstroChart attempt ...");
    const inputDate = req.body['date'];
    const birth_time = req.body['time'];
    const { time_type, gender } = req.body;
    console.log(req.body);
    const inputDateinfoArray = await getPanjangamInfoByDate(inputDate);
    let before_date_details: any;
    let that_date_details: any;
    let next_date_details;
    if (inputDateinfoArray.length) {
        const inputDateRes: Dayinfo = inputDateinfoArray[0];
        // console.log(inputDateRes.sunrise);
        let before_date;
        let that_date;
        let next_date;
        if (time_type == 'AM') {
            const sunrise_seconds = convert_seconds(inputDateRes.sunrise);
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
        before_date_details = await getPanjangamInfoByDate(before_date, 'lessInfo');
        that_date_details = await getPanjangamInfoByDate(that_date, 'allInfo');
        next_date_details = await getPanjangamInfoByDate(next_date, 'lessInfo');
        const thatDayInfo = splitInfoByTypes(that_date_details[0], req.body);
        // console.log(thatDayInfo);
        result.thatDayBasicInfo = thatDayInfo.basicInfo;
        result.before_date_details = before_date_details[0];
        result.that_date_details = thatDayInfo.deepInfo;
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

    result.thatDayBasicInfo.basehrs = getBasehrs();
    result.thatDayBasicInfo.birthNaligai = getNaligaiByHours(result.thatDayBasicInfo.basehrs);
    result.thatDayBasicInfo.Kalam_no = getKaalam(result.thatDayBasicInfo.basehrs);

    // console.log(lagunamList);
    const rasi_amsam = await getRasiAmsam(before_date_details, that_date_details, result.thatDayBasicInfo.birthNaligai);
    result.rasiAmsamChartInfo = rasi_amsam;
    // Calculate Lagunam Details
    const lagunamList = getLagunamDetails();
    console.log(result);
}
export function getBasehrs() {
    const baseInfo = result.thatDayBasicInfo;
    const sunRise = baseInfo.sunrise.toString();
    const birthTime = baseInfo.birth_time;
    const sunriceArray: any = sunRise.split('.');
    const birthTimeArray: any = birthTime.split('.');
    const dateTime1 = `${result.that_date_details?.eng_date} ${sunriceArray[0].padStart(2, '0')}:${sunriceArray[1]} AM`;
    // Here both result.inputDate and birthdate are same but formate is different.
    const dateTime2 = `${baseInfo.inputDate} ${birthTimeArray[0].padStart(2, '0')}:${birthTimeArray[1]} ${baseInfo.time_type}`;
    const diff = getTimeDifference_HHMM(dateTime1, dateTime2);
    // console.log(diff);
    return diff;
}
export function getKaalam(basehrs: string) { // Male or Female
    const sec_for_half_hour = 1800;
    const basehrs_sec = convert_seconds(basehrs);
    return Math.ceil(basehrs_sec / sec_for_half_hour);
}
export function getLagunamDetails() {
    const birthNaligai: any = result.thatDayBasicInfo.birthNaligai;
    let thatDayLagunamId = result.that_date_details.lagunam_id;
    const thatDayLagunamVal = result.that_date_details.lagunam_val;
    const lagunamInfo: any = getLagunam();
    const thatDayLagunamInfo = lagunamInfo.filter((x: any) => x.id === thatDayLagunamId)[0];
    // console.log(thatDayLagunamInfo);
    let total = '';
    const chartLagunam = {
        graham_name: 'Lagunam',
        natchathiram_name: '',
        lagunam_palan: '',
        natchathiram_id: 0,
        natchathiram_patham: 0,
        rasi_position: 0,
        rasi_position_name: '',
        amsam_position: 0,
        amsam_position_name: ''
    }
    if (birthNaligai === thatDayLagunamVal) {  // 4.50 = 4.50
        // result.lagnam_name = thatDayLagunamInfo.name;
        // result.lagnam_val = thatDayLagunamInfo.value;
        // result.lagnam_id = thatDayLagunamInfo.id;
        // result.lagunam_palan = thatDayLagunamInfo.palan;
        // result.lagunam_eruppu = 0.00;
        // result.lagunam_sell = result.lagunam_eruppu;
        // // $amsam_details = get_amsalagunam($lagnamid_temp, $lagunam_val, $lagunam_sell);
        // total = '';
        // result.lagunam_eruppu = result.lagunam_eruppu;
        chartLagunam.rasi_position = thatDayLagunamInfo.id;
        chartLagunam.rasi_position_name = thatDayLagunamInfo.name;
    } else if (birthNaligai < thatDayLagunamVal) {  // 1.17 < 4.50
        // result.lagnam_name = thatDayLagunamInfo.name;
        // result.lagnam_val = thatDayLagunamInfo.value;
        // result.lagnam_id = thatDayLagunamInfo.id;
        // result.lagunam_palan = thatDayLagunamInfo.palan;
        // result.lagunam_eruppu = subtract_times(thatDayLagunamVal, birthNaligai);
        // result.lagunam_sell = subtract_times('' + result.lagnam_val, result.lagunam_eruppu);
        // const amsam_details = get_amsalagunam(result.lagnam_id, result.lagnam_val, result.lagunam_sell);
        // total = '';
        // result.lagunam_eruppu = result.lagunam_eruppu;
        chartLagunam.rasi_position = thatDayLagunamInfo.id;
        chartLagunam.rasi_position_name = thatDayLagunamInfo.name;
        const amsam_details = get_amsalagunam(chartLagunam.rasi_position, thatDayLagunamVal, parseFloat(''));
        chartLagunam.amsam_position = amsam_details.amsam_position;
        chartLagunam.amsam_position_name = amsam_details.amsam_position_name;
        const rasi_amsam_Info = getPathaSaramForLagunam(chartLagunam.rasi_position, chartLagunam.amsam_position)
        chartLagunam.natchathiram_id = rasi_amsam_Info.natchathiram_id;
        chartLagunam.natchathiram_patham = rasi_amsam_Info.patham;
        const startInfo: any = getStar(chartLagunam.natchathiram_id);
        chartLagunam.natchathiram_name = startInfo.name;

    } else if (birthNaligai > thatDayLagunamVal) {  // 20.00 > 4.05
        let lagnamid_temp = 0;
        let lagnamName = '';
        let lagnamVal = 0;
        let lagnamPalan = '';
        let lagnam_eruppu = '';

        for (let i = thatDayLagunamVal; i <= birthNaligai; thatDayLagunamId++) {
            if (thatDayLagunamId >= 13) {
                thatDayLagunamId = (thatDayLagunamId - 12);
            }
            const thatDayLagunamInfo = lagunamInfo.filter((x: any) => x.id === thatDayLagunamId)[0];
            total = add_times(thatDayLagunamVal, thatDayLagunamInfo.value);
            lagnamName = thatDayLagunamInfo.name;
            lagnamid_temp = thatDayLagunamInfo.id;
            lagnamVal = thatDayLagunamInfo.value;
            lagnamPalan = thatDayLagunamInfo.palan;
            lagnam_eruppu = total;
            i = lagnam_eruppu;
        }
        const lagunam_eruppu = subtract_times(birthNaligai, total);
        const lagunam_sell = subtract_times(lagnamVal, lagunam_eruppu);
        const amsam_details = get_amsalagunam(lagnamid_temp, lagnamVal, parseFloat(lagunam_sell));
        chartLagunam.rasi_position = lagnamid_temp;
        chartLagunam.rasi_position_name = lagnamName;
        const lagunamPalan_Info: any = getLagunamPalan(chartLagunam.rasi_position);
        chartLagunam.lagunam_palan = lagunamPalan_Info.desc;
        chartLagunam.amsam_position = amsam_details.amsam_position;
        chartLagunam.amsam_position_name = amsam_details.amsam_position_name;
        const rasi_amsam_Info = getPathaSaramForLagunam(chartLagunam.rasi_position, chartLagunam.amsam_position)
        chartLagunam.natchathiram_id = rasi_amsam_Info.natchathiram_id;
        chartLagunam.natchathiram_patham = rasi_amsam_Info.patham;
        const startInfo: any = getStar(chartLagunam.natchathiram_id);
        chartLagunam.natchathiram_name = startInfo.name;
    }
    result.rasiAmsamChartInfo.push(chartLagunam);
}
export function get_amsalagunam(lagnamid: number, lagnam_val: number, lagunam_sell: number) {
    // console.log(lagnamid);
    // console.log('--------------');
    // console.log(lagnam_val);
    // console.log('--------------');
    // console.log(lagunam_sell);
    // console.log('--------------');
    // get laguna sell naligai start
    const b = naligai2vinadi(lagunam_sell);
    // get laguna sell naligai End

    let oneNinth = 0;
    let muthalAdhi = 1;
    if (lagnamid === 1) {         // Messam
        oneNinth = 30.3333;
        muthalAdhi = 1;    /* Messa,Simma,Dhanusu --> Messam Muthal Adhi */
        // athi = 'Mesam';
    }
    if (lagnamid === 2) {         // Risha
        oneNinth = 34.1111;
        muthalAdhi = 10;   /* Rishaba,Kanni,Maharam --> Maharam Muthal Adhi */
        // athi = 'Magaram';
    }
    if (lagnamid === 3) {         // Mithu
        oneNinth = 36.4444;
        muthalAdhi = 7;    /* Mithuna,Thulam,Kumbam --> Thulam Muthal Adhi */
        // athi = 'Thulam';
    }
    if (lagnamid === 4) {         // Kadagam
        oneNinth = 35.5555;
        muthalAdhi = 4;
        // athi = 'Kadagam';
    }
    if (lagnamid === 5) {         // Simmam
        oneNinth = 33.6666;
        muthalAdhi = 1;    /* Messa,Simma,Dhanusu --> Messam Muthal Adhi */
        // athi = 'Mesam';
    }
    if (lagnamid === 6) {         // Kanni
        oneNinth = 33.2222;
        muthalAdhi = 10;   /* Rishaba,Kanni,Maharam --> Maharam Muthal Adhi */
        // athi = 'Magaram';
    }
    if (lagnamid === 7) {         // Thulam
        oneNinth = 34.6666;
        muthalAdhi = 7;    /* Mithuna,Thulam,Kumbam --> Thulam Muthal Adhi */
        // athi = 'Thulam';
    }
    if (lagnamid === 8) {         // Viruchi
        oneNinth = 36.3333;
        muthalAdhi = 4;
        // athi = 'Kadagam';
    }
    if (lagnamid === 9) {         // Dhanusu
        oneNinth = 35.5555;
        muthalAdhi = 1;    /* Messa,Simma,Dhanusu --> Messam Muthal Adhi */
        // athi = 'Mesam';
    }
    if (lagnamid === 10) {         // Magaram
        oneNinth = 32;
        muthalAdhi = 10;   /* Rishaba,Kanni,Maharam --> Maharam Muthal Adhi */
        // athi = 'Magaram';
    }
    if (lagnamid === 11) {         // Kumbam
        oneNinth = 28.7777;
        muthalAdhi = 7;    /* Mithuna,Thulam,Kumbam --> Thulam Muthal Adhi */
        // athi = 'Thulam';
    }
    if (lagnamid === 12) {         // Menam
        oneNinth = 28.2222;
        muthalAdhi = 4;
        // athi = 'Kadagam';
    }

    const c = (b / oneNinth);
    const d = c.toString().split('.');

    // console.log(b);
    // console.log(c);
    // console.log(d);

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
    const amsam = 9;
    const lagunamInfo: any = getLagunam();
    const thatDayLagunamInfo = lagunamInfo.filter((x: any) => x.id === amsam)[0];
    return { amsam_position: 9, amsam_position_name: thatDayLagunamInfo.name };
}
export async function getRasiAmsam(before_date_details: any, that_date_details: any, birthNaligai: string) {
    const grahams = [
        { name: 'suriyan', value: 1 },
        { name: 'Sevvai', value: 3 },
        { name: 'Puthan', value: 7 },
        { name: 'Guru', value: 5 },
        { name: 'Sukran', value: 9 },
        { name: 'Sani', value: 6 },
        { name: 'Raagu', value: 4 },
        { name: 'Kethu', value: 8 },
    ];
    const rasi_amsam: any = [];
    for await (const graham of grahams) {
        const grahamDetails = { graham_id: graham.value, eng_date: that_date_details.eng_date };
        const res = await get_rasi_amsam_box(before_date_details, that_date_details, birthNaligai, grahamDetails);
        rasi_amsam.push(res[0]);
    }
    return rasi_amsam;
}
export async function get_rasi_amsam_box(before_date_details: any, that_date_details: any, naligai: string, grahamDetails: any) {
    const where = { graham_id: grahamDetails.graham_id, eng_date: that_date_details[0].eng_date };
    let response = await rasi_amsam_box_detail(naligai, where);
    if ((response[0]['natchathiram_val'] != '0.00') && (response[0]['natchathiram_val'] != '00.00')) {
        const naligai_vinadi = naligai2vinadi(naligai);
        const natchathiram_val_vinadi = naligai2vinadi(response[0]['natchathiram_val']);
        if (naligai_vinadi < natchathiram_val_vinadi) {
            // Here You need to use previous date info, because this changes will hapen after birth naligai
            const where = { graham_id: grahamDetails.graham_id, eng_date: before_date_details[0].eng_date };
            response = await rasi_amsam_box_detail(naligai, where);
        }
    }
    // Get Rasi & Amsam id info's
    const rasi_amsam_array: any = getRasiAmsamPositionId(response[0].natchathiram_id, response[0].natchathiram_patham);
    response[0].rasi_position = rasi_amsam_array.rasi_id;
    response[0].rasi_position_name = getRasi(rasi_amsam_array.rasi_id);
    response[0].amsam_position = rasi_amsam_array.amsam_id;
    response[0].amsam_position_name = getRasi(rasi_amsam_array.amsam_id);
    return response;
}
export function splitInfoByTypes(data: Dayinfo, userInput: any) {
    const basicInfo: Dayinfo = {} as any;
    const deepInfo: Dayinfo = {} as any;
    // Create Basic Details.
    basicInfo.inputDate = formatDate_DMY_WITH_HYPHENS(new Date(userInput.date));
    basicInfo.birth_date = formatDate_DMY_WITH_HYPHENS(new Date(data.eng_date));
    basicInfo.birth_time = userInput.time;
    basicInfo.time_type = userInput.time_type;
    basicInfo.gender = userInput.gender;
    basicInfo.eng_date = data.eng_date;
    basicInfo.sunrise = data.sunrise;
    basicInfo.year_id = data.year_id;
    basicInfo.year_name = getYear(data.year_id).EName;
    basicInfo.month_id = data.month_id;
    basicInfo.month_name = getMonth(data.month_id).EName;
    basicInfo.tamil_date = data.tamil_date;
    basicInfo.day = data.day;
    basicInfo.ayanam = data.ayanam;
    basicInfo.patcham = data.patcham;
    // Create Deep Info
    deepInfo.agas_val = data.agas_val;
    deepInfo.tamil_date = data.tamil_date;
    deepInfo.day = data.day;
    deepInfo.natchathiram1_id = data.natchathiram1_id;
    deepInfo.natchathiram1_val = data.namayogam1_val;
    deepInfo.natchathiram2_id = data.natchathiram2_id;
    deepInfo.natchathiram2_val = data.natchathiram2_val;
    deepInfo.lagunam_id = data.lagunam_id;
    deepInfo.lagunam_val = data.lagunam_val;
    // deepInfo.ayanam = data.ayanam;
    // deepInfo.patcham = data.patcham;
    deepInfo.thithi1 = data.thithi1;
    deepInfo.thithi1_val = data.thithi1_val;
    deepInfo.thithi2 = data.thithi2;
    deepInfo.thithi2_val = data.thithi2_val;
    deepInfo.namayogam1 = data.namayogam1;
    deepInfo.namayogam1_val = data.namayogam1_val;
    deepInfo.namayogam2 = data.namayogam2;
    deepInfo.namayogam2_val = data.namayogam2_val;
    deepInfo.karnam = data.karnam;
    deepInfo.karnam_val = data.karnam_val;
    deepInfo.thiyachiyam_val = data.thiyachiyam_val;
    deepInfo.eng_date = data.eng_date;
    // console.log(deepInfo);
    return { basicInfo, deepInfo }
}
export function getPathaSaramForLagunam(rasiId: number, amsamId: number) {
    const rasi_amsam_array: any = getRasiAmsamPositionId(0, 0, true);
    return rasi_amsam_array.filter((x: any) => x.rasi_id === rasiId && x.amsam_id === amsamId)[0];
    // console.log(rasi_amsam_Info);
}