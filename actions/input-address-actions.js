import Polyline from '@mapbox/polyline';
import {
  FETCH_DESTINATION_REQUEST,
  FETCH_DIRECTIONS_SUCCESS,
  FETCH_DESTINATION_ERROR,
  CHOOSE_DESTINATION_ON_MAP,
  FETCH_DIRECTIONS_REQUEST,
  FETCH_PICKUP_REQUEST,
  FETCH_PICKUP_SUCCESS,
  FETCH_PICKUP_ERROR,
} from './action-types';
import { fetchCoordinatesData, fetchAddressData } from '../services/http-requests';
import { getBestCar } from './car-actions';
import API_KEY from '../lib/config';

/* global fetch: false */

export function getPoints(route) {
  let pointArray = [];
  const polyArray = route.legs[0].steps;
  for (let i = 0; i < polyArray.length; i += 1) {
    const points = Polyline.decode(polyArray[i].polyline.points);
    pointArray = pointArray.concat(points);
  }
  const directions = pointArray.map(point => ({
    latitude: point[0],
    longitude: point[1],
  }));
  return directions;
}

export const chooseDestinationOnMap = (type: String) => (
  {
    type: CHOOSE_DESTINATION_ON_MAP,
    payload: { type },
  }
);

const fetchPickupRequest = () => (
  {
    type: FETCH_PICKUP_REQUEST,
    payload: { isLoading: true },
  }
);

const fetchPickupSuccess = (coordinates: Object, address: String) => (
  {
    type: FETCH_PICKUP_SUCCESS,
    payload: { coordinates, address },
  }
);

const fetchPickupError = () => (
  {
    type: FETCH_PICKUP_ERROR,
    payload: { error: true },
  }
);

const fetchDestinationRequest = () => (
  {
    type: FETCH_DESTINATION_REQUEST,
    payload: { isLoading: true },
  }
);

const fetchDestinationError = () => (
  {
    type: FETCH_DESTINATION_ERROR,
    payload: { error: true },
  }
);

const fetchDirectionsRequest = () => (
  {
    type: FETCH_DIRECTIONS_REQUEST,
    payload: { isLoading: true },
  }
);

const fetchDirectionsSuccess =
  (coordinates: Object, address: Object, directions: Array, duration: Number, bounds: Object) => (
    {
      type: FETCH_DIRECTIONS_SUCCESS,
      payload: {
        coordinates, address, directions, duration, bounds,
      },
    }
  );

export function fetchDirections(startCoordinates: Object, endCoordinates: Object, address: String) {
  return function (dispatch) {
    dispatch(fetchDirectionsRequest());
    const start = `${startCoordinates.latitude},${startCoordinates.longitude}`;
    const end = `${endCoordinates.latitude},${endCoordinates.longitude}`;
    return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&key=${API_KEY}`)
      .then(
        response => response.json(),
        error => console.log('error', error),
      )
      .then((myJson) => {
        const dir = getPoints(myJson.routes[0]);
        const duration = myJson.routes[0].legs[0].duration.value;
        const bounds = myJson.routes[0].bounds;
        console.log(bounds);
        dispatch(fetchDirectionsSuccess(endCoordinates, address, dir, duration, bounds));
      });
  };
}

export const fetchCoordinates = (
  address: String,
  type: String,
  startCoordinates: Object,
  destinationCoordinates: Object,
  destinationAddress: String,
  cars: Array,
) => (
  (dispatch: Function) => {
    if (type === 'Pickup') {
      dispatch(fetchPickupRequest());
      return fetchCoordinatesData(address)
        .then((pickup) => {
          dispatch(getBestCar(cars, pickup[0], true));
          dispatch(fetchPickupSuccess(pickup[0], pickup[1]));
          dispatch(fetchDirections(pickup[0], destinationCoordinates, destinationAddress));
        })
        .catch(() => dispatch(fetchPickupError()));
    } else if (type === 'Destination') {
      dispatch(fetchDestinationRequest());
      return fetchCoordinatesData(address)
        .then((destination) => {
          dispatch(fetchDirections(startCoordinates, destination[0], destination[1]));
        })
        .catch(() => fetchDestinationError());
    }
    return null;
  }
);

export const fetchAddress = (
  coordinates: Object,
  type: String,
  startCoordinates: Object,
  destinationCoordinates: Object,
  destinationAddress: String,
  cars: Array,
) => (
  (dispatch: Function) => {
    if (type === 'Pickup') {
      dispatch(fetchPickupRequest());
      return fetchAddressData(coordinates)
        .then((pickup) => {
          dispatch(getBestCar(cars, coordinates, true));
          dispatch(fetchPickupSuccess(coordinates, pickup));
          dispatch(fetchDirections(coordinates, destinationCoordinates, destinationAddress));
        })
        .catch(() => dispatch(fetchPickupError()));
    } else if (type === 'Destination') {
      dispatch(fetchDestinationRequest());
      return fetchAddressData(coordinates)
        .then((destination) => {
          dispatch(fetchDirections(startCoordinates, coordinates, destination));
        })
        .catch(() => dispatch(fetchDestinationError()));
    }
    return null;
  }
);
