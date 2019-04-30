import {
    FETCH_RIDES_SUCCESS, SIGN_OUT, BOOK_RIDE, CONTINUE_RIDE, CANCEL_RIDE, RIDE_FINISHED, FETCH_RIDES_REQUEST
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
        case CONTINUE_RIDE: {
            return {
                ...state,
                bookedRide: {
                    ...state.bookedRide,
                    status_name: 'ride started',
                    status_id: 2
                }
            }
        }
        case CANCEL_RIDE: {
            return {
                ...state,
                bookedRide: null
            }
        }
        case RIDE_FINISHED: {
            return {
                ...state,
                bookedRide: null,
            }
        }
        case FETCH_RIDES_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        default:
            return state
    }
};

export default ridesReducer;
