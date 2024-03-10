export interface Dayinfo {
    id: number,
    sunrise: string,
    year_id: number,
    year_name: string,
    month_id: number,
    month_name?: string,
    lagunam_id: number,
    lagunam_val: string | number,
    agas_val: number,
    date: boolean,
    tamil_date: number,
    day: string,
    natchathiram1_id: number,
    natchathiram1_val: string | number,
    natchathiram2_id: number,
    natchathiram2_val: string | number,
    sali_year: number,
    kali_year: number,
    kollam_year: number,
    hijiri_year: number,
    ayanam: number,
    patcham: number,
    thithi1: number,
    thithi1_val: string | number,
    thithi2: number,
    thithi2_val: string | number,
    namayogam1: number,
    namayogam1_val: string | number,
    namayogam2: number,
    namayogam2_val: string | number,
    karnam: number,
    karnam_val: string | number,
    thiyachiyam_val: string | number,
    sun_rise_id: number,
    sun_rise_month: number,
    sun_rise_date: number,
    sun_rise_value: string,
    inputDate: string,
    eng_date: string,
    birth_date: string,
    birth_time: string,
    time_type: string,
    gender: string,
    basehrs: string,
    birthNaligai: string,
    Kalam_no: string,
}
export interface mysqlRes {
    status: string,
    response: Dayinfo | any
}

export interface ChartRes {
    pre_date_info: any,
    that_date_details: any,
    next_date_details: string,
    rasi_box: any,
    amsam_box: string,
    Patha_saram: string,
    amruthathi_yogam: string,
    horai: string,
}
export interface ChartInfo {
    // User Input
    inputDate?: string,
    birth_date?: string,
    birth_time?: string,
    time_type?: string,
    gender?: string,
    // Basic Info
    sunrise?: string,
    eng_date?: string,
    tamilYear_id?: number,
    tamilYear_name?: string,
    tamil_date?: any,
    tamil_month_id?: number,
    tamil_month?: string,
    basehrs?: string,
    birthNaligai?: string,
    Kalam_no?: number,
    Kalam_name?: string,
    // Yesterday, Today, Tomorrow Panjangam info
    natchathiramInfo?: any,
    thatDayBasicInfo?: any,
    before_date_details?: any,
    that_date_details?: any,
    next_date_details?: any,
    rasiAmsamChartInfo?: [] | any,
    // Lagunam properties
    chartInfo?: any,
    rasiChart?: any,
    amsamChart?: any,
    // Lagunam properties
    lagnam_id?: number,
    lagnam_name?: string,
    lagnam_val?: string | number,
    lagnam_total?: string | number,
    lagunam_eruppu?: string | number,
    lagunam_sell?: string | number,
    lagunam_palan?: string,
    amsalagunam_id?: number,
    // Natcharhiram properties
    natchathiram_id?: number,
    natchathiram_name?: number,
    natchathiram_patham?: number,
    natchathiram_patham_sell?: string | number,
    natchathiram_patham_eruppu?: string | number,
    natchathiram_palan?: number,
    athiantham?: string | number,
    // Thisai properties
    thisai_id?: number,
    thisai_name?: number,
    thisai_value?: number,
    // Other properties
    mirugam?: number,
    patchi?: number,
    maram?: number,
    ganam?: number,
    rajji?: number,
    nadi?: number
}

export interface lagunam {
    id: number,
    name: string,
    value: number | any,
    palan: string
}