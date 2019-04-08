import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import {Button} from 'react-native-elements'
import PropTypes from 'prop-types';
import styles from './styles';

const BookCarComponent = ({active, directions, car, cancelRide, bookRide, driveCar, places}) => {
    if (!active) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Button
        containerStyle={styles.buttonContainerStyle}
        buttonStyle={styles.cancelButtonStyle}
        titleStyle={styles.cancelButtonTitleStyle}
        onPress={() => cancelRide(car.id)}
        title='CANCEL'
      >
      </Button>
      <Button
        containerStyle={styles.buttonContainerStyle}
        buttonStyle={styles.bookButtonStyle}
        titleStyle={styles.bookButtonTitleStyle}
        onPress={() => bookRide(car, places)}
        title='BOOK CAR'
      >
      </Button>
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
