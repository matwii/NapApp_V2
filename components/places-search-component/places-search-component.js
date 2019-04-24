import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {API_KEY} from "../../lib/config";
import styles from './styles';

const PlacesSearchComponent = ({toggleModal, address, type, pickupCoordinates, destinationCoordinates, destinationAddress,
                                   cars, getNewCar, getCoordinates, getCar, editPickup, getPickupLocation}) => {

    const getRoute = (coordinates, details) => {
        //If we are only changing pickuplocationm
        if (editPickup){
            return getPickupLocation(coordinates)
        }
        //Fetches directions from closest car to our destination
        console.log('GETROUTE' + 'cars: ' + cars, 'pickupcoords: ' + pickupCoordinates, 'getNewCar: ' + getNewCar)
        return getCoordinates(address, type, pickupCoordinates, coordinates, details, cars) &&
            getCar(cars, pickupCoordinates, getNewCar);
    };
    return (
        <GooglePlacesAutocomplete
            placeholder='Enter Location'
            minLength={2}
            autoFocus={true}
            returnKeyType={'search'}
            fetchDetails={true}
            onPress={async(data, details = null) => { // 'details' is provided when fetchDetails = true
                const coordinates = {
                    "latitude": details.geometry.location.lat,
                    "longitude": details.geometry.location.lng
                };
                getRoute(coordinates, details.name);
                toggleModal(false)
            }}
            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            query={{
                key: API_KEY,
                language: 'en', // language of the results
                types: 'address', // default: 'geocode'
                components:'country:no' //Focuses results in Norway
            }}
            styles={
                styles
            }
            GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
            }}
            GooglePlacesDetailsQuery={{
                // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                fields: 'formatted_address',
            }}
        />
    )
};

export default PlacesSearchComponent;