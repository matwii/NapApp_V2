import { FETCH_BEST_CAR_REQUEST, FETCH_BEST_CAR_SUCCESS, FETCH_BEST_CAR_ERROR, CAR_POSITION_SET, AT_PICKUP, AFTER_PICKUP } from './action-types';
// import API_KEY from '../lib/config';
import { fetchBestCar } from '../services/http-requests';
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

export const getBestCar = (available: Array, pickup: Object, mustGetNewCar: Boolean) => (
  async (dispatch, getState)  => {
    if (mustGetNewCar) {
      dispatch(fetchBestCarRequest());
      try {
          const car = await fetchBestCar(available, pickup);
          await dispatch(fetchBestCarSuccess(car[0], car[1], car[2], car[3]))
      } catch (e) {
          dispatch(fetchBestCarError())
      }
    }
    return null;
  }
);
