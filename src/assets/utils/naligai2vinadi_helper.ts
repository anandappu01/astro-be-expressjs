export function naligai2vinadi(naligai: string | number) {
   // console.log('********');
   //    console.log(naligai);
   //    console.log('********');
   if (naligai) {
      naligai = naligai.toString();
      let val1: any = 0;
      let val2: any = 0;
      if (naligai.includes(".")) {
         const val = naligai.split(".");
         val1 = val[0];
         val2 = val[1];
      } else if (naligai.includes(":")) {
         const val = naligai.split(":");
         val1 = val[0];
         val2 = val[1];
      } else {
         val1 = naligai;
         val2 = 0;
      }
      const sec1 = (val1 * 3600);
      const sec2 = (val2 * 60);
      // const seconds = (sec1 + sec2);
      return (sec1 + sec2);
   } else {
      // console.warn('Invalid input - naligai2vinadi');
      return 0;
   }
}