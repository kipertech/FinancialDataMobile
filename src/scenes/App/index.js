import React, { Component } from 'react';
import {
    UIManager,
    Platform,
    View,
    Text,
    StatusBar,
    AppState
} from "react-native";
import { setCustomTextInput, setCustomText } from 'react-native-global-props';
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import changeNavigationBarColor from "react-native-navigation-bar-color";

// Navigation
import CreateRouterStack from "./component_routes";
import * as RootNavigation from '../../RootNavigation';

// Utils
import { getFontName } from "../../utils";
import { initializeCustomAnimations } from "../../configs/config_animation";

// Global Configs
const GLOBAL = require('../../configs/config_global');
const ROUTES = require('../../configs/config_route');

class App extends Component
{
    // region Constructor
    constructor(props)
    {
        super(props);

        // State
        this.state = {
            windowHeight: 0,
            windowWidth: 0,
            isDev: false,
            backPressed: false,
            isConnected: true,
            latestVersion: '1.0',
            appState: 'active'
        };
    }
    // endregion

    // region Component Mounting
    componentDidMount()
    {
        GLOBAL.MAIN = this;
    }

    componentWillUnmount()
    {
        GLOBAL.MAIN = null;
        this.removeConnectionHandler();
    }
    // endregion

    // region CONFIGS
    startAllConfigs()
    {
        // Enable LayoutAnimation on Android
        if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental)
        {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        // Config text
        this.configTextProps();

        // Config App State actions
        this.configAppState();

        // Animation
        initializeCustomAnimations();

        // Hide the native Splash Screen
        // SplashScreen.hide();

        // Show our JS splash screen
        setTimeout(() => RootNavigation.reset(ROUTES.SPLASH)); /* There's a bug here that needs setTimeout() to work */
    }

    // region Config - AppState
    configAppState()
    {
        AppState.addEventListener(
            "change",
            (nextAppState) => {
                if (this.state.appState?.match(/inactive|background/) && nextAppState === "active")
                {
                    console.log('App is active again');
                }
                else if (this.state.appState === 'active' && nextAppState.match(/inactive|background/))
                {
                    // Do something here
                }

                this.setState({ appState: nextAppState });
            }
        );
    }
    // endregion

    // region Config - Config Global Text Props
    configTextProps()
    {
        const customTextProps = {
            allowFontScaling: false,
            style: {
                fontSize: 14,
                fontFamily: getFontName('normal', 'normal'),
                color: GLOBAL.COLOR.BASIC.BLACK_TWO
            }
        };

        setCustomTextInput(customTextProps);
        setCustomText(customTextProps);
    }
    // endregion

    // region Function - Change Nav Bar Color
    changeNavBarColor(color = GLOBAL.COLOR.MAIN, darkIcon = false)
    {
        if (Platform.OS === 'android')
        {
            try
            {
                changeNavigationBarColor(color, darkIcon);
            }
            catch (error)
            {
                console.log('[FAILED] CHANGE NAV BAR COLOR', error);
            }
        }
    }
    // endregion

    // region Function - Internet Connection Listener
    addConnectionListener()
    {
        this.connectionHandler = NetInfo.addEventListener((connectionState) =>
        {
            console.log("[INFO] Connection Changed", connectionState);
            this.setInternetConnection(connectionState.isConnected);
        });
    }

    removeConnectionHandler()
    {
        if (this.connectionHandler) this.connectionHandler();
    }

    setInternetConnection(isConnected = true)
    {
        this.setState({ isConnected });
    }
    // endregion

    // region Render Status Bar for Android Modal
    renderStatusBarAndroidModal()
    {
        return(
            Platform.OS === 'android' ?
                <StatusBar backgroundColor="rgba(0,0,0,0.7)" barStyle="light-content"/>
                :
                <View/>
        );
    }
    // endregion

    // region MAIN RENDER FUNCTION
    render()
    {
        return(
            <View
                onLayout={(event) => {
                    let windowHeight = event.nativeEvent.layout.height,
                        windowWidth = event.nativeEvent.layout.width;

                    this.setState({ windowHeight, windowWidth }, () => this.startAllConfigs());
                }}
                style={{ flex: 1, width: '100%', backgroundColor: GLOBAL.COLOR.MAIN }}>
                {/* Screen Stack */}
                {CreateRouterStack()}

                {/* Notice when on dev server */}
                {
                    (this.state.isDev) &&
                    <View
                        pointerEvents={'none'}
                        style={{
                            position: 'absolute', top: GLOBAL.BAR_HEIGHT + 8, right: 8,
                            backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end'
                        }}>
                        {/* Dev Mode Enabled */}
                        {
                            this.state.isDev &&
                            <View style={{ backgroundColor: GLOBAL.COLOR.BASIC.RED, opacity: 0.7, borderRadius: 4, marginLeft: 4 }}>
                                <Text style={{ color: 'white', marginHorizontal: 8, marginVertical: 4, fontWeight: 'bold' }}>
                                    DEV
                                </Text>
                            </View>
                        }
                    </View>
                }

                {/* Toast Global Configs */}
                <Toast position={'top'} topOffset={GLOBAL.BAR_HEIGHT + 32} />
            </View>
        );
    }
    // endregion
}

export default App;
