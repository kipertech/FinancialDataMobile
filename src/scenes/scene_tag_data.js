/*
    Created by Pham Hoang Phat
    phat@launchdeck.org
*/

import React, { Component } from 'react';
import { View, Text } from 'react-native';

const GLOBAL = require('../configs/config_global');

export class SceneTagData extends Component
{
    // region MAIN RENDER FUNCTION
    render()
    {
        const {

        } = this.props;

        return(
            <View style={{ flex: 1, width: '100%', backgroundColor: GLOBAL.COLOR.MAIN, alignItems: 'center', justifyContent: 'center' }}>
                <Text>
                    Tag Data
                </Text>
            </View>
        );
    }
    // endregion
}
