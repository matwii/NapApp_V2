import {
    BOOK_RIDE,
    FETCH_RIDES_SUCCESS,
    FETCH_DESTINATION_DIRECTIONS_SUCCESS,
    FETCH_PICKUP_DIRECTIONS_SUCCESS,
    CONTINUE_RIDE,
    CANCEL_RIDE, RIDE_FINISHED, FETCH_RIDES_REQUEST
} from "./action-types";
import {getRides} from "../services/http-requests";
import Polyline from '@mapbox/polyline';
import {API_KEY} from "../lib/config";

const fetchRidesSuccess = (rides, bookedRide) => (
    {
        type: FETCH_RIDES_SUCCESS,
        payload: {rides, bookedRide}
    }
);

export const bookRide = () => (
    {
        type: BOOK_RIDE,
        payload: {},
    }
);

const continueRide = () => (
    {
        type: CONTINUE_RIDE,
        payload: {}
    }
);

const finishRide = () => (
    {
        type: RIDE_FINISHED,
        payload: {}
    }
);

const cancelRide = () => (
    {
        type: CANCEL_RIDE,
        payload: {}
    }
);

const fetchRidesRequest = () => (
    {
        type: FETCH_RIDES_REQUEST,
        payload: {}
    }
);

const fetchDestinationDirectionsSuccess =
    (coordinates, directions, duration, bounds) => (
        {
            type: FETCH_DESTINATION_DIRECTIONS_SUCCESS,
            payload: {
                coordinates, directions, duration, bounds,
            },
        }
    );

const fetchPickupDirectionsSuccess =
    (coordinates, directions, duration, bounds) => (
        {
            type: FETCH_PICKUP_DIRECTIONS_SUCCESS,
            payload: {
                coordinates, directions, duration, bounds,
            },
        }
    );

function getPoints(route) {
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

const fetchDestinationDirections = (viaCoordinates, endCoordinates) => (
    async(dispatch) => {
        const start = `${viaCoordinates.latitude},${viaCoordinates.longitude}`;
        const via = `${endCoordinates.latitude},${endCoordinates.longitude}`;
        return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${via}&key=${API_KEY}`)
            .then(
                response => response.json(),
                error => console.log('error', error),
            )
            .then((myJson) => {
                const dir = getPoints(myJson.routes[0]);
                const duration = myJson.routes[0].legs[0].duration.value;
                const bounds = myJson.routes[0].bounds;
                dispatch(fetchDestinationDirectionsSuccess(endCoordinates, dir, duration, bounds));
            });
    }
)

export const fetchPickupDirections = (startCoordinates, viaCoordinates) => (
    async(dispatch) => {
        const start = `${startCoordinates.latitude},${startCoordinates.longitude}`;
        const via = `${viaCoordinates.latitude},${viaCoordinates.longitude}`;
        return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${via}&key=${API_KEY}`)
            .then(
                response => response.json(),
                error => console.log('error', error),
            )
            .then((myJson) => {
                const dir = getPoints(myJson.routes[0]);
                const duration = myJson.routes[0].legs[0].duration.value;
                const bounds = myJson.routes[0].bounds;
                dispatch(fetchPickupDirectionsSuccess(viaCoordinates, dir, duration, bounds));
            });
    }
);

export const updateRide = (status) => (
    async (dispatch, getState) => {
        const {socket} = getState().authentication;
        const {ride_id, car_id} = getState().rides.bookedRide;
        if (status === 2){
            dispatch(continueRide());
            socket.emit('updateRide', status, ride_id, car_id);
        }
        if (status === 3){
            dispatch(finishRide());
            await socket.emit('updateRide', status, ride_id, car_id);
            dispatch(fetchRides());
        }
        if (status === 4){
            dispatch(cancelRide());
            await socket.emit('updateRide', status, ride_id, car_id);
            dispatch(fetchRides());
        }
    }
);

export const fetchRides = () => (
    async (dispatch, getState) => {
        try {
            dispatch(fetchRidesRequest());
            const {token} = getState().authentication.user;
            const rides = await getRides(token);
            const bookedRide = await rides.find(ride => ride.status_id === 1 || ride.status_id === 2);
            await dispatch(fetchRidesSuccess(rides, bookedRide));
            if (bookedRide) {
                if (!getState().directions.destinationCoordinates){
                    const startCoordinates = {
                        latitude: bookedRide.start_latitude,
                        longitude: bookedRide.start_longitude
                    };
                    const viaCoordinates = {
                        latitude: bookedRide.via_latitude,
                        longitude: bookedRide.via_longitude
                    };
                    const endCoordinates = {
                        latitude: bookedRide.end_latitude,
                        longitude: bookedRide.end_longitude
                    };
                    await dispatch(fetchPickupDirections(startCoordinates, viaCoordinates));
                    await dispatch(fetchDestinationDirections(viaCoordinates, endCoordinates));
                }
                dispatch(bookRide())
            }
        } catch (e) {
            console.log(e)
        }
    }
);

