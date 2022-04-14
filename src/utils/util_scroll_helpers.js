import { Dimensions } from "react-native";

// region Check if scroll is close to Bottom
export function isCloseToBottom({ layoutMeasurement, contentOffset, contentSize })
{
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
}
// endregion

// region Check if scroll is close to Top
export function isCloseToTop({ layoutMeasurement, contentOffset })
{
    const paddingToTop = Dimensions.get('window').height + 20;
    return contentOffset.y <= paddingToTop;
}
// endregion
