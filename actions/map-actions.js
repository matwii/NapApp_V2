import {
    SET_REGION,
    FETCH_LOCATION_ERROR,
    FETCH_LOCATION_REQUEST,
    FETCH_CARS_REQUEST,
    FETCH_CARS_ERROR,
    FETCH_CARS_SUCCESS,
    FETCH_ADDRESS_REQUEST,
    FETCH_ADDRESS_SUCCESS,
    FETCH_ADDRESS_ERROR,
    FETCH_CURRENT_ADDRESS_SUCCESS
} from './action-types';
import { fetchAddressData} from '../services/http-requests';
import {Location, Permissions} from 'expo';
/* global navigator */

export const setCurrentRegion = (region: Object) => (
    {
        type: SET_REGION,
        payload: {region},
    }
);

const fetchLocationError = () => (
    {
        type: FETCH_LOCATION_ERROR,
        payload: {error: true},
    }
);

const fetchLocationRequest = () => (
    {
        type: FETCH_LOCATION_REQUEST,
        payload: {isLoading: true},
    }
);

const fetchAddressSuccess = (coordinates: Object, address: String) => (
    {
        type: FETCH_ADDRESS_SUCCESS,
        payload: {coordinates, address},
    }
);

const fetchCurrentAddressSuccess = (coordinates: Object, address: String) => (
    {
        type: FETCH_CURRENT_ADDRESS_SUCCESS,
        payload: {coordinates, address},
    }
);

const fetchAddressRequest = () => (
    {
        type: FETCH_ADDRESS_REQUEST
    }
);

const fetchAddressError = () => (
    {
        type: FETCH_ADDRESS_ERROR,
        payload: {error: true},
    }
);

const fetchAddress = (coordinates: Object, type: String) => (
    (dispatch: Function) => {
        dispatch(fetchAddressRequest());
        return fetchAddressData(coordinates)
            .then((address) => {
                //Checks if this is current address of the user or if pickupaddress is changed
                if (type === 'current'){
                    dispatch(fetchCurrentAddressSuccess(coordinates, address));
                    dispatch(fetchAddressSuccess(coordinates, address))
                } else {
                    dispatch(fetchAddressSuccess(coordinates, address))
                }
            })
            .catch(() => dispatch(fetchAddressError()));
    }
);

export const getLocation = (region: Object) => (
    async (dispatch: Function) => {
        dispatch(fetchAddressRequest());
        if (!region.latitudeDelta){
            region = {
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }
        }
        const coordinates = {
            latitude: region.latitude,
            longitude: region.longitude
        };
        await dispatch(setCurrentRegion(region));
        await dispatch(fetchAddress(coordinates, 'pickup'));
    }
);

export const fetchCurrentLocation = () => (
    async (dispatch: Function) => {
        dispatch(fetchLocationRequest);
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            let position = await Location.getCurrentPositionAsync({});
            if (position) {
                let region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                };
                let coordinates = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                if ((position.coords.latitude > 63.5 || position.coords.latitude < 63)
                    && (position.coords.longitude > 11 || position.coords.longitude < 9.5)) {
                    coordinates = {
                        latitude: 63.419567,
                        longitude: 10.401914,
                    };
                    region = {
                        latitude: 63.419567,
                        longitude: 10.401914,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    };
                }
                await dispatch(setCurrentRegion(region));
                await dispatch(fetchAddress(coordinates, 'current'));
            } else {
                dispatch(fetchLocationError);
            }
        } else {
            dispatch(fetchLocationError);
        }
    }
);

const fetchCarsError = () => (
    {
        type: FETCH_CARS_ERROR,
        payload: {error: true},
    }
);

const fetchCarsRequest = () => (
    {
        type: FETCH_CARS_REQUEST,
        payload: {isLoading: true},
    }
);

const fetchCarsSuccess = (cars: Array) => (
    {
        type: FETCH_CARS_SUCCESS,
        payload: {cars},
    }
);

export const fetchCars = () => (
    async (dispatch: Function) => {
        dispatch(fetchCarsRequest());
        dispatch({
            event: 'initial cars',
            handle: (cars) => {
                const availableCars = [];
                for (let i = 0; i < cars.length; i += 1) {
                    const car = cars[i];
                    // legg til if-en i php?
                    if (car.booked === 0) {
                        const availableCar = {
                            id: car.car_id,
                            coordinate: {
                                latitude: parseFloat(car.latitude),
                                longitude: parseFloat(car.longitude),
                            },
                            regNr: car.reg_number,
                        };
                        availableCars.push(availableCar);
                    }
                }
                console.log(availableCars);
                dispatch(fetchCarsSuccess(availableCars))
            }
        })
    }
);
