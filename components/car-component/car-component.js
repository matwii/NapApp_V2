import React from 'react';
import { Platform } from 'react-native';
import { MapView } from 'expo';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';


const CarComponent = ({ coordinates, regNr, booked, bookedRide, id }) => (
  <MapView.Marker
    coordinate={coordinates}
    title={regNr}
    tracksViewChanges={false}
  >
      {bookedRide ?
          <FontAwesome name='car' size={20} color={bookedRide.car_id === id ? '#228B22' : booked === 0 ? 'blue' : 'red'} /> :
          <FontAwesome name='car' size={20} color={booked === 0 ? 'blue' : 'red'} />
      }
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
