export function getMonth(monthId: number) {
    const res = [
        { id: 1, name: 'சித்திரை', EName: 'Chittirai' },
        { id: 2, name: 'வைகாசி', EName: 'Vaikāsi' },
        { id: 3, name: 'ஆனி', EName: 'Ani' },
        { id: 4, name: 'ஆடி', EName: 'Adi' },
        { id: 5, name: 'ஆவணி', EName: 'Avaṇi' },
        { id: 6, name: 'புரட்டாசி', EName: 'Purattasi' },
        { id: 7, name: 'ஐப்பசி', EName: 'Aippasi' },
        { id: 8, name: 'கார்த்திகை', EName: 'Kartikai' },
        { id: 9, name: 'மார்கழி', EName: 'Margaḻi' },
        { id: 10, name: 'தை', EName: 'Tai' },
        { id: 11, name: 'மாசி', EName: 'Masi' },
        { id: 12, name: 'பங்குனி', EName: 'Panguni' },
    ]
    return res.filter(x => x.id === monthId)[0];
}
