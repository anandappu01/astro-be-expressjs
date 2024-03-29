export function getStar(starId?: number) {
    const res = [
        { id: 1, name: 'அசுவினி', EName: 'Asubathi' },
        { id: 2, name: 'பரணி', EName: 'Baranigai' },
        { id: 3, name: 'கிருத்திகை', EName: 'Karthigai' },
        { id: 4, name: 'ரோகிணி', EName: 'Rogini' },
        { id: 5, name: 'மிருகசீரிடம்', EName: 'Mirugaerusam' },
        { id: 6, name: 'திருவாதிரை', EName: 'Thiruvathirai' },
        { id: 7, name: 'புனர்பூசம்', EName: 'Punarpoosam' },
        { id: 8, name: 'பூசம்', EName: 'Poosam' },
        { id: 9, name: 'ஆயில்யம்', EName: 'Auilyam' },
        { id: 10, name: 'மகம்', EName: 'Magam' },
        { id: 11, name: 'பூரம்', EName: 'Pooram' },
        { id: 12, name: 'உத்திரம்', EName: 'Uthiram' },
        { id: 13, name: 'அஸ்தம்', EName: 'Astham' },
        { id: 14, name: 'சித்திரை', EName: 'Chithirai' },
        { id: 15, name: 'சுவாதி', EName: 'Suvathi' },
        { id: 16, name: 'விசாகம்', EName: 'Visagam' },
        { id: 17, name: 'அனுசம்', EName: 'Anusam' },
        { id: 18, name: 'கேட்டை', EName: 'Ketai' },
        { id: 19, name: 'மூலம்', EName: 'Moolam' },
        { id: 20, name: 'பூராடம்', EName: 'Pooradam' },
        { id: 21, name: 'உத்திராடம்', EName: 'Uthiradam' },
        { id: 22, name: 'திருவோணம்', EName: 'Thiruvonam' },
        { id: 23, name: 'அவிட்டம்', EName: 'Avittam' },
        { id: 24, name: 'சதயம்', EName: 'Sathayam' },
        { id: 25, name: 'பூரட்டாதி', EName: 'Poorattathi' },
        { id: 26, name: 'உத்திரட்டாதி', EName: 'Uthirattathi' },
        { id: 27, name: 'ரேவதி', EName: 'Revathi' },
    ]
    return starId ? res.filter(x => x.id === starId)[0] : res;
}
