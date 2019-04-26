import {
    FETCH_RIDES_SUCCESS, SIGN_OUT, BOOK_RIDE
} from '../actions/action-types';

const initialState = {
    rides: [],
    isLoading: true,
    error: false,
    bookedRide: null
};

const ridesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RIDES_SUCCESS: {
            return {
                ...state,
                rides: action.payload.rides,
                isLoading: false,
                bookedRide: action.payload.bookedRide
            }
        }
        case SIGN_OUT: {
            return {
                ...state,
                rides: [],
                bookedRide: null
            }
        }
        default:
            return state
    }
};

export default ridesReducer;
