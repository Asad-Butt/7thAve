// import React, { useEffect, useState } from "react";
// import { Audio } from "expo-av";

// export default function useSounds() {
//   const [sound, setSound] = useState(null);

//   async function playSound() {
//     console.log("Loading Sound");
//     const { sound } = await Audio.Sound.createAsync(
//       require("./assets/Hello.mp3")
//     );
//     setSound(sound);

//     console.log("Playing Sound");
//     await sound.playAsync();
//   }

//   useEffect(() => {
//     return sound
//       ? () => {
//           console.log("Unloading Sound");
//           sound.unloadAsync();
//         }
//       : undefined;
//   }, [sound]);

//   return { playSound };
// }
