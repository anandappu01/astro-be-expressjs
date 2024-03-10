export function getRasi(val: string | number = 0) {
   if (val) {
      val = Number(val);
      switch (val) {
         case 1:
            return "மேஷம்";
            break;
         case 2:
            return "ரிஷபம்";
            break;
         case 3:
            return "மிதுனம்";
            break;
         case 4:
            return "கடகம்";
            break;
         case 5:
            return "சிம்மம்";
            break;
         case 6:
            return "கன்னி";
            break;
         case 7:
            return "துலாம்";
            break;
         case 8:
            return "விருச்சிகம்";
            break;
         case 9:
            return "தனுசு";
            break;
         case 10:
            return "மகரம்";
            break;
         case 11:
            return "கும்பம்";
            break;
         case 12:
            return "மீனம்";
            break;
         default:
            return "இல்லை";
      }
   } else {
      return 0;
   }
}