import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import {Button} from 'react-native-elements'
import PropTypes from 'prop-types';
import styles from './styles';

const RideInfoComponent = ({
  inactive, atPickup, afterPickup, pickupTime, destinationTime, directions, car, continueRide, moveFromPickup, places, updateRide
}) => {
  if (inactive) {
    return null;
  }
  if (afterPickup) {
    return (
      <Text style={styles.infoText}>
        Estimated arrival at destination: {destinationTime}
      </Text>
    );
  }
  if (atPickup) {
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
              onPress={() =>console.log('test')}
          />
        </View>
      </View>
  );
};

RideInfoComponent.propTypes = {
  inactive: PropTypes.bool.isRequired,
  atPickup: PropTypes.bool.isRequired,
  afterPickup: PropTypes.bool.isRequired,
  pickupTime: PropTypes.string,
  destinationTime: PropTypes.string,
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
  places: PropTypes.shape({
    start: PropTypes.shape({
      latitude: PropTypes.Number,
      longitude: PropTypes.Number,
      time: PropTypes.String,
    }),
    pickup: PropTypes.shape({
      latitude: PropTypes.Number,
      longitude: PropTypes.Number,
      time: PropTypes.String,
    }),
    destination: PropTypes.shape({
      latitude: PropTypes.Number,
      longitude: PropTypes.Number,
      time: PropTypes.String,
    }),
  }),
  continueRide: PropTypes.func.isRequired,
  moveFromPickup: PropTypes.func.isRequired,
};

export default RideInfoComponent;
