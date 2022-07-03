import React, { PureComponent } from 'react';
import {
    Image,
    Text,
    View
} from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import moment from 'moment';

import { Button, ComponentNavBar } from "../../components";

import { parsedTextStyle, capitalizeFirstLetter } from '../../utils';

import GLOBAL from '../../configs/config_global';
import ROUTES from '../../configs/config_route';

// Navigation
import * as RootNavigation from '../../RootNavigation';

export default class CompanyDetailSheet extends PureComponent
{
    state = {
        companyData: {}
    };

    showSheet = (companyData) => this.setState({ companyData }, () => this.infoSheet.snapToIndex(0));
    closeSheet = () => this.infoSheet.close();

    renderItem(key, title, text, textColor = 'black', bold = false, isLast = false)
    {
        return(
            <View
                key={key}
                style={{
                    alignSelf: 'stretch', paddingVertical: 16, borderBottomWidth: isLast ? 0 : 1, borderColor: GLOBAL.COLOR.DIVIDER,
                    flexDirection: 'row', alignItems: 'center'
                }}>
                <Text style={parsedTextStyle({ fontWeight: 'bold', width: 120 })}>
                    {title}
                </Text>

                <Text style={parsedTextStyle({ fontWeight: bold ? 'bold' : 'normal', color: textColor, lineHeight: 22 })}>
                    {text?.replaceAll('<br>', '\n') || 'N/A'}
                </Text>
            </View>
        );
    }

    render()
    {
        const companyData = this.state.companyData;

        return(
            <BottomSheet
                ref={(comp) => this.infoSheet = comp}
                index={-1}
                enablePanDownToClose={false}
                backdropComponent={BottomSheetBackdrop}
                snapPoints={[GLOBAL.MAIN.state.windowHeight - GLOBAL.BAR_HEIGHT]}
                onChange={(index) => this.setState({ currentSheetIndex: index })}>
                <View style={{ flex: 1 }}>
                    {/* Title */}
                    <ComponentNavBar
                        title={'Company Details'}
                        leftButtonTitle={'Close'}
                        leftButtonOnPress={this.closeSheet}
                        isInsideSheet={true}
                        ignoreTopBarHeight={true}
                    />

                    {/* Content */}
                    <View style={{ flex: 1, width: '100%' }}>
                        {/* Main Scroll Content */}
                        <BottomSheetScrollView
                            style={{ flex: 1, width: '100%' }}
                            contentContainerStyle={{ paddingHorizontal: 24 }}>
                            {this.renderItem('name', 'Name', companyData['name'], GLOBAL.COLOR.BASIC.GREEN_HEX, true)}
                            {this.renderItem('ticker', 'Ticker', companyData['ticker'], GLOBAL.COLOR.ENHANCED.UI_BLUE)}
                            {this.renderItem('category', 'Category', companyData['category'])}
                            {this.renderItem('entityType', 'Type', capitalizeFirstLetter(companyData?.['entityType'] || ''))}
                            {this.renderItem('phone', 'Phone', companyData['phone'])}
                            {this.renderItem('website', 'Website', companyData['website'])}
                            {this.renderItem('fiscalEnd', 'Fiscal Year End', moment(companyData['fiscalYearEnd']?.raw, 'MMDD').format('MMMM D'))}
                            {this.renderItem('cik', 'CIK Code', companyData['cikCode'])}
                            {this.renderItem('sic', 'SIC Code', companyData['sic'])}
                            {this.renderItem('ein', 'EIN Code', companyData['einCode'], 'black', false, true)}
                        </BottomSheetScrollView>

                        {/* Top Gradient */}
                        <Image
                            source={require('../../images/image_gradient_down.png')}
                            style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 20 }}
                        />

                        {/* Bottom Gradient */}
                        <Image
                            source={require('../../images/image_gradient.png')}
                            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 20 }}
                        />
                    </View>


                    {/* Go to Tag Data */}
                    <Button
                        text={'Fetch Financial Data'}
                        backgroundColor={GLOBAL.COLOR.ENHANCED.UI_BLUE}
                        textColor={'white'}
                        style={{ marginHorizontal: 24, marginBottom: GLOBAL.BOTTOM_BAR_HEIGHT + 8, marginTop: 8 }}
                        textStyle={{ fontWeight: 'bold' }}
                        onPress={() => {
                            this.closeSheet();
                            setTimeout(() => RootNavigation.navigate(ROUTES.TAG_DATA, { companyData }), 250);
                        }}
                    />
                </View>
            </BottomSheet>
        );
    }
}
