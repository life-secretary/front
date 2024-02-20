import { PixelRatio } from "react-native";

const getFontSize = (size: number): number => {
    return size / PixelRatio.getFontScale();
}

export {
    getFontSize
}