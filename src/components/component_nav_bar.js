/*
    Created by Pham Hoang Phat
    phat@launchdeck.org
*/

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Platform
} from 'react-native';
import propTypes from 'prop-types';
import Icon from "react-native-vector-icons/MaterialIcons";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";

// Utils
import { parsedTextStyle } from '../utils';

// Navigation
import * as RootNavigation from '../RootNavigation';

// Global Variables Import
const GLOBAL = require('../configs/config_global');
const SIZE = require('../configs/config_size');

const
    NormalTouchableOpacity = require('react-native').TouchableOpacity,
    GestureTouchableOpacity = require('react-native-gesture-handler').TouchableOpacity;

export class ComponentNavBar extends Component
{
    // region Props
    static propTypes = {
        title: propTypes.string,
        subTitle: propTypes.string,
        leftButtonTitle: propTypes.string,
        rightButtonTitle: propTypes.string,
        leftButtonOnPress: propTypes.func,
        rightButtonOnPress: propTypes.func,

        leftButtonIconName: propTypes.any,
        leftButtonIconSize: propTypes.number,
        leftButtonIconColor: propTypes.string,

        rightButtonColor: propTypes.string,
        rightButtonIconName: propTypes.any,
        rightButtonIconSize: propTypes.number,
        horizontalSpacing: propTypes.number,
        iconSize: propTypes.number,
        hideBorder: propTypes.bool,
        ignoreTopBarHeight: propTypes.bool,

        isAbsolute: propTypes.bool,
        isInsideSheet: propTypes.bool,

        titleOnNewLine: propTypes.bool,
        extraCompOnNewLine: propTypes.any,

        style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        topSectionStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    };

    static defaultProps = {
        title: '',
        subTitle: '',
        leftButtonTitle: '',
        rightButtonTitle: '',
        leftButtonOnPress: () => RootNavigation.goBack(),
        leftButtonIconName: 'close',
        leftButtonIconColor: GLOBAL.COLOR.BASIC.BLACK_TWO,
        horizontalSpacing: 24,
        iconSize: 24,
        hideBorder: false,
        ignoreTopBarHeight: false,
        rightButtonColor: GLOBAL.COLOR.MAIN,
        isAbsolute: false,
        isInsideSheet: false,
        titleOnNewLine: false,
        extraCompOnNewLine: null
    };
    // endregion

    // region Constructor
    constructor(props)
    {
        super(props);
        this.state = {

        };

        this.contentSize = SIZE.NAV_BAR_HEIGHT + (this.props.subTitle?.trim() ? 8 : (Platform.OS === 'android' ? 8 : 0));
    }
    // endregion

    // region Component Mounting
    componentDidMount()
    {

    }
    // endregion

    // region MAIN RENDER FUNCTION
    render()
    {
        const {
            horizontalSpacing,
            iconSize,
            leftButtonIconColor,
            leftButtonIconSize,
            leftButtonIconName,
            leftButtonTitle,
            rightButtonIconSize,
            ignoreTopBarHeight,
            hideBorder,
            isAbsolute,
            isInsideSheet,
            title,
            subTitle,
            titleOnNewLine
        } = this.props;

        let topBarHeight = ignoreTopBarHeight ? (isInsideSheet ? (Platform.OS === 'ios' ? 4 : 16) : 16) : GLOBAL.BAR_HEIGHT + 16;

        const TouchableOpacity = Platform.OS === 'ios' ? NormalTouchableOpacity : (isInsideSheet ? GestureTouchableOpacity : NormalTouchableOpacity);

        return(
            <View style={[
                { width: '100%', backgroundColor: 'white' },
                !hideBorder && { borderBottomWidth: 1, borderColor: GLOBAL.COLOR.DIVIDER },
                isAbsolute && { position: 'absolute', left: 0, right: 0, top: 0 },
                this.props.style
            ]}>
                {/* Main View Section */}
                <View style={{
                    width: '100%', height: topBarHeight + this.contentSize,
                    flexDirection: 'row', alignItems: 'center', paddingTop: topBarHeight,
                    paddingHorizontal: horizontalSpacing
                }}>
                    {/* Left Icon */}
                    <TouchableOpacity
                        onPress={() => this.props.leftButtonOnPress()}
                        style={{ width: this.contentSize, height: this.contentSize, alignItems: 'flex-start', justifyContent: 'center' }}>
                        {
                            leftButtonTitle?.trim() ?
                                <Text style={parsedTextStyle({ fontSize: 14, fontWeight: '600', color: GLOBAL.COLOR.BASIC.WARM_GREY, width: this.contentSize, textAlign: 'left', marginLeft: this.props.leftButtonIconName ? 2 : 0 })}>
                                    {leftButtonTitle}
                                </Text>
                                :
                                (
                                    (typeof leftButtonIconName === 'string' && leftButtonIconName?.trim()) ?
                                        <Icon
                                            name={leftButtonIconName}
                                            size={leftButtonIconSize || iconSize}
                                            color={leftButtonIconColor}
                                        />
                                        :
                                        (
                                            leftButtonIconName ?
                                                <FastImage
                                                    source={leftButtonIconName}
                                                    style={{ width: leftButtonIconSize || iconSize, height: leftButtonIconSize || iconSize, tintColor: leftButtonIconColor }}
                                                    resizeMode={'contain'}
                                                />
                                                :
                                                null
                                        )
                                )
                        }
                    </TouchableOpacity>

                    {/* Title */}
                    {
                        !titleOnNewLine ?
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text
                                    numberOfLines={1}
                                    adjustsFontSizeToFit={true}
                                    style={parsedTextStyle({ alignSelf: 'stretch', color: GLOBAL.COLOR.BASIC.BLACK_TWO, fontWeight: 'bold', textAlign: 'center' })}>
                                    {title}
                                </Text>

                                {/* Subtitle */}
                                {
                                    subTitle.trim() ?
                                        <Text style={{ color: GLOBAL.COLOR.BASIC.WARM_GREY, textAlign: 'center', fontSize: 11, marginTop: 4 }}>
                                            {subTitle}
                                        </Text>
                                        :
                                        <View/>
                                }
                            </View>
                            :
                            <View style={{ flex: 1 }}/>
                    }

                    {/* Right Button */}
                    {
                        (this.props.rightButtonTitle || this.props.rightButtonIconName) ?
                            <TouchableOpacity
                                onPress={this.props.rightButtonOnPress}
                                style={{ width: titleOnNewLine ? null : this.contentSize, height: this.contentSize, alignItems: 'flex-end', justifyContent: 'center' }}>
                                {
                                    this.props.rightButtonTitle ?
                                        <Text style={parsedTextStyle({ fontSize: 14, fontWeight: '600', color: this.props.rightButtonColor, textAlign: 'right' })}>
                                            {this.props.rightButtonTitle}
                                        </Text>
                                        :
                                        (
                                            this.props.rightButtonIconName ?
                                                (
                                                    typeof this.props.rightButtonIconName === 'string' ?
                                                        <Icon
                                                            name={this.props.rightButtonIconName}
                                                            size={rightButtonIconSize || iconSize}
                                                            color={this.props.rightButtonColor || GLOBAL.COLOR.BASIC.BLACK_TWO}
                                                        />
                                                        :
                                                        <Image
                                                            source={this.props.rightButtonIconName}
                                                            style={{ width: this.props.iconSize, height: this.props.iconSize, tintColor: this.props.rightButtonColor }}
                                                        />
                                                )
                                                :
                                                null
                                        )
                                }
                            </TouchableOpacity>
                            :
                            <View style={{ width: this.contentSize, height: this.contentSize }}/>
                    }
                </View>

                {/* Separate Title Line */}
                {
                    titleOnNewLine &&
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', marginTop: 4, marginLeft: horizontalSpacing + 8 }}>
                        {/* Extra Component */}
                        {this.props.extraCompOnNewLine}

                        <View style={{ alignSelf: 'stretch' }}>
                            {/* Title */}
                            <Text style={parsedTextStyle({ marginLeft: this.props.extraCompOnNewLine ? 12 : 0, fontSize: 24, fontWeight: '900', letterSpacing: 0.3, color: GLOBAL.COLOR.BASIC.BLACK_TWO })}>
                                {title}
                            </Text>

                            {/* Subtitle */}
                            {
                                subTitle.trim() ?
                                    <Text style={parsedTextStyle({ color: GLOBAL.COLOR.BASIC.WARM_GREY, textAlign: 'left', fontSize: 13, lineHeight: 18, marginTop: 8 })}>
                                        {subTitle}
                                    </Text>
                                    :
                                    <View/>
                            }
                        </View>
                    </View>
                }
            </View>
        );
    }
    // endregion
}
