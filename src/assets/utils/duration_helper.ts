export function getDuration(naligai: number = 0) {
    // Morning, afternoon, etc are 'times of (the) day'
    if (naligai) {
        if (naligai <= 10.00) {
            return 'காலை';  // Kalai
        } else if (naligai <= 25.00) {
            return 'பகல் ';    // Pagal
        } else if (naligai <= 32.30) {
            return 'மாலை';  // Maalai
        } else if (naligai <= 55.00) {
            return 'இரவு';   // Eravu
        } else {
            return 'மறுநாள்  வைகறை';   // Marunal vaikarai
        }
    } else {
        return 0;
    }
} 