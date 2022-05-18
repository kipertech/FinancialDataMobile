/*
    Created by Pham Hoang Phat
    phat@launchdeck.org
*/

import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import { ComponentNavBar } from "../../components";

import { parsedTextStyle } from "../../utils";

const GLOBAL = require('../../configs/config_global');

export class SceneTagData extends Component
{
    // region Props
    static propTypes = {
        companyData: PropTypes.object
    };

    static defaultProps = {
        companyData: {}
    };
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
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 64 }}>
                    <Text style={parsedTextStyle({ fontWeight: 'bold', fontSize: 20, textAlign: 'center' })}>
                        Company's financial data will appear here
                    </Text>
                </View>
            </View>
        );
    }
    // endregion
}
