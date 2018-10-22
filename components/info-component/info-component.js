import React from 'react';
import { View, TouchableHighlight, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const InfoComponent = ({
  active, type, destinationAddress, pickupAddress, destinationTime, pickupTime, changeAddress,
}) => {
  if (!active) {
    return null;
  }
  let address = destinationAddress;
  let time = destinationTime;
  if (type === 'Pickup') {
    address = pickupAddress;
    time = pickupTime;
  }
  return (
    <View style={styles.infoContainer}>
      <Text
        style={styles.infoText}
        onPress={() => changeAddress(type)}
      >
        <Text style={styles.labelText}>
          {type}:{' '}
        </Text>
        {address}{'\n'}
        <Text style={styles.labelText}>
          Estimated time of {type.toLowerCase()}: {time}
        </Text>
      </Text>

      <TouchableHighlight
        style={styles.button}
        onPress={() => changeAddress(type)}
      >
        <Image
          style={{ width: 30, height: 30 }}
          source={require('./pencil.png')}
        />
      </TouchableHighlight>
    </View>
  );
};

InfoComponent.propTypes = {
  active: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  destinationAddress: PropTypes.string.isRequired,
  pickupAddress: PropTypes.string.isRequired,
  destinationTime: PropTypes.string.isRequired,
  pickupTime: PropTypes.string.isRequired,
  changeAddress: PropTypes.func.isRequired,
};

export default InfoComponent;
