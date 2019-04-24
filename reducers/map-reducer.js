import {
    FETCH_LOCATION_ERROR,
    FETCH_LOCATION_REQUEST,
    SET_REGION,
    SET_INIT_REGION
} from '../actions/action-types';
import {MapView} from 'expo';

const initialState = {
    region: null,
    initialRegion: {
        latitude: 63,
        longitude: 10,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    },
    isLoading: true,
    error: false,
};

const mapReducer = (state: Object = initialState, action: Object) => {
    switch (action.type) {
        case SET_REGION:
            return {
                ...state,
                isLoading: false,
                error: false,
                region: action.payload.region,
            };
        case SET_INIT_REGION:
            return {
                ...state,
                isLoading: false,
                error: false,
                initialRegion: action.payload.region,
                region: null
            };
        case FETCH_LOCATION_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_LOCATION_ERROR: {
            return {
                ...state,
                error: true,
            };
        }
        default:
            return state;
    }
};

export default mapReducer;
