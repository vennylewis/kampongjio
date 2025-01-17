import React, { Component } from 'react';
import { Text, View, Animated, Keyboard, Dimensions, UIManager } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { BigInput, Button } from '../components/common';
import { db } from '../config';

// const { State: TextInputState } = TextInput;

class JioJoinerOrder extends Component {
    state = { 
        foodChoices: '', 
        price: '', 
        specialRequests: '',
        keyboardHeight: new Animated.Value(0),
    };


    componentWillMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
      }
    
    componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
      }

    keyboardDidShow = (event) => {
        const { height: windowHeight } = Dimensions.get('window');
        const eventKeyboardHeight = event.endCoordinates.height;
        const gap = eventKeyboardHeight;
        // UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
        //     const fieldHeight = height;
        //     const fieldTop = pageY;
        //     const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
        //     if (gap >= 0) {
        //         return;
        //     }
            Animated.timing(this.state.keyboardHeight, {
                duration: 500,
                toValue: gap,
        }).start();
    };
 

    keyboardDidHide = (event) => {
        Animated.timing(this.state.keyboardHeight, {
            duration: 500,
            toValue: 0,
        }).start();
    };
    
    handleSubmit() {
        let postData = {
            foodChoices: this.state.foodChoices,
            joinerName: 'Cheryl', // TODO: at some point, we'll keep track of users. then this will be taken from their account
            foodOrderNo: 9999, // TODO: this should be dynamically generated somehow at some point. consider tracking length of foodOrders array?
            price: '8.80', // TODO: Until price var is fixed, this will have to do
            specialRequests: this.state.specialRequests,
        }

        let foodOrderId = this.props.foodOrderId; // for accessing the array, has to be changed in the future
        let dbLocation = '/allOrders/' + foodOrderId + '/foodOrders/';

        db
            .ref(dbLocation)
            .push(postData)
            .then((success) => {
                console.log('Success Message: ', success) // success callback
                Actions.mainPage(); // TODO: Add some way to confirm that order has been made/switch to dashboard when it's ready
            })
            .catch((error) => {
                console.log('Error Message: ', error) // error callback
            })
    }

    render() {
        const { containerStyle, storeStyle } = styles;
        const store = this.props.order.store;
        const foodOrderId = this.props.foodOrderId;

        console.log('Logging Order ID: ');
        console.log(this.props.foodOrderId);

        // transform: [{translateY: this.state.keyboardHeight}]
        // 
        return(
            <Animated.View style={[containerStyle, { paddingBottom: this.state.keyboardHeight }]}> 
                {/* <Text>{foodOrderId}</Text> */}
                <View>
                    <Text style={storeStyle}>{store}</Text>
                    <BigInput 
                        placeholder="What do I want to order?"
                        label="YOUR ORDER"
                        value={this.state.foodChoices}
                        onChangeText={foodChoices => this.setState({ foodChoices })}
                    /> 
                    <BigInput 
                        placeholder="How much does everything cost?"
                        label="PRICE"
                        value={this.state.price}
                        onChangeText={price => this.setState({ price })}
                        // TODO: typing into this element results in crashing. can we fix this?
                        // TODO: this should be a number input? can we find some other input for this? whatever looks nice
                    /> 
                    <BigInput 
                        placeholder="Any special requests?"
                        label="SPECIAL REQUESTS"
                        value={this.state.specialRequests}
                        onChangeText={specialRequests => this.setState({ specialRequests })}
                    /> 
                </View>
                <Button onPress={() => this.handleSubmit()}>SUBMIT ORDER</Button>
            </Animated.View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#2D9B83',
        justifyContent: 'space-between'
    },
    storeStyle: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 32,
        color: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 50,
        marginRight: 50,
        borderColor: '#FF7058',
        backgroundColor: '#F3A462',

    }
};

export default JioJoinerOrder;