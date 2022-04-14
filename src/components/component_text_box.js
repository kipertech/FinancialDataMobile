import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    View,
    TextInput,
    Image,
    TouchableOpacity,
    Text,
    Platform,
    ActivityIndicator,
    Alert
} from 'react-native';
import * as Progress from "react-native-progress";
import TextInputMask from 'react-native-text-input-mask';

// Custom Components
import DefaultView from './component_default_view';

// Module Imports
import {
    parsedTextStyle,
    checkPasswordStrength,
    isObject
} from '../utils';

// Global Imports
const GLOBAL = require('./../configs/config_global');

export class TextBox extends Component
{
    // region Props
    static propTypes = {
        title: PropTypes.string,
        useMaskedInput: PropTypes.bool,
        onValueCompleted: PropTypes.func,
        customImage: PropTypes.any,
        customImageStyle: PropTypes.object,
        imageName: PropTypes.string,
        imageColor: PropTypes.string,
        showError: PropTypes.bool,
        errorMessage: PropTypes.string,
        placeholder: PropTypes.string,
        placeholderTextColor: PropTypes.string,
        secureTextEntry: PropTypes.bool,
        autoCorrect: PropTypes.bool,
        autoCapitalize: PropTypes.string,
        returnKeyType: PropTypes.string,
        onPress: PropTypes.func,
        textInputStyle: PropTypes.object,
        textBoxColor: PropTypes.string,
        showHintButton: PropTypes.bool,
        hintButtonImage: PropTypes.any,
        hintButtonOpacity: PropTypes.number,
        hintButtonOnPress: PropTypes.func,
        hintButtonColor: PropTypes.string,
        onSubmitEditing: PropTypes.func,
        multiline: PropTypes.bool,
        blurOnSubmit: PropTypes.bool,
        isLoading: PropTypes.bool,
        onLongPress: PropTypes.func,
        isSingleInput: PropTypes.bool,
        containerStyle: PropTypes.object,
        showPasswordValidator: PropTypes.bool,
        contentBoxStyle: PropTypes.object,
        appTourKey: PropTypes.string,
        disabled: PropTypes.bool,
        prefix: PropTypes.string,
        onFocus: PropTypes.func,
        showEmptyIndicator: PropTypes.bool,
        onBlur: PropTypes.func,
        parentComp: PropTypes.any,
        value: PropTypes.string
    };

    static defaultProps = {
        title: '',
        useMaskedInput: false,
        onValueCompleted: () => {},
        imageColor: GLOBAL.COLOR.TEXT_GRAY,
        showError: false,
        showHintButton: false,
        isLoading: false,
        customImage: null,
        placeholder: GLOBAL.COLOR.BASIC.BROWNISH_GREY,
        customImageStyle: { width: 30, height: 20, marginTop: 2 },
        isSingleInput: false,
        containerStyle: {},
        showPasswordValidator: false,
        contentBoxStyle: {},
        appTourKey: '',
        disabled: false,
        prefix: '',
        onFocus: () => {},
        showEmptyIndicator: false,
        onBlur: () => {},
        parentComp: null
    };
    // endregion

    // region Constructor
    constructor(props)
    {
        super(props);
        this.state = {
            isFocused: false,
            placeholderWidth: 0
        };

        this.outputValue = '';
    }
    // endregion

    // region Function - Get Output Value
    getOutputValue()
    {
        if (!this.props.useMaskedInput) return('');
        return(this.outputValue);
    }
    // endregion

    // region Function - Focus to Text Input
    focus()
    {
        this.inputText?.focus();
    }
    // endregion

    // region Function - Focus to Text Input
    blur()
    {
        this.inputText?.blur();
    }
    // endregion

    // region Render Hint Button
    renderHintButton()
    {
        if (this.props.showHintButton)
        {
            return(
                this.props.isLoading ?
                    <ActivityIndicator color={this.props.hintButtonColor}/>
                    :
                    <TouchableOpacity
                        onPress={this.props.hintButtonOnPress}
                        style={{ marginLeft: 5 }}>
                        {/* Image */}
                        <Icon
                            name={this.props.hintButtonImage}
                            size={20}
                            color={this.props.hintButtonColor || GLOBAL.COLOR.TEXT_GRAY}
                            style={{ opacity: this.props.hintButtonOpacity }}
                        />
                    </TouchableOpacity>
            );
        }
        else return(<View/>);
    }
    // endregion

    // region Render Image/Title
    renderImageOrTitle()
    {
        return(
            this.props.prefix.trim() ?
                <Text style={{ color: this.props.textInputStyle?.color || GLOBAL.COLOR.TEXT_LIGHT_GRAY, marginRight: 4 }}>
                    {this.props.prefix.trim()}
                </Text>
                :
                <TouchableOpacity onPress={() => Alert.alert(GLOBAL.APP_NAME, this.props.errorMessage)}>
                    {
                        this.props.imageName ?
                            <Icon
                                name={this.props.imageName}
                                size={22}
                                color={this.props.showError ? GLOBAL.COLOR.GOOGLE : (this.props.imageColor || GLOBAL.COLOR.TEXT_GRAY)}
                            />
                            :
                            (
                                this.props.customImage ?
                                    <Image
                                        source={this.props.customImage}
                                        style={this.props.customImageStyle}
                                        resizeMode={'contain'}
                                    />
                                    :
                                    (
                                        this.props.title.trim() ?
                                            <Text style={parsedTextStyle({ color: 'black', marginRight: 16, width: 84, fontSize: 14 })}>
                                                {this.props.title}
                                            </Text>
                                            :
                                            null
                                    )
                            )
                    }
                </TouchableOpacity>
        );
    }
    // endregion

    getPropTextInputStyle()
    {
        let propTextInputStyle = {};
        if (Array.isArray(this.props.textInputStyle))
        {
            this.props.textInputStyle.forEach((obj) => Object.assign(propTextInputStyle, obj));
        }
        else if (isObject(this.props.textInputStyle))
        {
            propTextInputStyle = this.props.textInputStyle;
        }

        return propTextInputStyle;
    }

    // region Render Main Text Input
    renderMainTextInput()
    {
        let textInputStyle = parsedTextStyle(Object.assign(
            {
                fontWeight: '450',
                color: this.props.showError ? GLOBAL.COLOR.BASIC.RED : GLOBAL.COLOR.BASIC.NEUTRAL_BLACK,
                flex: 1,
                marginLeft: (this.props.imageName || this.props.customImage) ? 10 : 0,
                marginRight: this.props.showHintButton ? 5 : 0, fontSize: this.props.fontSize || 14,
                backgroundColor: (this.props.showEmptyIndicator && !this.props.value.trim()) ? 'rgba(237, 59, 59, 0.3)' : 'transparent'
            },
            this.getPropTextInputStyle()
        ));

        return(
            this.props.useMaskedInput ?
                <TextInputMask
                    ref={(input) => this.inputText = input}
                    style={textInputStyle}
                    defaultValue={this.props.value}
                    placeholder={'(___) ___-____'}
                    returnKeyType={'next'}
                    autoCorrect={false}
                    keyboardType={'number-pad'}
                    placeholderTextColor={GLOBAL.COLOR.BASIC.NEUTRAL_LIGHT_GREY}
                    underlineColorAndroid="transparent"
                    onChangeText={(formatted, raw) => this.outputValue = raw}
                    mask={"([000]) [000]-[0000]"}
                    blurOnSubmit={true}
                    onBlur={this.props.onBlur}
                    onSubmitEditing={this.props.onSubmitEditing}
                />
                :
                <TextInput
                    ref={(input) => this.inputText = input}
                    style={textInputStyle}
                    value={this.props.value}
                    editable={this.props.editable}
                    secureTextEntry={this.props.secureTextEntry}
                    autoCorrect={false}
                    autoCapitalize={this.props.autoCapitalize}
                    returnKeyType={this.props.returnKeyType}
                    onSubmitEditing={this.props.onSubmitEditing}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={this.props.placeholderTextColor || GLOBAL.COLOR.BASIC.NEUTRAL_LIGHT_GREY}
                    underlineColorAndroid="transparent"
                    maxHeight={200}
                    onChangeText={this.props.onChangeText}
                    blurOnSubmit={this.props.blurOnSubmit || false}
                    onFocus={() => {
                        this.setState({ isFocused: true });
                        this.props.onFocus();
                    }}
                    onBlur={() => this.setState({ isFocused: false })}
                    multiline={this.props.multiline}
                    autoGrow={this.props.multiline}
                    keyboardType={this.props.keyboardType || 'default'}
                />
        );
    }
    // endregion

    // region Render Password Strength
    renderPasswordStrength()
    {
        let passwordStrength = checkPasswordStrength(this.props.value) || 0;

        return(
            (this.props.showPasswordValidator && this.props.value.trim()) ?
                <View
                    onLayout={(event) =>
                    {
                        let textBoxWidth = event.nativeEvent.layout.width;
                        if (!this.state.textBoxWidth) this.setState({ textBoxWidth });
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 8 }}>
                    {/* Placeholder View to Calculate for password progress bar */}
                    <View
                        style={{ opacity: 0, position: 'absolute', left: 0, top: 0 }}
                        onLayout={(event) =>
                        {
                            let placeholderWidth = event.nativeEvent.layout.width;
                            if (!this.state.placeholderWidth) this.setState({ placeholderWidth });
                        }}>
                        <Text>Medium</Text>
                    </View>

                    {/* Password strength - Visual */}
                    <Progress.Bar
                        progress={passwordStrength}
                        borderRadius={8}
                        color={passwordStrength === 1 ? GLOBAL.COLOR.BASIC.GREEN : (passwordStrength === 0.5 ? GLOBAL.COLOR.BASIC.BLUE : (passwordStrength === 0.2 ? GLOBAL.COLOR.BASIC.ORANGE : GLOBAL.COLOR.TEXT_LIGHT_GRAY))}
                        width={this.state.textBoxWidth ? (this.state.textBoxWidth - this.state.placeholderWidth - 12) : 200}
                        height={8}
                    />

                    {/* Password strength - Text */}
                    <Text style={parsedTextStyle({ flex: 1, textAlign: 'right', color: GLOBAL.COLOR.BASIC.NEUTRAL_GREY, fontWeight: '500' })}>
                        {
                            passwordStrength !== 0 ?
                                (
                                    passwordStrength === 0.5 ?
                                        'Medium'
                                        :
                                        (
                                            passwordStrength === 1 ?
                                                'Strong'
                                                :
                                                'Weak'
                                        )
                                )
                                :
                                'Invalid'
                        }
                    </Text>
                </View>
                :
                null
        );
    }
    // endregion

    render()
    {
        let MyView = this.props.onPress ? TouchableOpacity : View;

        return(
            <View style={[{ backgroundColor: 'transparent', width: '100%', opacity: !this.props.disabled ? 1 : 0.5 }, this.props.style]}>
                {/* Main Content View */}
                <DefaultView
                    key={this.props.appTourKey || null}
                    ref={(comp) =>
                    {
                        this.mainView = comp;
                        if (this.props.appTourKey.trim() && this.props.parentComp)
                        {
                            this.props.parentComp[this.props.appTourKey] = comp;
                        }
                    }}>
                    <MyView
                        style={[
                            {
                                width: '100%', backgroundColor: 'transparent',
                                borderWidth: this.state.isFocused ? 2 : 1, borderRadius: 6, borderColor: this.props.showError ? GLOBAL.COLOR.BASIC.RED : (!this.state.isFocused ? GLOBAL.COLOR.BASIC.NEUTRAL_STROKE : GLOBAL.COLOR.BASIC.NEUTRAL_BLACK),
                                paddingHorizontal: 12, flexDirection: 'row', height: 48, alignSelf: 'stretch', alignItems: 'center',
                                marginTop: this.props.isSingleInput ? 0 : 8
                            },
                            Platform.OS === 'ios' ? { paddingBottom: this.props.multiline ? 15 : 12, paddingTop: 12 } : { paddingVertical: 0 },
                            this.props.contentBoxStyle
                        ]}
                        onPress={this.props.onPress}
                        onLongPress={this.props.onLongPress}>

                        {/* Text Box Image */}
                        {this.renderImageOrTitle()}

                        {/* Text Input */}
                        {
                            this.props.onPress || this.props.onLongPress ?
                                <Text style={parsedTextStyle(Object.assign({ fontWeight: '450', flex: 1, marginLeft: (this.props.imageName || this.props.customImage) ? 10 : 0, marginRight: 5, fontSize: 14 }, this.getPropTextInputStyle()))}>
                                    {this.props.value}
                                </Text>
                                :
                                this.renderMainTextInput()
                        }

                        {/* Hint Button */}
                        {this.renderHintButton()}
                    </MyView>

                    {/* Password Strength */}
                    {this.renderPasswordStrength()}
                </DefaultView>
            </View>
        );
    }
}
