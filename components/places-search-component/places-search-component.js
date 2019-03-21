import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {API_KEY} from "../../lib/config";
import styles from './styles';


const PlacesSearchComponent = ({toggleModal}) => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Enter Location'
            minLength={2}
            autoFocus={true}
            returnKeyType={'search'}
            fetchDetails={true}
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                console.log(data, details);
                toggleModal();
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