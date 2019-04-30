import React from 'react';
import {Text, View, TouchableHighlight, LayoutAnimation, Platform} from 'react-native';
import {Button} from 'react-native-elements'
import PropTypes from 'prop-types';
import styles from './styles';

const RideInfoComponent = ({
                               inactive, atPickup, afterPickup, pickupTime, destinationTime, directions, car, continueRide, moveFromPickup, places, updateRide, bookedRide
                           }) => {
    if (inactive) {
        return null;
    }
    if (bookedRide.status_id === 2) {
        Platform.OS === 'ios' && LayoutAnimation.easeInEaseOut();
        return (
            <View>
                <Text style={styles.infoText}>
                    Estimated arrival at destination: {destinationTime}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button
                        buttonStyle={styles.loginButtonStyle}
                        containerStyle={styles.loginButtonContainerStyle}
                        title={'AT DESTINATION'}
                        onPress={() => updateRide(3)}
                        titleStyle={styles.loginTitleStyle}
                    />
                    <Button
                        containerStyle={styles.loginButtonContainerStyle}
                        buttonStyle={styles.cancelButtonStyle}
                        titleStyle={styles.cancelButtonTitleStyle}
                        title={'CANCEL RIDE'}
                        onPress={() => updateRide(4)}
                    />
                </View>
            </View>
        );
    }
    if (atPickup) {
        Platform.OS === 'ios' && LayoutAnimation.easeInEaseOut();
        return (
            <View>
                <Text style={styles.infoText}>
                    Your car is waiting outside!{'\n'}
                    Estimated arrival at destination: {destinationTime}
                </Text>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => moveFromPickup() &&
                        continueRide(directions, car, places)}
                >
                    <Text style={styles.buttonText}>Continue ride</Text>
                </TouchableHighlight>
            </View>
        );
    }
    Platform.OS === 'ios' && LayoutAnimation.easeInEaseOut();
    return (
        <View>
            <Text style={styles.infoText}>
                Estimated pickup time: {pickupTime}{'\n'}
                Estimated arrival at destination: {destinationTime}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button
                    buttonStyle={styles.loginButtonStyle}
                    containerStyle={styles.loginButtonContainerStyle}
                    title={'CAR IS HERE'}
                    onPress={() => updateRide(2)}
                    titleStyle={styles.loginTitleStyle}
                />
                <Button
                    containerStyle={styles.loginButtonContainerStyle}
                    buttonStyle={styles.cancelButtonStyle}
                    titleStyle={styles.cancelButtonTitleStyle}
                    title={'CANCEL RIDE'}
                    onPress={() => updateRide(4)}
                />
            </View>
        </View>
    );
};

export default RideInfoComponent;
