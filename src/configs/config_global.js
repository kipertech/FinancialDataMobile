import {
    Platform,
    StatusBar
} from 'react-native';
import {
    isIphone12,
    isIphoneX,
    isNewIPadPro
} from "../utils";
import DeviceInfo from 'react-native-device-info';

const barHeight = (Platform.OS === 'ios') ? (isIphoneX() ? 32 : 20) : StatusBar.currentHeight, bottomBarHeight = (isIphoneX() || isIphone12()) ? 24 : (isNewIPadPro() ? 32 : 0);
const bottomHeight = (Platform.OS === 'ios') ? (isIphoneX() ? 80 : 50) : 50;
const bottomPadding = (Platform.OS === 'ios') ? ((isIphoneX() || isNewIPadPro()) ? 32 : 0) : 0;
const isTablet = DeviceInfo.isTablet();
const isDark = false; // const isDark = Appearance.getColorScheme() === 'dark';

module.exports = {
    APP_NAME: 'Financial Data Mapper',
    PRODUCTION_LINK: "https://localhost:3000/api",
    DEV_LINK: "https://localhost:3000/api",
    FATHER_LINK: null,

    BAR_HEIGHT: barHeight,
    BOTTOM_BAR_HEIGHT: bottomBarHeight,
    BOTTOM_HEIGHT: bottomHeight,
    BOTTOM_PADDING: bottomPadding,

    IS_TABLET: isTablet,
    IS_DARK_MODE: isDark,

    DATA: {
        IS_NEW_SIGN_UP: false,
        LOGIN_SERVICE: null,
        USER: {
            firstName: 'Phat',
            lastName: 'Pham',
            imageURL: '',
            email: '',
            phone: '',
            address: {
                country: '',
                state: '',
                city: '',
                zip: '',
                useForBilling: false
            }
        },
        MY_PLEDGES: [],
        MY_GROUPS: [],
        USER_TOKEN: null
    },

    CACHE: { // TODO: Cache your data here for global access
        LOCATIONS: []
    },

    MAIN: null,
    TAB_BAR: null,
    SCENES: { // TODO: Cache your scene component here for global access
        SPLASH: null,
        HOME: null,
        GROUPS: null,
        CURRENT_GROUP_DETAIL: null,
        PROFILE: null,
        CURRENT_NEW_PLEDGE: null
    },

    // region Colors
    COLOR: {
        MAIN_HEX: 'white',
        MAIN: 'white',

        TEXT_GRAY: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgb(125, 131, 150)',
        TEXT_LIGHT_GRAY: 'rgba(125, 131, 150, 0.5)',
        BACKGROUND: isDark ? 'rgb(36, 36, 37)' : 'white',
        BACKGROUND_GRAY: 'rgb(245, 247, 248)',
        BACKGROUND_WHITE: 'rgb(252, 252, 252)',
        BACKGROUND_GREEN: 'rgb(212, 240, 205)',
        BACKGROUND_TEXT_BOX: 'rgb(245, 247, 248)',
        DIVIDER: 'rgba(0, 0, 0, 0.1)',
        SOCIAL: {
            FACEBOOK: 'rgb(40, 103, 176)',
            GOOGLE: 'rgb(206, 85, 63)',
            TWITTER: 'rgb(98, 178, 238)',
            INSTAGRAM: 'rgb(111, 47, 162)'
        },
        BASIC: {
            BRONZE: 'rgb(217, 189, 165)',
            NEUTRAL_BLACK: 'rgb(56, 62, 86)',
            ORANGE: 'rgb(226, 100, 55)',
            RED: 'rgb(237, 59, 59)',
            BROWN_RED: 'rgb(154, 53, 48)',
            GREEN: 'rgb(0, 174, 119)',
            GREEN_HEX: '#00ae77',
            BLUE: 'rgb(3, 155, 229)',
            DARK_BLUE: 'rgb(51, 93, 141)',
            GRAY: 'rgb(152, 166, 180)',
            LIGHT_GRAY: 'rgb(248, 248, 248)',
            PURPLE: 'rgb(105, 50, 143)',
            WARM_GREY: 'rgb(117, 117, 117)',
            WHITE_TWO: 'rgb(252, 252, 252)',
            WHITE_THREE: 'rgb(239, 239, 239)',
            GOLD: 'rgb(249, 211, 113)',
            PINKISH_GREY: '#bdbdbd',
            BLACK_TWO: 'rgb(33, 33, 33)',
            ALTO_GREY: 'rgb(218, 218, 218)',

            MAIN_BLACK: '#212121',
            COVER_GRAY: '#DADADA',
            MAIN_GRAY: '#757575',
            LIGHT_BLACK_TWO: 'rgba(33, 33, 33, 0.05)',
            COMPLETE_GREEN: '#3EC7A2',
            LIGHT_PINK: 'rgba(250, 57, 61, 1.0)',
            DODGER_BLUE: 'rgb(82, 137, 255)',
            LIGHT_WHITE: 'rgba(218, 218, 218, 1.0)',
            LIGHTER_WHITE: 'rgba(235,235,235,1.0)',
            WHITE_BACKGROUND: 'rgb(250,250,250)',
            STRAWBERRY_TWO: 'rgb(243, 33, 38)',
            GREENISH_TEAL: '#32d770',
            STRAWBERRY: 'rgb(250, 57, 61)',
            LIGHT_GOLD: 'rgb(255, 211, 94)',
            GRAY_OPAQUE: 'rgba(33, 33, 33, 0.4)',
            BROWNISH_GREY: 'rgb(117, 117, 117)',
            DARK_MINT: 'rgb(50, 215, 112)',

            NEUTRAL_DARK_GREY: 'rgb(66, 66, 66)',
            NEUTRAL_GREY: 'rgb(102, 102, 102)',
            NEUTRAL_LIGHT_GREY: 'rgb(161, 161, 161)',
            NEUTRAL_STROKE: 'rgb(212, 212, 212)'
        },
        ENHANCED: {
            UI_TALE: 'rgb(0, 182, 187)',
            UI_YELLOW: 'rgb(255, 166, 0)',
            UI_BLUE: 'rgb(0, 117, 219)',
            UI_GREEN: 'rgb(118, 192, 33)'
        }
    }
    // endregion
};
