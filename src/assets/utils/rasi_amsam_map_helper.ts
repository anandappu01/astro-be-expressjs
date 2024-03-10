export function getRasiAmsamPositionId(natchathiram_id: number, patham_id: number, getAll?: boolean) {
    const res = [
        { natchathiram_id: 1, patham: 1, rasi_id: 1, amsam_id: 1 },
        { natchathiram_id: 1, patham: 2, rasi_id: 1, amsam_id: 2 },
        { natchathiram_id: 1, patham: 3, rasi_id: 1, amsam_id: 3 },
        { natchathiram_id: 1, patham: 4, rasi_id: 1, amsam_id: 4 },
        { natchathiram_id: 2, patham: 1, rasi_id: 1, amsam_id: 5 },
        { natchathiram_id: 2, patham: 2, rasi_id: 1, amsam_id: 6 },
        { natchathiram_id: 2, patham: 3, rasi_id: 1, amsam_id: 7 },
        { natchathiram_id: 2, patham: 4, rasi_id: 1, amsam_id: 8 },
        { natchathiram_id: 3, patham: 1, rasi_id: 1, amsam_id: 9 },
        { natchathiram_id: 3, patham: 2, rasi_id: 2, amsam_id: 10 },
        { natchathiram_id: 3, patham: 3, rasi_id: 2, amsam_id: 11 },
        { natchathiram_id: 3, patham: 4, rasi_id: 2, amsam_id: 12 },
        { natchathiram_id: 4, patham: 1, rasi_id: 2, amsam_id: 1 },
        { natchathiram_id: 4, patham: 2, rasi_id: 2, amsam_id: 2 },
        { natchathiram_id: 4, patham: 3, rasi_id: 2, amsam_id: 3 },
        { natchathiram_id: 4, patham: 4, rasi_id: 2, amsam_id: 4 },
        { natchathiram_id: 5, patham: 1, rasi_id: 2, amsam_id: 5 },
        { natchathiram_id: 5, patham: 2, rasi_id: 2, amsam_id: 6 },
        { natchathiram_id: 5, patham: 3, rasi_id: 3, amsam_id: 7 },
        { natchathiram_id: 5, patham: 4, rasi_id: 3, amsam_id: 8 },
        { natchathiram_id: 6, patham: 1, rasi_id: 3, amsam_id: 9 },
        { natchathiram_id: 6, patham: 2, rasi_id: 3, amsam_id: 10 },
        { natchathiram_id: 6, patham: 3, rasi_id: 3, amsam_id: 11 },
        { natchathiram_id: 6, patham: 4, rasi_id: 3, amsam_id: 12 },
        { natchathiram_id: 7, patham: 1, rasi_id: 3, amsam_id: 1 },
        { natchathiram_id: 7, patham: 2, rasi_id: 3, amsam_id: 2 },
        { natchathiram_id: 7, patham: 3, rasi_id: 3, amsam_id: 3 },
        { natchathiram_id: 7, patham: 4, rasi_id: 4, amsam_id: 4 },
        { natchathiram_id: 8, patham: 1, rasi_id: 4, amsam_id: 5 },
        { natchathiram_id: 8, patham: 2, rasi_id: 4, amsam_id: 6 },
        { natchathiram_id: 8, patham: 3, rasi_id: 4, amsam_id: 7 },
        { natchathiram_id: 8, patham: 4, rasi_id: 4, amsam_id: 8 },
        { natchathiram_id: 9, patham: 1, rasi_id: 4, amsam_id: 9 },
        { natchathiram_id: 9, patham: 2, rasi_id: 4, amsam_id: 10 },
        { natchathiram_id: 9, patham: 3, rasi_id: 4, amsam_id: 11 },
        { natchathiram_id: 9, patham: 4, rasi_id: 4, amsam_id: 12 },
        { natchathiram_id: 10, patham: 1, rasi_id: 5, amsam_id: 1 },
        { natchathiram_id: 10, patham: 2, rasi_id: 5, amsam_id: 2 },
        { natchathiram_id: 10, patham: 3, rasi_id: 5, amsam_id: 3 },
        { natchathiram_id: 10, patham: 4, rasi_id: 5, amsam_id: 4 },
        { natchathiram_id: 11, patham: 1, rasi_id: 5, amsam_id: 5 },
        { natchathiram_id: 11, patham: 2, rasi_id: 5, amsam_id: 6 },
        { natchathiram_id: 11, patham: 3, rasi_id: 5, amsam_id: 7 },
        { natchathiram_id: 11, patham: 4, rasi_id: 5, amsam_id: 8 },
        { natchathiram_id: 12, patham: 1, rasi_id: 5, amsam_id: 9 },
        { natchathiram_id: 12, patham: 2, rasi_id: 6, amsam_id: 10 },
        { natchathiram_id: 12, patham: 3, rasi_id: 6, amsam_id: 11 },
        { natchathiram_id: 12, patham: 4, rasi_id: 6, amsam_id: 12 },
        { natchathiram_id: 13, patham: 1, rasi_id: 6, amsam_id: 1 },
        { natchathiram_id: 13, patham: 2, rasi_id: 6, amsam_id: 2 },
        { natchathiram_id: 13, patham: 3, rasi_id: 6, amsam_id: 3 },
        { natchathiram_id: 13, patham: 4, rasi_id: 6, amsam_id: 4 },
        { natchathiram_id: 14, patham: 1, rasi_id: 6, amsam_id: 5 },
        { natchathiram_id: 14, patham: 2, rasi_id: 6, amsam_id: 6 },
        { natchathiram_id: 14, patham: 3, rasi_id: 7, amsam_id: 7 },
        { natchathiram_id: 14, patham: 4, rasi_id: 7, amsam_id: 8 },
        { natchathiram_id: 15, patham: 1, rasi_id: 7, amsam_id: 9 },
        { natchathiram_id: 15, patham: 2, rasi_id: 7, amsam_id: 10 },
        { natchathiram_id: 15, patham: 3, rasi_id: 7, amsam_id: 11 },
        { natchathiram_id: 15, patham: 4, rasi_id: 7, amsam_id: 12 },
        { natchathiram_id: 16, patham: 1, rasi_id: 7, amsam_id: 1 },
        { natchathiram_id: 16, patham: 2, rasi_id: 7, amsam_id: 2 },
        { natchathiram_id: 16, patham: 3, rasi_id: 7, amsam_id: 3 },
        { natchathiram_id: 16, patham: 4, rasi_id: 8, amsam_id: 4 },
        { natchathiram_id: 17, patham: 1, rasi_id: 8, amsam_id: 5 },
        { natchathiram_id: 17, patham: 2, rasi_id: 8, amsam_id: 6 },
        { natchathiram_id: 17, patham: 3, rasi_id: 8, amsam_id: 7 },
        { natchathiram_id: 17, patham: 4, rasi_id: 8, amsam_id: 8 },
        { natchathiram_id: 18, patham: 1, rasi_id: 8, amsam_id: 9 },
        { natchathiram_id: 18, patham: 2, rasi_id: 8, amsam_id: 10 },
        { natchathiram_id: 18, patham: 3, rasi_id: 8, amsam_id: 11 },
        { natchathiram_id: 18, patham: 4, rasi_id: 8, amsam_id: 12 },
        { natchathiram_id: 19, patham: 1, rasi_id: 9, amsam_id: 1 },
        { natchathiram_id: 19, patham: 2, rasi_id: 9, amsam_id: 2 },
        { natchathiram_id: 19, patham: 3, rasi_id: 9, amsam_id: 3 },
        { natchathiram_id: 19, patham: 4, rasi_id: 9, amsam_id: 4 },
        { natchathiram_id: 20, patham: 1, rasi_id: 9, amsam_id: 5 },
        { natchathiram_id: 20, patham: 2, rasi_id: 9, amsam_id: 6 },
        { natchathiram_id: 20, patham: 3, rasi_id: 9, amsam_id: 7 },
        { natchathiram_id: 20, patham: 4, rasi_id: 9, amsam_id: 8 },
        { natchathiram_id: 21, patham: 1, rasi_id: 9, amsam_id: 9 },
        { natchathiram_id: 21, patham: 2, rasi_id: 10, amsam_id: 10 },
        { natchathiram_id: 21, patham: 3, rasi_id: 10, amsam_id: 11 },
        { natchathiram_id: 21, patham: 4, rasi_id: 10, amsam_id: 12 },
        { natchathiram_id: 22, patham: 1, rasi_id: 10, amsam_id: 1 },
        { natchathiram_id: 22, patham: 2, rasi_id: 10, amsam_id: 2 },
        { natchathiram_id: 22, patham: 3, rasi_id: 10, amsam_id: 3 },
        { natchathiram_id: 22, patham: 4, rasi_id: 10, amsam_id: 4 },
        { natchathiram_id: 23, patham: 1, rasi_id: 10, amsam_id: 5 },
        { natchathiram_id: 23, patham: 2, rasi_id: 10, amsam_id: 6 },
        { natchathiram_id: 23, patham: 3, rasi_id: 11, amsam_id: 7 },
        { natchathiram_id: 23, patham: 4, rasi_id: 11, amsam_id: 8 },
        { natchathiram_id: 24, patham: 1, rasi_id: 11, amsam_id: 9 },
        { natchathiram_id: 24, patham: 2, rasi_id: 11, amsam_id: 10 },
        { natchathiram_id: 24, patham: 3, rasi_id: 11, amsam_id: 11 },
        { natchathiram_id: 24, patham: 4, rasi_id: 11, amsam_id: 12 },
        { natchathiram_id: 25, patham: 1, rasi_id: 11, amsam_id: 1 },
        { natchathiram_id: 25, patham: 2, rasi_id: 11, amsam_id: 2 },
        { natchathiram_id: 25, patham: 3, rasi_id: 11, amsam_id: 3 },
        { natchathiram_id: 25, patham: 4, rasi_id: 12, amsam_id: 4 },
        { natchathiram_id: 26, patham: 1, rasi_id: 12, amsam_id: 5 },
        { natchathiram_id: 26, patham: 2, rasi_id: 12, amsam_id: 6 },
        { natchathiram_id: 26, patham: 3, rasi_id: 12, amsam_id: 7 },
        { natchathiram_id: 26, patham: 4, rasi_id: 12, amsam_id: 8 },
        { natchathiram_id: 27, patham: 1, rasi_id: 12, amsam_id: 9 },
        { natchathiram_id: 27, patham: 2, rasi_id: 12, amsam_id: 10 },
        { natchathiram_id: 27, patham: 3, rasi_id: 12, amsam_id: 11 },
        { natchathiram_id: 27, patham: 4, rasi_id: 12, amsam_id: 12 }
    ]
    // return res.filter(x => x.natchathiram_id === natchathiram_id && x.patham === patham_id)[0];
    return getAll ? res : res.filter(x => x.natchathiram_id === natchathiram_id && x.patham === patham_id)[0];
}
