import React from 'react';
import { Image } from 'react-native';
import { MapView } from 'expo';
import PropTypes from 'prop-types';


const CarComponent = ({ coordinates, regNr }) => (
  <MapView.Marker
    coordinate={coordinates}
    title={regNr}
    tracksViewChanges={false}
  >
   <Image
      style={{ width: 20, height: 20 }}
      source={require('./car.png')}
    />
  </MapView.Marker>
);

CarComponent.propTypes = {
  coordinates: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  regNr: PropTypes.string.isRequired,
};

export default CarComponent;
