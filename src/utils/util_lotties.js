import { Platform } from "react-native";

export function playLotties(mainComp = null, lottieArr = [])
{
    if (!mainComp || (lottieArr.length === 0)) return;

    setTimeout(() => {
        if (Platform.OS === 'ios')
        {
            lottieArr.forEach((lottieName) => requestAnimationFrame(mainComp[lottieName].play.bind(mainComp[lottieName])));
        }
        else lottieArr.forEach((lottieName) => mainComp[lottieName]?.play());
    }, 500);
}
