import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const ButtonComponent = ({
  active,
  type,
  coordinates,
  pickupCoordinates,
  destinationCoordinates,
  destinationAddress,
  cars,
  mustGetNewCar,
  getAddress,
  getCar,
}) => {
  if (!active) {
    return null;
  }

  let getNewCar = mustGetNewCar;
  if (type === 'Pickup') {
    getNewCar = false;
  }

  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() => getAddress(coordinates, type, pickupCoordinates, destinationCoordinates, destinationAddress, cars) &&
              getCar(cars, pickupCoordinates, getNewCar)}
    >
      <Text style={styles.buttonText}>OK!</Text>
    </TouchableHighlight>
  );
};

ButtonComponent.propTypes = {
  active: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  coordinates: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
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
  getAddress: PropTypes.func.isRequired,
  getCar: PropTypes.func.isRequired,
};

export default ButtonComponent;
