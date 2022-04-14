import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Scene Imports
import {
    SceneBlank,
    SceneSplash,

    SceneCompanySearch,
    SceneTagData
} from '../../scenes';

// Navigation
const Stack = createStackNavigator();
import * as RootNavigation from '../../RootNavigation';

// Global Configs
const ROUTES = require('../../configs/config_route');

// Screen Options
const screenOptions = {
    headerShown: false,
    cardShadowEnabled: true,
    cardOverlayEnabled: true,
    gesturesEnabled: false
};

// Startup Stack
const StartupStack = createStackNavigator();
function CreateStartupStack()
{
    return(
        <StartupStack.Navigator initialRouteName={ROUTES.BLANK} screenOptions={screenOptions}>
            <StartupStack.Screen name={ROUTES.BLANK} component={SceneBlank}/>
            <StartupStack.Screen name={ROUTES.SPLASH} component={SceneSplash} options={{ animationEnabled: false }}/>
        </StartupStack.Navigator>
    );
}

// Main Stack
const MainStack = createStackNavigator();
function CreateMainStack()
{
    return(
        <MainStack.Navigator
            initialRouteName={ROUTES.COMPANY_SEARCH}
            screenOptions={Object.assign({}, screenOptions, { lazy: true })}>
            {/* Tag Data */}
            <MainStack.Screen name={ROUTES.COMPANY_SEARCH} component={SceneCompanySearch} />

            {/* Tag Data */}
            <MainStack.Screen name={ROUTES.TAG_DATA} component={SceneTagData} />
        </MainStack.Navigator>
    );
}

// Returning Router
export default function CreateRouterStack()
{
    return(
        <NavigationContainer ref={RootNavigation.navigationRef}>
            <Stack.Navigator screenOptions={screenOptions}>
                {/* Startup Stack */}
                <Stack.Screen name={ROUTES.STARTUP_STACK} component={CreateStartupStack} />

                {/* Main Stack */}
                <Stack.Screen name={ROUTES.MAIN_STACK} component={CreateMainStack} options={{ animationEnabled: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
