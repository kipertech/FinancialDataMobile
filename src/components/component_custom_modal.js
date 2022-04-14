/*
    Created by Pham Hoang Phat
    phat@launchdeck.org
*/

import React, { PureComponent } from 'react';
import {
    View,
    Platform,
    StatusBar,
    Modal
} from "react-native";
import RNModal from 'react-native-modal';
import PropTypes from 'prop-types';

const GLOBAL = require('../configs/config_global');

export class CustomModal extends PureComponent
{
    static propTypes = {
        visible: PropTypes.bool,
        onDismiss: PropTypes.func,
        onRequestClose: PropTypes.func,
        noPadding: PropTypes.bool
    }

    static defaultProps = {
        visible: false,
        onDismiss: () => {},
        onRequestClose: () => {},
        noPadding: false
    }

    // region MAIN RENDER FUNCTION
    render()
    {
        let isAndroidTablet = (Platform.OS === 'android' && GLOBAL.IS_TABLET);

        const ModalComp = isAndroidTablet ? RNModal : Modal;

        const {
            visible,
            onDismiss,
            onRequestClose,
            noPadding
        } = this.props;

        let modalWidth = isAndroidTablet ? GLOBAL.MAIN.state.windowWidth / 2 : '100%',
            modalPadding = !noPadding ? 24 : 0;

        return(
            <ModalComp
                // iOS Props
                visible={visible}
                onDismiss={onDismiss}
                onRequestClose={onRequestClose}
                animationType={'slide'}
                presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : null}

                // Android Props
                isVisible={visible}
                onBackPress={onRequestClose}
                hideModalContentWhileAnimating={true}
                useNativeDriver={true}
                coverScreen={false}
                propagateSwipe={true}

                // Modal component styles
                style={[{ margin: 0 }, isAndroidTablet && { padding: modalPadding, paddingTop: (noPadding ? 0 : GLOBAL.BAR_HEIGHT) + modalPadding, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'transparent' }]}>
                {/* Status Bar Config */}
                {
                    Platform.OS === 'ios' ?
                        <StatusBar barStyle={GLOBAL.IS_TABLET ? 'dark-content' : 'light-content'}/>
                        :
                        GLOBAL.MAIN.renderStatusBarAndroidModal()
                }

                {/* Content */}
                <View style={[{ flex: 1, width: modalWidth, backgroundColor: 'white' }, isAndroidTablet && { borderRadius: 12, overflow: 'hidden' }]}>
                    {this.props.children}
                </View>
            </ModalComp>
        );
    }
    // endregion
}
