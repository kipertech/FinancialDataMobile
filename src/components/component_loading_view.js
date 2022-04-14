import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Platform
} from 'react-native';
import Spinner from "react-native-spinkit";
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { BlurView } from "@react-native-community/blur";
import LottieView from "lottie-react-native";

const AnimatableBlurView = Animatable.createAnimatableComponent(BlurView);

import { parsedTextStyle } from '../utils';

const GLOBAL = require('../configs/config_global');

export class LoadingView extends PureComponent
{
    static propTypes = {
        useBlurView: PropTypes.bool,
        isAbsolute: PropTypes.bool,
        circleSize: PropTypes.number,
        description: PropTypes.string,
        style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        useAnimatedLogo: PropTypes.bool,
        customLottie: PropTypes.any,
        customTextStyle: PropTypes.object
    };

    static defaultProps = {
        useBlurView: true,
        isAbsolute: false,
        circleSize: 40,
        description: '',
        style: {},
        useAnimatedLogo: false,
        customTextStyle: {}
    };

    fadeOut()
    {
        return new Promise((resolve) => this.mainView.fadeOut(600).then(() => resolve('Done')));
    }

    render()
    {
        const {
            useBlurView,
            isAbsolute,
            circleSize,
            description,
            style,
            useAnimatedLogo,
            customLottie,
            customTextStyle
        } = this.props;

        const MyView = (useBlurView && Platform.OS === 'ios') ? AnimatableBlurView : Animatable.View;

        return(
            <MyView
                ref={(comp) => this.mainView = comp}
                animation={Platform.OS === 'android' ? null : 'fadeIn'}
                blurType={'xlight'}
                blurAmount={10}
                style={[
                    { alignItems: 'center', justifyContent: 'center' },
                    isAbsolute ?
                        {
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }
                        :
                        { flex: 1 },
                    (!useBlurView || Platform.OS === 'android') && { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                    style
                ]}>
                {/* Loading Indicator */}
                {
                    useAnimatedLogo ?
                        <LottieView
                            source={customLottie?.lottie}
                            imageAssetsFolder={'lotties'}
                            style={customLottie?.style || { width: 120, height: 120 }}
                            resizeMode={customLottie?.resizeMode || 'contain'}
                            loop={true}
                            autoPlay={true}
                        />
                        :
                        <Spinner size={circleSize} type={'Pulse'} color={GLOBAL.COLOR.MAIN}/>
                }

                {/* Description */}
                {
                    description.trim() ?
                        <Text style={parsedTextStyle(Object.assign({ textAlign: 'center', marginTop: useAnimatedLogo ? 0 : 16, marginHorizontal: 48, fontSize: 14, color: GLOBAL.COLOR.BASIC.BLACK_TWO, fontWeight: '500', letterSpacing: 0.2 }, customTextStyle))}>
                            {description}
                        </Text>
                        :
                        <View/>
                }
            </MyView>
        );
    }
}
