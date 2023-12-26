export function naligai2vinadi(nazhigai = '') {
   if (nazhigai) {
      let val1: any = 0;
      let val2: any = 0;
      if (nazhigai.includes(".")) {
         const val = nazhigai.split(".");
         val1 = val[0];
         val2 = val[1];
      } else if (nazhigai.includes(":")) {
         const val = nazhigai.split(":");
         val1 = val[0];
         val2 = val[1];
      } else {
         console.log('Invalid input - naligai2vinadi');
         console.warn('Invalid input - naligai2vinadi');
         return 0;
      }
      const sec1 = (val1 * 3600);
      const sec2 = (val2 * 60);
      // const seconds = (sec1 + sec2);
      return (sec1 + sec2);
   } else {
      return 0;
   }
}