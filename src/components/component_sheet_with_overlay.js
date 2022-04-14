import React, { PureComponent } from 'react';
import { View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import { SheetOverlay } from './component_overlay';
import { ComponentNavBar } from './component_nav_bar';

const GLOBAL = require('../configs/config_global');

export class BottomSheetWithOverlay extends PureComponent
{
    // region Props
    static propTypes = {
        title: PropTypes.string,
        defaultSheetHeight: PropTypes.number,
        sheetMaxHeight: PropTypes.number,
        showNavBar: PropTypes.bool,
        sheetStyle: PropTypes.any,
        disableDrag: PropTypes.bool,
        disableOverlayClose: PropTypes.bool
    };

    static defaultProps = {
        title: 'Sheet',
        defaultSheetHeight: Dimensions.get('window').height / 2,
        sheetMaxHeight: 0,
        showNavBar: true,
        sheetStyle: {},
        disableDrag: false,
        disableOverlayClose: false
    };
    // endregion

    // region Constructor
    constructor(props)
    {
        super(props);
    }

    state = {
        sheetShown: false
    };

    overlayAnimation = new Animated.Value(1);
    sheetHeight = 56 /* Nav Bar Height */ + GLOBAL.BOTTOM_BAR_HEIGHT + this.props.defaultSheetHeight;
    sheetMaxHeight = this.props.sheetMaxHeight || (Dimensions.get('window').height - GLOBAL.BAR_HEIGHT);
    // endregion

    // region Function - Hide Modal
    hideSheet = () => this.bottomSheet.snapTo(0);
    showSheet = () => this.bottomSheet.snapTo(1);
    // endregion

    // region MAIN RENDER FUNCTION
    render()
    {
        return(
            <View
                pointerEvents={'box-none'}
                style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, zIndex: 100 }}>
                {/* Sheet Overlay */}
                <SheetOverlay
                    isSheetActive={this.state.sheetShown}
                    animationValue={this.overlayAnimation}
                    onOverlayPressed={this.props.disableOverlayClose ? () => {} : () => this.bottomSheet.snapTo(0)}
                />

                {/* Sheet */}
                <BottomSheet
                    ref={(comp) => this.bottomSheet = comp}
                    enabledGestureInteraction={!this.props.disableDrag}
                    snapPoints={[0, this.sheetHeight, this.sheetMaxHeight]}
                    initialSnap={0}
                    borderRadius={16}
                    enabledInnerScrolling={false}
                    overdragResistanceFactor={10}
                    callbackNode={this.overlayAnimation}
                    onOpenStart={() => this.setState({ sheetShown: true })}
                    onCloseEnd={() => this.setState({ sheetShown: false })}
                    renderContent={() => {
                        return(
                            <View
                                pointerEvents={'box-none'}
                                style={[
                                    { width: '100%', height: this.sheetMaxHeight, backgroundColor: 'white', overflow: 'hidden' },
                                    GLOBAL.IS_TABLET && { width: '50%', alignSelf: 'center' },
                                    this.props.sheetStyle
                                ]}>
                                {/* Nav Bar */}
                                {
                                    this.props.showNavBar &&
                                    <ComponentNavBar
                                        title={this.props.title}
                                        horizontalSpacing={16}
                                        ignoreTopBarHeight={true}
                                    />
                                }

                                {/* Content */}
                                {this.props.children}
                            </View>
                        );
                    }}
                />
            </View>
        );
    }
    // endregion
}
