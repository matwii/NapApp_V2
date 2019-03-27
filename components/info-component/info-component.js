import React from 'react';
import { View, LayoutAnimation } from 'react-native';
import {ListItem} from'react-native-elements';
import PropTypes from 'prop-types';
import styles from './styles';

const InfoComponent = ({
  active, type, destinationAddress, pickupAddress, destinationTime, pickupTime, changeAddress, key
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
  LayoutAnimation.easeInEaseOut();
  return (
    <View style={styles.list}>
        <ListItem
            key={key}
            title={type}
            leftIcon={{
                name: 'circle',
                type: 'font-awesome',
                color: type==='Pickup' ? 'green' : 'red',
                size: 14
            }}
            rightTitle={address}
            rightSubtitle={'Estimated arrival: ' + time}
            containerStyle={{borderRadius: 10}}
            contentContainerStyle={{flex: 1}}
            rightContentContainerStyle={{flex: 2}}
        />
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
