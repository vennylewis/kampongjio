import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { Card, CardSection } from '../common';

class OrderDetails extends Component {
    state = {paid : false, collected : false}
    render() {
        const { 
            textStyle,
            titleStyle,
            containerStyle,
            switchStyle,
            cardSectionStyle
        } = styles;

        const jioJoinerNames = 'Adam';
        const orders = 'Maggie Pattaya (X 1)';
        const price = '$6';
        return (
            <View style={containerStyle}>
                <Text style={titleStyle}>{jioJoinerNames}</Text>
                <CardSection>
                    <Text style={[textStyle, { color: '#000000', flex: 10 }]}>{orders}</Text>
                    <Text style={[textStyle, { color: '#000000', flex: 1 }]}>{price}</Text>
                </CardSection>
                <CardSection>
                    <CardSection style={cardSectionStyle}>
                        <Text style={[titleStyle, { fontWeight:'normal' }]}>PAID</Text>
                        <Switch 
                        style={switchStyle}
                        value={this.state.paid} 
                        onValueChange={() => this.setState({ paid: true })}
                        />
                    </CardSection>
                    <CardSection style={cardSectionStyle}>
                        <Text style={[titleStyle, { fontWeight:'normal' }]}>COLLECTED</Text>
                        <Switch 
                        style={switchStyle}
                        value={this.state.collected} 
                        onValueChange={() => this.setState({ collected: true })}
                        />
                    </CardSection>
                </CardSection>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        borderWidth: 1,
        backgroundColor: '#FF7058',
        marginBottom: 5,
    },
    titleStyle: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    textStyle: {
        fontSize: 18,
        color: '#FFFFFF',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 3,
        marginBottom: 3,
    },
    switchStyle: {
        size: 22,
        marginLeft: 5,
        marginRight: 5
    },
    cardSectionStyle: {
        padding: 0
    }
};

export default OrderDetails;