import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';


const FakeMarkerComponent = ({ active }) => {
  if (active) {
    return (
      <Image
        style={{ width: 30, height: 30 }}
        source={require('./marker.png')}
      />
    );
  }
  return null;
};

FakeMarkerComponent.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default FakeMarkerComponent;
