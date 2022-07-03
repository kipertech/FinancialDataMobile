/*
    Created by Pham Hoang Phat
    phat@launchdeck.org
*/

import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    Dimensions
} from 'react-native';
import { Button, ComponentNavBar, LoadingView } from "../../components";
import { TabView, TabBar } from "react-native-tab-view";
import moment from 'moment';
import * as Animatable from 'react-native-animatable';

import {
    numberWithCommas,
    parsedTextStyle,
    showAppError
} from "../../utils";
import { getTagData } from "../../apis";
import * as RootNavigation from "../../RootNavigation";
import ROUTES from "../../configs/config_route";

const GLOBAL = require('../../configs/config_global');
const DATA = require('../../configs/config_data');

const TestComp = () =>
{
    return(
        <View style={{ flex: 1 }}>

        </View>
    );
};

export class SceneTagData extends Component
{
    // region Constructor
    constructor(props)
    {
        super(props);
        this.state = {
            companyData: this.props?.route?.params?.companyData || {},
            isLoading: true,
            tagData: {},
            yearList: [],
            currentTabIndex: 0
        };

        this.viewWidth = GLOBAL.MAIN.state.windowWidth - 48;
        this.nameWidth = (this.viewWidth / 4) + 24;
        this.dataDateWidth = (this.viewWidth / 4) - 24;
        this.valueWidth = (this.viewWidth / 4) + 16;

        this.sceneMap = null;
    }
    // endregion

    // region Component Mounting
    componentDidMount()
    {
        this.fetch5YearTagData();
    }
    // endregion

    // region Fetch 5 Year Tag Data
    fetch5YearTagData()
    {
        const currentYear = moment().year();
        const yearList = Array.from({ length: 5 }, (_, i) => i + (currentYear - 5));

        this.setState({ isLoading: true });
        Promise
            .all(yearList.map((year) => getTagData(this.state.companyData._id, year)))
            .then((resultList) => {
                let tagDataObj = {};
                yearList.forEach((year, index) => tagDataObj[year] = resultList[index]);

                // Set state
                this.setState({
                    yearList,
                    isLoading: false,
                    tagData: tagDataObj
                });
            })
            .catch((promiseAllErr) => {
                this.setState({ isLoading: false });
                showAppError(promiseAllErr.message);
            });
    }
    // endregion

    // region Render Tag Item
    renderTagItem(item)
    {
        let name = DATA.TAG_MAP.hasOwnProperty(item.tagName) ? DATA.TAG_MAP[item.tagName] : item.tagName,
            dataDate = moment(item.dDate.raw, 'YYYYMMDD').format('MM/DD'),
            value = numberWithCommas(item.value, true, 0, true);

        return(
            <Animatable.View
                key={item.tagName}
                style={{
                    width: '100%', marginVertical: 4, borderRadius: 6, overflow: 'hidden',
                    alignSelf: 'stretch', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    paddingVertical: 16, paddingHorizontal: 24
                }}>
                <Text numberOfLines={2} style={parsedTextStyle({ width: '45%', fontWeight: 'bold', textAlign: 'left' })}>
                    {name}
                </Text>

                <Text numberOfLines={1} adjustsFontSizeToFit={true} style={parsedTextStyle({ width: 56, marginHorizontal: 16, textAlign: 'left' })}>
                    {dataDate}
                </Text>

                <Text numberOfLines={1} adjustsFontSizeToFit={true} style={parsedTextStyle({ color: value.includes('-') ? GLOBAL.COLOR.BASIC.RED : GLOBAL.COLOR.ENHANCED.UI_BLUE, flex: 1, textAlign: 'left' })}>
                    {value}
                </Text>
            </Animatable.View>
        );
    }
    // endregion

    // region Render Tag list
    renderTagList(tagData)
    {
        return(
            <View style={{ flex: 1, width: '100%' }}>
                {/* Header Row */}
                <View style={{ alignSelf: 'stretch', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 24, paddingHorizontal: 24 }}>
                    <Text style={parsedTextStyle(Object.assign({}, styles.headerRowText, { width: '45%', textAlign: 'left' }))}>
                        Item
                    </Text>

                    <Text style={parsedTextStyle(Object.assign({}, styles.headerRowText, { width: 56, marginHorizontal: 16, textAlign: 'left' }))}>
                        Date
                    </Text>

                    <Text style={parsedTextStyle(Object.assign({}, styles.headerRowText, { flex: 1, textAlign: 'left' }))}>
                        Value
                    </Text>
                </View>

                {/* List */}
                <View style={{ flex: 1 }}>
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ paddingTop: 16 }}>
                        {Object.keys(tagData).map((key) => this.renderTagItem(tagData[key]))}
                    </ScrollView>

                    {/* Bottom Gradient */}
                    <Image
                        source={require('../../images/image_gradient_down.png')}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 16 }}
                    />
                </View>
            </View>
        );
    }
    // endregion

    // region Render Main Content
    renderMainContent()
    {
        let navigationState = { index: this.state.currentTabIndex, routes: this.state.yearList.map((year) => ({ key: year.toString(), title: year?.toString() })) };

        return(
            <View style={{ flex: 1, width: '100%' }}>
                {/* Data Map */}
                <TabView
                    navigationState={navigationState}
                    onIndexChange={(index) => this.setState({ currentTabIndex: index })}
                    renderScene={({ route }) => this.renderTagList(this.state.tagData[route.key].data)}
                    renderTabBar={(props) => (
                        <TabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: GLOBAL.COLOR.ENHANCED.UI_BLUE, height: 3, borderRadius: 1.5 }}
                            indicatorContainerStyle={{ backgroundColor: 'white' }}
                            labelStyle={{ color: GLOBAL.COLOR.BASIC.BLACK_TWO }}
                            activeColor={GLOBAL.COLOR.ENHANCED.UI_BLUE}
                            inactiveColor={GLOBAL.COLOR.TEXT_LIGHT_GRAY}
                        />
                    )}
                    style={{ flex: 1, width: '100%' }}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />

                {/* Go to Prediction */}
                <Button
                    text={'Go to Prediction Data'}
                    backgroundColor={GLOBAL.COLOR.ENHANCED.UI_GREEN}
                    textColor={'white'}
                    style={{ marginHorizontal: 24, marginBottom: GLOBAL.BOTTOM_BAR_HEIGHT + 8, marginTop: 8 }}
                    textStyle={{ fontWeight: 'bold' }}
                    onPress={() => {}}
                />
            </View>
        );
    }
    // endregion

    // region MAIN RENDER FUNCTION
    render()
    {
        const companyData = this.props?.route?.params?.companyData || {};

        return(
            <View style={{ flex: 1, width: '100%', backgroundColor: GLOBAL.COLOR.MAIN }}>
                {/* Title */}
                <ComponentNavBar
                    title={'Financial Data'}
                    subTitle={companyData?.name}
                    leftButtonIconName={'keyboard-arrow-left'}
                    leftButtonIconSize={32}
                    horizontalSpacing={16}
                />

                {/* Main Content */}
                {
                    this.state.isLoading ?
                        <LoadingView isAbsolute={false} useBlurView={false} description={'Loading Tag Data'} />
                        :
                        this.renderMainContent()
                }
            </View>
        );
    }
    // endregion
}

// region Styles
const styles = {
    headerRowText: {
        fontWeight: '600',
        letterSpacing: 0.4,
        fontSize: 12,
        lineHeight: 16,
        color: GLOBAL.COLOR.BASIC.NEUTRAL_DARK_GREY
    },
    itemRowText: {
        fontWeight: 'normal',
        fontSize: 20,
        color: GLOBAL.COLOR.BASIC.BLACK_TWO
    }
};
// endregion
