import React from 'react';
import { MapView } from 'expo';
import PropTypes from 'prop-types';


const DirectionsComponent = ({
  active, directions,
}) => {
  if (!active) {
    return null;
  }
  return (
    <MapView.Polyline
      coordinates={directions}
      strokeWidth={2}
      strokeColor="red"
    />
  );
};

DirectionsComponent.propTypes = {
  active: PropTypes.bool.isRequired,
  directions: PropTypes.arrayOf(PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  })).isRequired,
};

export default DirectionsComponent;
