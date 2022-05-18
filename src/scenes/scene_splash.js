import React, { Component } from 'react';
import {
    Text,
    Linking,
    TouchableOpacity,
    Platform,
    StatusBar
} from 'react-native';
import Toast from 'react-native-toast-message';
import VersionCheck from 'react-native-version-check';
import * as Animatable from 'react-native-animatable';
import FastImage from "react-native-fast-image";
import PropTypes from 'prop-types';
import moment from 'moment';

// Module Imports
import {
    checkExpire,
    checkInternet,
    getData,
    getToken,
    storeData
} from '../utils';

// Navigation
import * as RootNavigation from '../RootNavigation';

// Global Variables Import
const GLOBAL = require('../configs/config_global');
const ROUTES = require('../configs/config_route');

export class SceneSplash extends Component
{
    // region Props
    static propTypes = {
        isFirstTime: PropTypes.bool
    }

    static defaultProps = {
        isFirstTime: false
    }
    // endregion

    // region Constructor
    constructor(props)
    {
        super(props);
        this.state = {
            isLoading: true,
            storeLink: null,
            currentLoadingStr: ''
        };
    }
    // endregion

    // region Component Mounting
    componentDidMount()
    {
        GLOBAL.SCENES.SPLASH = this;

        // Check for Code Push Status
        this.setLoadingText('Getting data from server');

        // Start the process
        this.getServerLink();
    }

    componentWillUnmount()
    {
        GLOBAL.SCENES.SPLASH = null;
    }
    // endregion

    // region Function - Set Loading Text
    setLoadingText(text = '')
    {
        this.setState({ currentLoadingStr: text });
    }
    // endregion

    // region Function - Get Current Environment
    getServerLink()
    {
        getData('isDev')
            .then((result) =>
            {
                if (result)
                {
                    let resultObj = JSON.parse(result);
                    console.log('[SUCCESS] SAVED SERVER LINK', resultObj);

                    GLOBAL.FATHER_LINK = resultObj.data ? GLOBAL.DEV_LINK : GLOBAL.PRODUCTION_LINK;
                    GLOBAL.MAIN.setState({ isDev: resultObj.data }, () => this.mainFunction());
                }
                else
                {
                    GLOBAL.FATHER_LINK = GLOBAL.PRODUCTION_LINK;
                    GLOBAL.MAIN.setState({ isDev: false }, () => this.mainFunction());
                }
            })
            .catch(() =>
            {
                GLOBAL.FATHER_LINK = GLOBAL.PRODUCTION_LINK;
                GLOBAL.MAIN.setState({ isDev: false }, () => this.mainFunction());
            });
    }
    // endregion

    // region Function - Check token
    checkToken()
    {
        this.setLoadingText('Checking for existing user session');

        // Go to main scene if already logged in
        getToken().then((result) => {
            if (result)
            {
                let resultObj = JSON.parse(result);

                // Check for expired token or empty token
                if (!resultObj.token || checkExpire(resultObj.token))
                {
                    // Inform user
                    Toast.show({
                        type: 'info',
                        topOffset: GLOBAL.BAR_HEIGHT + 32,
                        visibilityTime: 5000,
                        text1: 'Session Expired',
                        text2: 'Please login again'
                    });

                    // Complete loading state and go to Login screen
                    this.goToLogin();
                }
                else
                {
                    // TODO: Retrieve user data from server
                    // getUserData(resultObj.token)
                    //     .then(() => {
                    //         // Go to Home Screen
                    //     })
                    //     .catch((errorUserData) => {
                    //         // Go to Login screen if user profile cannot be retrieved
                    //         this.goToLogin();
                    //
                    //         // Notify user about the error
                    //         Alert.alert(GLOBAL.APP_NAME, 'An error has occurred while logging in with your account.\n\nError Message: ' + errorUserData);
                    //     });
                }
            }
            else this.goToLogin();
        });
    }
    // endregion

    // region Function - Go To Login
    goToLogin()
    {
        this.setLoadingText('Loading completed');

        setTimeout(() => {
            this.setState({ isLoading: false }, () => {
                setTimeout(() => {
                    this.mainView.fadeOut(600);
                    setTimeout(() => RootNavigation.reset(ROUTES.MAIN_STACK), 500);
                }, 1000);
            });
        }, 1000);
    }
    // endregion

    // region Function - Main Function
    mainFunction()
    {
        this.setLoadingText('Checking Internet connection');
        this.setState({ isLoading: true });

        // Check for internet connection
        setTimeout(() => {
            checkInternet().then((hasInternet) => {
                GLOBAL.MAIN.setInternetConnection(hasInternet);

                // Add event handler for connection
                GLOBAL.MAIN.addConnectionListener();

                if (hasInternet)
                {
                    let continueToApp = () => this.checkToken();

                    // Check for latest store version
                    if (__DEV__)
                    {
                        continueToApp();
                    }
                    else
                    {
                        this.setLoadingText(`Checking for latest version on ${Platform.OS === 'ios' ? 'App Store' : 'Play Store'}`);
                        VersionCheck.getLatestVersion()
                            .then((latestVersion) =>
                            {
                                GLOBAL.MAIN.setState({ latestVersion });

                                let currentVersion = Number(VersionCheck.getCurrentVersion().toString().replaceAll('.', '').replace('(', '').replace(')', '').replace(' ', '')),
                                    storeVersion = Number(latestVersion.toString().replaceAll('.', '').replace('(', '').replace(')', '').replace(' ', ''));

                                console.log('[INFO] APP VERSION', currentVersion, 'STORE VERSION', storeVersion);

                                if (currentVersion >= storeVersion)
                                {
                                    continueToApp();
                                }
                                else
                                {
                                    // Get store link
                                    VersionCheck.getStoreUrl({ appID: 1610031903, appName: 'Pardies For A Purpose', packageName: 'com.pardiesforapurpose.app' })
                                        .then((storeLink) => {
                                            // iOS: Force Update immediately
                                            if (Platform.OS === 'ios')
                                            {
                                                this.setState({ storeLink, latestVersion });
                                                return;
                                            }

                                            // Android: Delay by one day before forcing update
                                            getData('lastVersionCheckDate')
                                                .then((result) => {
                                                    if (result)
                                                    {
                                                        let duration = moment().diff(moment.unix(Number(JSON.parse(result).checkAt)), 'hours');
                                                        if (duration >= 36)
                                                        {
                                                            this.setState({ storeLink, latestVersion });
                                                        }
                                                        else continueToApp();
                                                    }
                                                    else
                                                    {
                                                        storeData('lastVersionCheckDate', JSON.stringify({ checkAt: moment().unix() }))
                                                            .then(() => continueToApp());
                                                    }
                                                });
                                        })
                                        .catch(() => continueToApp());
                                }
                            })
                            .catch((versionError) => {
                                console.log('[FAILED] STORE VERSION CHECK', versionError);
                                continueToApp();
                            });
                    }
                }
                else
                {
                    // Inform user
                    Toast.show({
                        type: 'error',
                        text1: 'No Internet Connection',
                        text2: 'Cannot fetch data from the server'
                    });

                    // Stay here
                    this.setState({ isLoading: false });
                }
            });
        }, 2000);
    }
    // endregion

    // region MAIN RENDER FUNCTION
    render()
    {
        let sizeRatio = 102 / 130,
            logoWidth = 164,
            logoHeight = logoWidth * sizeRatio;

        return(
            <Animatable.View
                ref={(comp) => this.mainView = comp}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: GLOBAL.COLOR.MAIN }}>
                {/* Status Bar Config */}
                <StatusBar barStyle={'light-content'} translucent={true}/>

                {/* App Logo */}
                <FastImage
                    source={require('../images/logo_main.png')}
                    style={{ width: logoWidth, height: logoHeight }}
                    resizeMode={'contain'}
                />

                {/* Loading Indicator */}
                {
                    GLOBAL.MAIN.state.isConnected ?
                        (
                            !this.state.storeLink ?
                                (
                                    <Animatable.Text
                                        animation={this.state.isLoading ? 'fadeIn' : 'fadeOut'}
                                        style={{ position: 'absolute', left: 0, right: 0, top: GLOBAL.BAR_HEIGHT + ((GLOBAL.MAIN.state.windowHeight / 2) - (logoHeight / 2)) + 120, textAlign: 'center', color: 'black' }}>
                                        {this.state.currentLoadingStr}
                                    </Animatable.Text>
                                )
                                :
                                <Animatable.View
                                    animation={'fadeIn'} delay={500}
                                    style={{ alignItems: 'center', marginHorizontal: 50 }}>
                                    <Text style={{ color: GLOBAL.COLOR.BASIC.BLACK_TWO, textAlign: 'center' }}>
                                        A new version of {GLOBAL.APP_NAME} ({this.state.latestVersion}) is available on the {Platform.OS === 'ios' ? 'App Store' : 'Play Store'}, update now to enjoy all latest features.
                                        {'\n\n'}
                                        Your app's version: {VersionCheck.getCurrentVersion()}
                                    </Text>

                                    {/* Open store button */}
                                    <TouchableOpacity
                                        onPress={() => Linking.openURL(this.state.storeLink)}
                                        style={{ backgroundColor: GLOBAL.COLOR.MAIN, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6, marginTop: 20 }}>
                                        <Text style={{ color: 'black', textAlign: 'center' }}>
                                            OPEN STORE
                                        </Text>
                                    </TouchableOpacity>
                                </Animatable.View>
                        )
                        :
                        <Text style={{ color: GLOBAL.COLOR.TEXT_GRAY, textAlign: 'center', width: '80%', marginTop: 48 }}>
                            {GLOBAL.APP_NAME} needs online access in order to get data from server.
                            {'\n\n'}Please check your internet connection and try again.
                        </Text>
                }
            </Animatable.View>
        );
    }
    // endregion
}
