import {
    Platform,
    Dimensions
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

// region Check if iPhone has Home Indicator
export function phoneHasHomeIndicator()
{
    return(isIphoneX() || isIphone12());
}
// endregion

// region Check if phone layout is iPhone X
export function isIphoneX()
{
    let deviceID = DeviceInfo.getDeviceId();

    // Check if this is not an iPhone
    if (!deviceID.includes('iPhone')) return false;

    // Check device based on device ID
    // iPhone10,6 : iPhone X GSM
    // iPhone11,2 : iPhone XS
    // iPhone11,4 : iPhone XS Max
    // iPhone11,6 : iPhone XS Max Global
    // iPhone11,8 : iPhone XR
    // iPhone12,1 : iPhone 11
    // iPhone12,3 : iPhone 11 Pro
    // iPhone12,5 : iPhone 11 Pro Max
    // iPhone12,8 : iPhone SE 2nd Gen

    let deviceNumber = Number(deviceID.replace('iPhone', '').replace(',', '.'));

    return(deviceNumber >= 10.6);
}

export function isIphone12()
{
    // Note: iPhone 12 Mini is not included because its dimension is already supported

    let deviceID = DeviceInfo.getDeviceId();

    // Check if this is not an iPhone
    if (!deviceID.includes('iPhone')) return false;

    // Check device based on device ID
    // iPhone13,2 : iPhone 12
    // iPhone13,3 : iPhone 12 Pro
    // iPhone13,4 : iPhone 12 Pro Max

    let deviceNumber = Number(deviceID.replace('iPhone', '').replace(',', '.'));

    return(deviceNumber >= 13.2);
}
// endregion

// region Check if tablet layout is the new iPad Pro
const IPADPRO11_WIDTH = 834;
const IPADPRO11_HEIGHT = 1194;
const IPADPRO129_HEIGHT = 1024;
const IPADPRO129_WIDTH = 1366;

export function isNewIPadPro()
{
    const dimen = Dimensions.get('window');
    const D_HEIGHT = dimen.height, D_WIDTH = dimen.width;

    // Check if this device is an iPad
    if (Platform.OS !== 'ios' || !Platform.isPad || Platform.isTVOS || !DeviceInfo.getDeviceId().toString().includes('iPad')) return false;

    // Check if this is the new iPad Pro, not 1st and 2nd Gen iPad Pro
    let iPadCode = Number(DeviceInfo.getDeviceId().toString().replace('iPad', '').replace(',', '.'));
    if (iPadCode < 8) return false;

    // Check base on device ID
    if ((iPadCode >= 8.1 && iPadCode <= 8.9) || (iPadCode >= 8.10 && iPadCode <= 8.12) || (iPadCode >= 13.1 && iPadCode <= 13.2))
    {
        return true;
    }
    else
    {
        // Dimension check
        return(
            (D_HEIGHT === IPADPRO11_HEIGHT && D_WIDTH === IPADPRO11_WIDTH) ||
            (D_HEIGHT === IPADPRO11_WIDTH && D_WIDTH === IPADPRO11_HEIGHT)) ||
            ((D_HEIGHT === IPADPRO129_HEIGHT && D_WIDTH === IPADPRO129_WIDTH) ||
            (D_HEIGHT === IPADPRO129_WIDTH && D_WIDTH === IPADPRO129_HEIGHT)
            );
    }
}
// endregion

// region Check if this is the "normal" iPad Pro 12.9 (gen 1-3)
export function isNormalIPad129()
{
    const dimen = Dimensions.get('window');
    const D_HEIGHT = dimen.height, D_WIDTH = dimen.width;

    // Check if this device is an iPad
    if (Platform.OS !== 'ios' || !Platform.isPad || Platform.isTVOS || !DeviceInfo.getDeviceId().toString().includes('iPad')) return false;

    return((D_HEIGHT === IPADPRO129_HEIGHT && D_WIDTH === IPADPRO129_WIDTH) || (D_HEIGHT === IPADPRO129_WIDTH && D_WIDTH === IPADPRO129_HEIGHT));
}
// endregion
