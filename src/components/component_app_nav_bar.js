import React, { PureComponent } from 'react';
import {
    View,
    Text, Image, TouchableOpacity,
} from "react-native";
import PropTypes from 'prop-types';
import GLOBAL from "../configs/config_global";
import FastImage from "react-native-fast-image";
import { parsedTextStyle } from "../utils";
import * as Animatable from "react-native-animatable";

// Navigation
import * as RootNavigation from '../RootNavigation';

import * as ROUTES from '../configs/config_route';

export class AppNavBar extends PureComponent
{
    static propTypes = {
        text: PropTypes.string,
        backgroundColor: PropTypes.string
    }

    static defaultProps = {
        text: 'Title',
        backgroundColor: GLOBAL.COLOR.BACKGROUND_WHITE
    }

    constructor(props)
    {
        super(props);
    }

    render()
    {
        const avatarSize = 36;

        return(
            <Animatable.View
                animation={'fadeInDown'}
                duration={600}
                style={{ width: '100%', backgroundColor: this.props.backgroundColor, paddingTop: GLOBAL.BAR_HEIGHT + 16, paddingHorizontal: 24 }}>
                {/* Top Part */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* App Logo */}
                    <TouchableOpacity onPress={() => RootNavigation.navigate(ROUTES.HOME)}>
                        <Image
                            source={require('../images/logo_main.png')}
                            style={{ width: 24, height: 30 }}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>

                    <View style={{ flex: 1 }}/>

                    {/* User Image */}
                    <TouchableOpacity
                        onPress={() => RootNavigation.push(ROUTES.USER_PROFILE_STACK)}
                        style={{ width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2, overflow: 'hidden' }}>
                        <FastImage
                            source={typeof GLOBAL.DATA.USER.imageURL === 'string' ? { uri: GLOBAL.DATA.USER.imageURL } : GLOBAL.DATA.USER.imageURL}
                            style={{ width: avatarSize, height: avatarSize }}
                            resizeMode={'cover'}
                        />
                    </TouchableOpacity>
                </View>

                {/* Name */}
                <Text style={parsedTextStyle({ fontWeight: 'bold', fontSize: 24, marginTop: 16, color: GLOBAL.COLOR.BASIC.BLACK_TWO })}>
                    {this.props.text}
                </Text>
            </Animatable.View>
        );
    }
}
