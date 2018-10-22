import { FETCH_BEST_CAR_REQUEST, FETCH_BEST_CAR_SUCCESS, FETCH_BEST_CAR_ERROR, CAR_POSITION_SET, AT_PICKUP, AFTER_PICKUP } from './action-types';
// import API_KEY from '../lib/config';
import { fetchBestCar, setCarBooking } from '../services/http-requests';
import { fetchCars } from './map-actions';

const fetchBestCarRequest = () => (
  {
    type: FETCH_BEST_CAR_REQUEST,
    payload: { isLoading: true },
  }
);

const fetchBestCarSuccess = (car: Object, directions: Array, duration: Number, bounds: Object) => (
  {
    type: FETCH_BEST_CAR_SUCCESS,
    payload: {
      car, directions, duration, bounds,
    },
  }
);

const fetchBestCarError = () => (
  {
    type: FETCH_BEST_CAR_ERROR,
    payload: { error: true },
  }
);

const carPositionSet = () => (
  {
    type: CAR_POSITION_SET,
    payload: {},
  }
);

const atPickup = () => (
  {
    type: AT_PICKUP,
    payload: {},
  }
);

export const afterPickup = () => (
  {
    type: AFTER_PICKUP,
    payload: {},
  }
);


// dette funker ikke
// export const afterPickup = () => (
//   (dispatch: Function) => {
//     console.log('her');
//     dispatch(moveFromPickup());
//   }
// );


export const getBestCar = (available: Array, pickup: Object, mustGetNewCar: Boolean) => (
  (dispatch: Function) => {
    if (mustGetNewCar) {
      dispatch(fetchBestCarRequest());
      return fetchBestCar(available, pickup)
        .then(car => dispatch(fetchBestCarSuccess(car[0], car[1], car[2], car[3])))
        .catch(() => dispatch(fetchBestCarError()));
    }
    return null;
  }
);

export const setCarPosition = (car: Object, booked: Number) => (
  (dispatch: Function) => {
    if (booked === 0) {
      setCarBooking(booked, car)
        .then(() => dispatch(carPositionSet()))
        .then(() => dispatch(fetchCars()));
    } else {
      setCarBooking(booked, car)
        .then(() => dispatch(atPickup()));
    }
  }


);
