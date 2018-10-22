import React from 'react';
import { View, TextInput, TouchableHighlight, Text, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const InputAddressComponent = ({
  active,
  type,
  pickupCoordinates,
  destinationCoordinates,
  destinationAddress,
  cars,
  mustGetNewCar,
  getCoordinates,
  chooseOnMap,
  getCar,
}) => {
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
        <TextInput
          placeholder={placeholder}
          style={styles.addressInput}
          onSubmitEditing={event => getCoordinates(event.nativeEvent.text, type, pickupCoordinates, destinationCoordinates, destinationAddress, cars) &&
                          getCar(cars, pickupCoordinates, getNewCar)}
          onChangeText={text => setAddress(text)}
        />
        <TouchableHighlight
          style={styles.okButton}
          onPress={() => getCoordinates(adr, type, pickupCoordinates, destinationCoordinates, destinationAddress, cars) &&
                  getCar(cars, pickupCoordinates, getNewCar) &&
                  Keyboard.dismiss()}
        >
          <Text style={styles.buttonText}>OK</Text>
        </TouchableHighlight>
      </View>
      <TouchableHighlight
        style={styles.longButton}
        onPress={() => chooseOnMap(type)}
      >
        <Text>Choose {type.toLowerCase()} on map</Text>
      </TouchableHighlight>
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
