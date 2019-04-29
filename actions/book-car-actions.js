import {CANCEL_RIDE, BOOK_RIDE, MOVE_CAR, RIDE_ADDED} from './action-types';
import {fetchRides} from "./rides-actions";

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
        socket.emit('addRide', req);
        setTimeout(() => dispatch(fetchRides()), 500);
        /*addRide(car, places)
            .then(() => dispatch(rideAdded()))
        */
    }
);

export const cancelBooking = (carId) => (
    async(dispatch, getState) => {
        let {socket} = await getState().authentication;
        await socket.emit('bookCar', carId, 0);
        dispatch(cancelRide());
    }
);
