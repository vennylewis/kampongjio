import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { NavBar } from '../components/common';
import { Actions } from 'react-native-router-flux';
import Ongoing from '../components/Dashboard/Ongoing';
import Previous from '../components/Dashboard/Previous';

class Dashboard extends Component {
    state = { 
        allOrders: {}, 
        orderOne: {}, 
        orderTwo: {}, 
        orderThree: {} 
    };

    render() {
        const {
            containerStyle
        } = styles;

        return (
            <View style={containerStyle}>
                <ScrollView>
                    <Ongoing />
                    <Previous />
                </ScrollView>
                <NavBar />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#2D9B83',
        justifyContent: 'space-between'
    }
}
export default Dashboard;