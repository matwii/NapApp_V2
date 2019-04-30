import {
    FETCH_CARS_ERROR,
    FETCH_CARS_REQUEST,
    FETCH_CARS_SUCCESS,
    FETCH_BEST_CAR_ERROR,
    FETCH_BEST_CAR_REQUEST,
    FETCH_BEST_CAR_SUCCESS,
    CANCEL_RIDE,
    BOOK_RIDE,
    MOVE_CAR,
    CAR_POSITION_SET, RIDE_ADDED, SIGN_OUT,
} from '../actions/action-types';

const initialState = {
    cars: [],
    isLoading: true,
    error: false,
    reservedCar: null,
    carBooked: false,
};

const carListReducer = (state: Object = initialState, action: Object) => {
    switch (action.type) {
        case FETCH_CARS_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case FETCH_CARS_ERROR: {
            return {
                ...state,
                error: true,
            };
        }
        case FETCH_CARS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: false,
                cars: action.payload.cars,
                bookedCars: action.payload.bookedCars
            };
        }
        case FETCH_BEST_CAR_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case FETCH_BEST_CAR_ERROR: {
            return {
                ...state,
                error: true,
            };
        }
        case FETCH_BEST_CAR_SUCCESS: {
            return {
                ...state,
                reservedCar: action.payload.car,
                isLoading: false,
                error: false,
            };
        }
        /*case CANCEL_RIDE: {
          return {
            ...state,
            reservedCar: null,
          };
        }*/
        case RIDE_ADDED:
            return {
                ...state,
                carBooked: true
            };
        case BOOK_RIDE:
            return {
                ...state,
                carBooked: true,
            };
        case SIGN_OUT: {
            return {
                ...state,
                carBooked: false
            }
        }
        case MOVE_CAR:
            return {
                ...state,
                reservedCar: action.payload.car,
            };
        case CAR_POSITION_SET:
            return {
                ...state,
                carBooked: false,
            };
        case CANCEL_RIDE:
            return {
                ...state,
                carBooked: false
            }
        default:
            return state;
    }
};

export default carListReducer;
