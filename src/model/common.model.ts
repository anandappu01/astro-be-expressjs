import { connectionHelper, dayInfoConnectionHelper } from "../assets/utils/connection_helper";

export function getAllNatchathiramModel() {
    const query = `SELECT natchathiram_id, natchathiram_name FROM natchathiram`;
    return connectionHelper(query);
}
export function getBasicInfoByDateModel(date: string) {
    // const basicInfoField = 'PAN.year_id, PAN.month_id, PAN.tamil_date, PAN.day, PAN.sali_year, PAN.kali_year, PAN.kollam_year, PAN.hijiri_year,';
    const basicInfoField = 'PAN.agas_val, PAN.tamil_date, PAN.day, PAN.natchathiram1_id, PAN.natchathiram1_val, PAN.natchathiram2_id, PAN.natchathiram2_val, PAN.ayanam, PAN.patcham, PAN.thithi1, PAN.thithi1_val, PAN.thithi2, PAN.thithi2_val, PAN.namayogam1, PAN.namayogam1_val, PAN.namayogam2, PAN.namayogam2_val, PAN.karnam, PAN.karnam_val, PAN.thiyachiyam_val,';
    const query = `SELECT ${basicInfoField} SR.sun_rise_value AS sunrise, DATE_FORMAT(date, "%Y-%m-%d") AS eng_date FROM panjangam AS PAN LEFT JOIN sun_rise AS SR ON(PAN.month_id = SR.sun_rise_month) WHERE PAN.date = '${date}' AND PAN.tamil_date = SR.sun_rise_date`;
    // console.log(query);
    return dayInfoConnectionHelper(query);
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
// export function getAllLagunamModel() {
//     const query = `SELECT * FROM lagunam`;
//     // console.log(query);
//     return connectionHelper(query);
// }
export function rasi_amsam_box_detail(naligai: string, where: any) {
    const query = `SELECT TH.thisai_name AS graham_name, NAT.natchathiram_name, PAT.natchathiram_id, PAT.natchathiram_patham FROM pathasaram AS PAT JOIN thisai AS TH ON(TH.thisai_id = PAT.graham_id) JOIN natchathiram AS NAT ON(NAT.natchathiram_id = PAT.natchathiram_id) WHERE graham_id = '${where.graham_id}' AND eng_date = '${where.eng_date}'`;
    // console.log(query);
    return connectionHelper(query);
}
