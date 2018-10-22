import API_KEY from '../lib/config';
import { getPoints } from '../actions/input-address-actions';
const HOST = '192.168.0.33:3000';

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

export const fetchCarsData = () => (
    fetch(`http://${HOST}/car`)
        .then(res => res.json())
        .then((cars) => {
            console.log(cars);
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
            return availableCars;
        })
        .catch(err => console.log(err))
);

export async function fetchBestCar(available: Array, pickup: Object) {
    let duration = Infinity;
    let bestCar = null;
    let directions = [];
    let bounds = null;
    const destination = `${pickup.latitude},${pickup.longitude}`;
    await Promise.all(available.map(async (car) => {
        const start = `${car.coordinate.latitude},${car.coordinate.longitude}`;
        const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${destination}&key=AIzaSyBIEh5E2eCQ0_Eiu2bXP3oNrzEW0SpinOc`);
        const respJson = await resp.json();
        const thisDuration = respJson.routes[0].legs[0].duration.value;
        if (thisDuration < duration) {
            duration = thisDuration;
            bestCar = car;
            directions = getPoints(respJson.routes[0]);
            bounds = respJson.routes[0].bounds;
        }
    }));
    return [bestCar, directions, duration, bounds];
}
