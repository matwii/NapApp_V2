import {API_KEY, HOST} from '../lib/config';
import { getPoints } from '../actions/input-address-actions';
import {AsyncStorage} from "react-native";
import axios from 'axios';

/**
 * Sends address to the google api and returns the coordinates.
 * @param address
 * @returns {Promise<*[] | never>}
 */
export const fetchCoordinatesData = (address: String) => (
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address.replace(' ', '+')}&key=${API_KEY}`)
        .then(res => res.json())
        .then(myJson => myJson.results[0])
        .then((destination) => {
            const coordinates = {
                latitude: destination.geometry.location.lat,
                longitude: destination.geometry.location.lng,
            };
            const newAdr = destination.formatted_address.split(',')[0];
            return [coordinates, newAdr];
        })
        .catch(err => err)
);

/**
 * Sends coordinates to the google api and returns the address for the specific coordinates.
 * @param coordinates
 * @returns {Promise<{isThrown: boolean} | never>}
 */
export const fetchAddressData = (coordinates: Object) => (
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.latitude},${coordinates.longitude}&key=${API_KEY}`)
        .then(res => res.json())
        .then(myJson => myJson.results[0])
        .then((destination) => {
            const address = destination.formatted_address.split(',')[0];
            return address;
        })
        .catch(err => err)
);

/**
 * Finds the closest available car
 * @param available
 * @param pickup
 * @returns {Promise<*[]>}
 */
export async function fetchBestCar(available: Array, pickup: Object) {
    let duration = Infinity;
    let bestCar = null;
    let directions = [];
    let bounds = null;
    const destination = `${pickup.latitude},${pickup.longitude}`;
    await Promise.all(available.map(async (car) => {
        if (car.booked === 0){
            const start = `${car.coordinate.latitude},${car.coordinate.longitude}`;
            const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${destination}&key=AIzaSyC6NcaFjA1IRMPzZiJrT4gi9eBExSWUoiI`);
            const respJson = await resp.json();
            const thisDuration = respJson.routes[0].legs[0].duration.value;
            if (thisDuration < duration) {
                duration = thisDuration;
                bestCar = car;
                directions = getPoints(respJson.routes[0]);
                bounds = respJson.routes[0].bounds;
            }
        }
    }));
    return [bestCar, directions, duration, bounds];
}

/**
 * Fetches all the ongoing or finished rides the user has booked from the server.
 * @param token
 * @returns {Promise<void>}
 */
export async function getRides(token) {
    try {
        const rides = await axios.get(`${HOST}/ride`, {params: {token: token}});
        if (rides) {
            return rides.data;
        }
    } catch (e) {
        console.log(e);
    }
}
