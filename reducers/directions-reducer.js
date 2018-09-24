import {
  FETCH_DIRECTIONS_SUCCESS,
  FETCH_BEST_CAR_SUCCESS,
  FETCH_ADDRESS_SUCCESS,
  FETCH_PICKUP_SUCCESS,
  CANCEL_RIDE,
  CAR_POSITION_SET,
  AT_PICKUP,
  AFTER_PICKUP,
} from '../actions/action-types';

const initialState = {
  routeToPickup: [],
  timeToPickup: 0,
  pickupCoordinates: {
    latitude: 63,
    longitude: 10,
  },
  pickupAddress: '',
  pickupChanged: false,
  atPickup: false,
  afterPickup: false,
  routeToDestination: [],
  timeToDestination: 0,
  destinationCoordinates: null,
  destinationAddress: '',
  destinationBounds: null,
  startCoordinates: null,
};

const directionsReducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case FETCH_DIRECTIONS_SUCCESS:
      return {
        ...state,
        routeToDestination: action.payload.directions,
        timeToDestination: action.payload.duration,
        destinationAddress: action.payload.address,
        destinationCoordinates: action.payload.coordinates,
        destinationBounds: action.payload.bounds,
        afterPickup: false,
      };
    case FETCH_BEST_CAR_SUCCESS:
      return {
        ...state,
        routeToPickup: action.payload.directions,
        timeToPickup: action.payload.duration,
        pickupChanged: false,
        pickupBounds: action.payload.bounds,
        startCoordinates: action.payload.car.coordinate,
      };
    case FETCH_ADDRESS_SUCCESS:
      return {
        ...state,
        pickupCoordinates: action.payload.coordinates,
        pickupAddress: action.payload.address,
        pickupChanged: true,
      };
    case FETCH_PICKUP_SUCCESS:
      return {
        ...state,
        pickupCoordinates: action.payload.coordinates,
        pickupAddress: action.payload.address,
        pickupChanged: true,
      };
    case CANCEL_RIDE:
      return {
        ...state,
        routeToDestination: [],
        timeToDestination: 0,
        destinationCoordinates: null,
        destinationAddress: '',
      };
    case CAR_POSITION_SET:
      return {
        ...state,
        routeToDestination: [],
        timeToDestination: 0,
        destinationCoordinates: null,
        destinationAddress: '',
        pickupChanged: true,
      };
    case AT_PICKUP:
      return {
        ...state,
        atPickup: true,
      };
    case AFTER_PICKUP:
      return {
        ...state,
        atPickup: false,
        afterPickup: true,
      };
    default:
      return state;
  }
};

export default directionsReducer;
