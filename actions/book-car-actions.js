import { CANCEL_RIDE, BOOK_RIDE, MOVE_CAR, RIDE_ADDED } from './action-types';
import { setCarPosition } from './car-actions';
import { addRide } from '../services/http-requests';

export const cancelRide = () => (
  {
    type: CANCEL_RIDE,
    payload: {},
  }
);

export const bookRide = () => (
  {
    type: BOOK_RIDE,
    payload: {},
  }
);

const moveCar = (car: Object) => (
  {
    type: MOVE_CAR,
    payload: { car },
  }
);

const rideAdded = () => (
  {
    type: RIDE_ADDED,
    payload: {},
  }
);


const addRideToDatabase = (car: Object, places: Object) => (
  (dispatch: Function) => {
    addRide(car, places)
      .then(() => dispatch(rideAdded()));
  }
);

export function driveCar(directions: Array, car: Object, i: Number, type: String, places: Object) {
  return (dispatch: Function) => {
    if (directions.length === 0) {
      if (type === 'Destination') {
        dispatch(addRideToDatabase(car, places));
        dispatch(setCarPosition(car, 0));
      } else {
        dispatch(setCarPosition(car, 1));
      }
      return;
    }
    const dir = [...directions];
    const next = dir.shift();

    let newi = i;
    setTimeout(() => {
      const newCar = {
        id: car.id,
        coordinate: {
          latitude: next.latitude,
          longitude: next.longitude,
        },
        regNr: car.regNr,
      };
      dispatch(moveCar(newCar));
      dispatch(driveCar(dir, newCar, newi += 1, type, places));
    }, 200);
  };
}
