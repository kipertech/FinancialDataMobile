/*
    Created by Pham Hoang Phat
    phat@launchdeck.org
*/

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    FlatList,
    TouchableOpacity
} from "react-native";
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { parsedTextStyle, showAppError } from "../utils";
import { LoadingView, TextBox } from "../components";
import { searchCompany } from "../apis";

const GLOBAL = require('../configs/config_global');

export class SceneCompanySearch extends Component
{
    // regin Constructor
    constructor(props)
    {
        super(props);
        this.state = {
            isLoading: false,
            companyList: [],
            searchText: '',

            typing: false,
            typingTimeout: null,

            currentSheetIndex: -1
        };
    }
    // endregion

    // region Function - Fetch Companies
    fetchCompany(searchText = '')
    {
        Keyboard.dismiss();
        this.setState({ isLoading: true, searchText, typing: false });
        searchCompany(searchText)
            .then((result) => {
                this.setState({
                    isLoading: false,
                    companyList: result.data
                });
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                showAppError(error);
            });
    }
    // endregion

    // region Render Search Area
    renderSearchArea()
    {
        return(
            <View style={{ width: '100%', padding: 24, paddingBottom: 8, alignItems: 'center' }}>
                <Text style={parsedTextStyle({ fontWeight: 'bold', color: GLOBAL.COLOR.ENHANCED.UI_BLUE, marginBottom: 8 })}>
                    Company Search
                </Text>

                <TextBox
                    ref={(comp) => this.txtSearch = comp}
                    placeholder={'Type here to search'}
                    disabled={this.state.isLoading}
                    text={this.state.searchText}
                    onChangeText={(text) => {
                        const self = this;
                        if (self.state.typingTimeout)
                        {
                            clearTimeout(self.state.typingTimeout);
                        }

                        if (!text.trim())
                        {
                            self.setState({ searchText: '', companyList: [], typing: false });
                            return;
                        }

                        self.setState({
                            searchText: text,
                            typing: true,
                            typingTimeout: setTimeout(() => this.fetchCompany(text), 1000)
                        });
                    }}
                    onSubmitEditing={() =>
                    {
                        if (this.state.typingTimeout) clearTimeout(this.state.typingTimeout);
                        this.fetchCompany(this.state.searchText);
                    }}
                />
            </View>
        );
    }
    // endregion

    // region Render Company List
    renderCompanyList()
    {
        return(
            <View style={{ flex: 1, width: '100%' }}>
                {/* Total Result Text */}
                {
                    this.state.companyList.length > 0 &&
                    <Text style={parsedTextStyle({ color: GLOBAL.COLOR.ENHANCED.UI_GREEN, marginTop: 16, marginHorizontal: 24, textAlign: 'center' })}>
                        Found {this.state.companyList.length} result
                    </Text>
                }

                {/* Main Content */}
                <View style={{ flex: 1, width: '100%', marginTop: 8 }}>
                    {/* List */}
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.companyList}
                        contentContainerStyle={{ paddingBottom: GLOBAL.BOTTOM_BAR_HEIGHT + 48 }}
                        ItemSeparatorComponent={() => <View style={{ alignSelf: 'stretch', marginHorizontal: 24, height: 1, backgroundColor: GLOBAL.COLOR.DIVIDER }}/>}
                        renderItem={({ item, index }) => {
                            return(
                                <TouchableOpacity
                                    onPress={() => this.infoSheet.snapToIndex(0)}
                                    style={{ alignSelf: 'stretch', paddingHorizontal: 28, paddingVertical: 16 }}>
                                    <Text style={parsedTextStyle({ fontWeight: 'bold', fontSize: 16 })}>
                                        {item.name}
                                    </Text>

                                    <Text style={parsedTextStyle({ marginTop: 8, color: GLOBAL.COLOR.ENHANCED.UI_BLUE })}>
                                        {item.ticker}
                                    </Text>

                                    <Text style={parsedTextStyle({ marginTop: 8, letterSpacing: 1.2, color: GLOBAL.COLOR.TEXT_GRAY })}>
                                        CIK: {item.cikCode}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                    />

                    {/* Top Gradient */}
                    <Image
                        source={require('../images/image_gradient_down.png')}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 20 }}
                    />
                </View>
            </View>
        );
    }
    // endregion

    // region Render Company Info Sheet
    renderCompanyInfoSheet()
    {
        return(
            <BottomSheet
                ref={(comp) => this.infoSheet = comp}
                index={-1}
                enablePanDownToClose={true}
                backdropComponent={BottomSheetBackdrop}
                snapPoints={['75%']}
                onChange={(index) => this.setState({ currentSheetIndex: index })}>
                <View style={{ flex: 1, padding: 24 }}>
                    <Text>Awesome 🎉</Text>
                </View>
            </BottomSheet>
        );
    }
    // endregion

    // region MAIN RENDER FUNCTION
    render()
    {
        const {

        } = this.props;

        return(
            <View style={{ flex: 1, width: '100%', backgroundColor: 'white', paddingTop: GLOBAL.BAR_HEIGHT }}>
                {/* Search Area */}
                {this.renderSearchArea()}

                {/* Result Area */}
                {
                    this.state.isLoading ?
                        <LoadingView isAbsolute={false} useBlurView={false}/>
                        :
                        (
                            this.state.companyList.length === 0 ?
                                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={parsedTextStyle({ color: GLOBAL.COLOR.TEXT_LIGHT_GRAY })}>
                                            {
                                                this.state.searchText?.trim() ?
                                                    (
                                                        this.state.typing ?
                                                            'Waiting for you to finish typing...'
                                                            :
                                                            `No result found for ${this.state.searchText}`
                                                    )
                                                    :
                                                    'Start searching for company above'
                                            }
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                :
                                this.renderCompanyList()
                        )
                }

                {/* Info Sheet */}
                {this.renderCompanyInfoSheet()}
            </View>
        );
    }
    // endregion
}
