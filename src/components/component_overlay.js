/*
    Created by Pham Hoang Phat
    phat@launchdeck.org
*/

import React, { Component } from 'react';
import {
    View,
    TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';

export class SheetOverlay extends Component
{
    // region Props
    static propTypes = {
        animationValue: PropTypes.any,
        onOverlayPressed: PropTypes.func,
        isSheetActive: PropTypes.bool
    };

    static defaultProps = {
        animationValue: new Animated.Value(1),
        onOverlayPressed: () => {},
        isSheetActive: false
    };
    // endregion

    // region MAIN RENDER FUNCTION
    render()
    {
        const animatedShadowOpacity = Animated.interpolateNode(this.props.animationValue, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            useNativeDriver: false
        });

        return(
            <Animated.View
                pointerEvents={this.props.isSheetActive ? 'auto' : 'none'}
                style={[
                    { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'black' },
                    { opacity: animatedShadowOpacity }
                ]}>
                <TouchableWithoutFeedback onPress={this.props.onOverlayPressed}>
                    <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}/>
                </TouchableWithoutFeedback>
            </Animated.View>
        );
    }
    // endregion
}
