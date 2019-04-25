import {
    FETCH_RIDES_SUCCESS, SIGN_OUT
} from '../actions/action-types';

const initialState = {
    rides: [],
    isLoading: true,
    error: false,
};

const ridesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RIDES_SUCCESS: {
            return {
                ...state,
                rides: action.payload.rides,
                isLoading: false,
            }
        }
        case SIGN_OUT: {
            return {
                ...state,
                rides: []
            }
        }
        default:
            return state
    }
};

export default ridesReducer;
