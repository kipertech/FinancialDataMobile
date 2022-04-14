import React, { Component } from 'react';
import { View } from 'react-native';

export class SubDefaultView extends Component
{
    render()
    {
        return(this.props.children);
    }
}

export default class DefaultView extends Component
{
    render()
    {
        if (this.props.style)
        {
            return(
                <View style={this.props.style}>
                    <SubDefaultView
                        key={this.props.key}
                        ref={this.props.ref}>
                        {this.props.children}
                    </SubDefaultView>
                </View>
            );
        }
        else return(this.props.children);
    }
}
