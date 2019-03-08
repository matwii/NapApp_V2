import React from 'react';
import {View,  Text, Keyboard} from 'react-native';
import {Input, Button} from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from './styles';

const InputAddressComponent = ({active, type, pickupCoordinates, destinationCoordinates, destinationAddress, cars,
                                   mustGetNewCar, getCoordinates, chooseOnMap, getCar, address, isLoading}) => {
    if (!active) {
        return null;
    }
    let getNewCar = mustGetNewCar;
    let placeholder = 'Where ';
    let adr = destinationAddress;

    if (type === 'Pickup') {
        placeholder += 'from?';
        getNewCar = false;
    } else if (type === 'Destination') {
        placeholder += 'to?';
    }

    function setAddress(newAdr) {
        adr = newAdr;
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Input
                    placeholder={placeholder}
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={{borderBottomColor: 'transparent'}}
                    onSubmitEditing={event => getCoordinates(event.nativeEvent.text, type, pickupCoordinates, destinationCoordinates, destinationAddress, cars) &&
                        getCar(cars, pickupCoordinates, getNewCar)}
                    onChangeText={text => setAddress(text)}
                    value={isLoading ? 'Getting address...' : address}
                    label='Travel from:'
                />
                <Button
                    containerStyle={styles.okButton}
                    title="OK"
                    titleStyle={{color: 'white'}}
                    buttonStyle={{
                        borderColor: "black",
                        elevation: 2
                    }}
                    onPress={() => getCoordinates(adr, type, pickupCoordinates, destinationCoordinates, destinationAddress, cars) &&
                        getCar(cars, pickupCoordinates, getNewCar) &&
                        Keyboard.dismiss()}
                >
                </Button>
            </View>
            <Button
                buttonStyle={styles.loginButtonStyle}
                containerStyle={styles.loginButtonContainerStyle}
                title="Choose destination on map"
                onPress={() => chooseOnMap(type)}
            >
                <Text>Choose {type.toLowerCase()} on map</Text>
            </Button>
        </View>

    );
};

InputAddressComponent.propTypes = {
    active: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    pickupCoordinates: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }).isRequired,
    destinationCoordinates: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }),
    destinationAddress: PropTypes.string.isRequired,
    cars: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        regNr: PropTypes.string,
        coordinates: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
        }),
    })),
    mustGetNewCar: PropTypes.bool.isRequired,
    getCoordinates: PropTypes.func.isRequired,
    chooseOnMap: PropTypes.func.isRequired,
    getCar: PropTypes.func.isRequired,
};

export default InputAddressComponent;
