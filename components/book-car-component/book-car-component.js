import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const BookCarComponent = ({
  active, directions, car, cancelRide, bookRide, driveCar
}) => {
  if (!active) {
    return null;
  }
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        onPress={() => cancelRide()}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => bookRide() &&
                driveCar(directions, car)}
      >
        <Text style={styles.buttonText}>Book car</Text>
      </TouchableHighlight>
    </View>
  );
};

BookCarComponent.propTypes = {
  active: PropTypes.bool.isRequired,
  directions: PropTypes.arrayOf(PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  })).isRequired,
  car: PropTypes.shape({
    id: PropTypes.number,
    regNr: PropTypes.string,
    coordinates: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }),
  cancelRide: PropTypes.func.isRequired,
  bookRide: PropTypes.func.isRequired,
  driveCar: PropTypes.func.isRequired,
};

export default BookCarComponent;
