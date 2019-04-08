import React from 'react';
import { Platform } from 'react-native';
import { MapView } from 'expo';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';


const CarComponent = ({ coordinates, regNr }) => (
  <MapView.Marker
    coordinate={coordinates}
    title={regNr}
    tracksViewChanges={false}
  >
    <Ionicons name={Platform.OS === 'ios' ? 'ios-car' : 'md-car'} size={32} color="blue" />
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
