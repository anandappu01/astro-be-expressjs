import { connectionHelper, dayInfoConnectionHelper } from "../assets/utils/connection_helper";

export function getAllNatchathiramModel() {
    const query = `SELECT natchathiram_id, natchathiram_name FROM natchathiram`;
    return connectionHelper(query);
}
export function getRecordByDateModel(date: string) {
    const query = `SELECT *, SR.sun_rise_value AS sunrise, DATE_FORMAT(date, "%Y-%m-%d") AS eng_date FROM panjangam AS PAN LEFT JOIN sun_rise AS SR ON(PAN.month_id = SR.sun_rise_month) WHERE PAN.date = '${date}' AND PAN.tamil_date = SR.sun_rise_date`;
    // console.log(query);
    return dayInfoConnectionHelper(query);
}
export function getTamilMonthModel(tamilmonth_id: number) {
    const query = `SELECT * FROM tamil_month WHERE tamilmonth_id = '${tamilmonth_id}'`;
    // console.log(query);
    return dayInfoConnectionHelper(query);
}
