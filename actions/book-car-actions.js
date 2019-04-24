import {CANCEL_RIDE, BOOK_RIDE, MOVE_CAR, RIDE_ADDED} from './action-types';
import {setCarPosition} from './car-actions';
import {addRide, fetchBestCar} from '../services/http-requests';

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
        payload: {car},
    }
);

const rideAdded = () => (
    {
        type: RIDE_ADDED,
        payload: {},
    }
);

/**
 * uses the websocket connection to store the ride in DB.
 * @param car
 * @param places
 * @returns {Function}
 */
export const addRideToDatabase = (car: Object, places: Object) => (
    async (dispatch, getState) => {
        const {socket, token} = await getState().authentication;
        const req = {
            car_id: car.id,
            token: token,   // fix when handling login
            start_latitude: places.startCoordinates.latitude,
            start_longitude: places.startCoordinates.longitude,
            start_time: (Date.now() / 1000) - places.startTime,
            via_latitude: places.pickupCoordinates.latitude,
            via_longitude: places.pickupCoordinates.longitude,
            via_time: (Date.now() / 1000) - places.pickupTime,
            end_latitude: places.destinationCoordinates.latitude,
            end_longitude: places.destinationCoordinates.longitude,
            end_time: Date.now() / 1000,
        };
        socket.emit('addRide', req)
        /*addRide(car, places)
            .then(() => dispatch(rideAdded()))
        */
    }
);

/**
 * Function to simulate the car. gets directions from google, and for each coordinate it moves the car.
 * This is only used for simulation and not to show a real car.
 * @param directions
 * @param car
 * @param i
 * @param type
 * @param places
 * @returns {Function}
 */
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
            dispatch(driveCar(dir, newCar, newi += 5, type, places));
        }, 200);
    };
}

export const cancelBooking = (carId) => (
    async(dispatch, getState) => {
        let {socket} = await getState().authentication;
        await socket.emit('bookCar', carId, 0);
        dispatch(cancelRide());
    }
);
