export function friendenemy(val: number = 0) {
   if (val) {
      if (val == 1) {
         return 'நட்பு';
      } else if (val == 2) {
         return 'பகை';
      } else if (val == 3) {
         return 'ஆட்ச்சி';
      } else if (val == 4) {
         return 'உச்சம்';
      } else {
         return 'நீசம்';
      }
   } else {
      return 0;
   }
}