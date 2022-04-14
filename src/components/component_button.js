import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    ActivityIndicator,
    Image,
    Platform,
    Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { parsedTextStyle } from '../utils';

const GLOBAL = require('../configs/config_global');

const
    NormalTouchableOpacity = require('react-native').TouchableOpacity,
    GestureTouchableOpacity = require('react-native-gesture-handler').TouchableOpacity;

export class Button extends Component
{
    static propTypes = {
        text: PropTypes.string,
        textColor: PropTypes.string,
        loadingText: PropTypes.string,
        isLoading: PropTypes.bool,
        image: PropTypes.any,
        textStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        locked: PropTypes.bool,
        lockedBackgroundColor: PropTypes.string,
        lockedTextColor: PropTypes.string,
        isInsideSheet: PropTypes.bool,
        onLayout: PropTypes.func,
        imageSize: PropTypes.number,
        imageColor: PropTypes.string,
        imageStyle: PropTypes.object,
        imageStickToText: PropTypes.bool,
        backgroundColor: PropTypes.string,
        style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        onPressIn: PropTypes.any,
        onPressOut: PropTypes.any,
        onPress: PropTypes.func
    };

    static defaultProps = {
        text: '',
        textColor: GLOBAL.COLOR.BASIC.NEUTRAL_BLACK,
        loadingText: '',
        isLoading: false,
        image: '',
        textStyle: {},
        locked: false,
        lockedBackgroundColor: GLOBAL.COLOR.BASIC.LIGHT_GRAY,
        lockedTextColor: GLOBAL.COLOR.BASIC.NEUTRAL_LIGHT_GREY,
        isInsideSheet: false,
        onLayout: () => {},
        imageSize: 24,
        imageColor: null,
        imageStyle: {},
        imageStickToText: false,
        backgroundColor: '',
        style: {},
        onPressIn: null,
        onPressOut: null,
        onPress: null
    };

    constructor(props)
    {
        super(props);
        this.state = {
            isPressedIn: false
        };
    }

    releaseButton = () => this.setState({ isPressedIn: false });

    renderButtonContent()
    {
        const backgroundColor = this.props.backgroundColor || this.props.style?.backgroundColor;

        const {
            imageStickToText
        } = this.props;

        let imageBaseStyle = imageStickToText ? { marginRight: 8 } : { position: 'absolute', left: (this.props.style?.paddingLeft || 12) };

        return(
            <View style={[
                {
                    width: '100%', flex: 1,
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                    opacity: this.props.isLoading ? 0.5 : 1, borderRadius: 6,
                    backgroundColor: this.props.locked ? this.props.lockedBackgroundColor : (backgroundColor || GLOBAL.COLOR.MAIN)
                }
            ]}>
                {
                    this.props.image && !this.props.isLoading ?
                        (
                            (typeof this.props.image === 'string') ?
                                <View style={[imageBaseStyle, { marginLeft: (this.props.text.trim() && !imageStickToText) ? 15 : 0 }]}>
                                    <Icon
                                        name={this.props.image}
                                        size={this.props.imageSize || 20}
                                        color={this.props.imageColor || this.props.textColor}
                                    />
                                </View>
                                :
                                <Image
                                    source={this.props.image}
                                    style={[
                                        imageBaseStyle,
                                        { width: this.props.imageSize, height: this.props.imageSize },
                                        this.props.imageColor ? { tintColor: this.props.imageColor } : {},
                                        this.props.imageStyle
                                    ]}
                                    resizeMode={'contain'}
                                />
                        )
                        :
                        <View/>
                }

                {
                    this.props.isLoading &&
                    <ActivityIndicator
                        color={this.props.imageColor || this.props.textColor || this.props.textStyle?.color}
                        style={[
                            imageBaseStyle,
                            { width: this.props.imageSize, height: this.props.imageSize }
                        ]}
                    />
                }

                {
                    this.props.text.trim() ?
                        <Text
                            style={parsedTextStyle(
                                Object.assign(
                                    imageStickToText ? {} : { position: 'absolute', left: 0, right: 0 },
                                    {
                                        color: this.props.locked ? this.props.lockedTextColor : (this.props.textColor || this.props.textStyle?.color), backgroundColor: 'transparent',
                                        textAlign: imageStickToText ? 'left' : 'center', fontWeight: '500', lineHeight: this.props.textStyle?.lineHeight || ((this.props.textStyle?.fontSize || 14) + 2),
                                    },
                                    (this.props.image && !imageStickToText) ? { flex: 1 } : {},
                                    this.props.locked ? {} : (this.props.textStyle || {})
                                )
                            )}>
                            {this.props.loadingText ? (this.props.isLoading ? this.props.loadingText : this.props.text) : this.props.text}
                        </Text>
                        :
                        null
                }
            </View>
        );
    }

    _onPressIn = () => {
        // Press in animation
        this.setState({ isPressedIn: true });

        // Press function
        if (this.props.onPress) return;

        this.props.onPressIn();
    }

    _onPressOut = () => {
        // Press out animation
        this.setState({ isPressedIn: false });

        // Press function
        if (this.props.onPressOut)
        {
            this.props.onPressOut();
            return;
        }

        this.props.onPress();
    }

    render()
    {
        const TouchableOpacity = Platform.OS === 'ios' ? NormalTouchableOpacity : (this.props.isInsideSheet ? GestureTouchableOpacity : NormalTouchableOpacity);

        let MyView = this.props.locked ? View : (this.props.onPress !== null ? TouchableOpacity : Pressable),
            pressInAnimation = this.state.isPressedIn ? { opacity: 0.3 } : {},
            hasNormalOnPress = !!this.props.onPress;

        return(
            Platform.OS === 'ios' ?
                <MyView
                    onPress={this.props.onPress}
                    onPressIn={hasNormalOnPress ? null : this._onPressIn}
                    onPressOut={hasNormalOnPress ? null : this._onPressOut}
                    onLayout={this.props.onLayout}
                    style={[
                        { alignSelf: 'stretch', borderRadius: 6, overflow: 'hidden', height: 48 },
                        this.props.style,
                        pressInAnimation
                    ]}>
                    {this.renderButtonContent()}
                </MyView>
                :
                <View
                    onLayout={this.props.onLayout}
                    style={[
                        { alignSelf: 'stretch', borderRadius: 6, overflow: 'hidden', height: 48 },
                        this.props.style,
                        pressInAnimation
                    ]}>
                    <MyView
                        onPress={this.props.onPress}
                        onPressIn={hasNormalOnPress ? null : this._onPressIn}
                        onPressOut={hasNormalOnPress ? null : this._onPressOut}
                        style={{ width: '100%', flex: 1 }}>
                        {this.renderButtonContent()}
                    </MyView>
                </View>
        );
    }
}
