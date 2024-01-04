import { Request, Response } from 'express';
import { convert_seconds, getRecordByDate } from '../assets/utils/common_helper';
import { Dayinfo, mysqlRes } from '../assets/interface/common.interface';

export async function getAstroChart(req: Request, res: Response) {
    console.log("getAstroChart attempt ...");
    const { date, time, time_type, gender } = req.body;
    console.log(req.body);
    const user: mysqlRes = await getRecordByDate(date);
    // console.log(user.response);
    if (user.status === 'success') {
        const res: Dayinfo = user.response[0];
        console.log(res.sunrise);
        // console.log(res);
        if (time_type == 'AM') {
            const sunrise = '' + res.sunrise;
            const sunrise_seconds = convert_seconds(sunrise);
            const time_birth_seconds = convert_seconds(time);
            const middle_seconds = convert_seconds('11.59');
            console.log(sunrise_seconds);
            console.log(time_birth_seconds);
            console.log(middle_seconds);
        } else if (time_type == 'PM') {

        }
    }
}