import {
    AUTH_SUCCESS,
    AUTH_REQUEST,
    AUTH_ERROR,
    SIGN_OUT
} from '../actions/action-types';
import io from 'socket.io-client';
import {HOST} from "../lib/config";



const initialState = {
    isLoading: false,
    error: false,
    isAuthenticated: false,
    user: null,
    token: '',
    username: '',
    password: '',
    socket: io(`${HOST}`)
};

const authReducer = (state: Object = initialState, action: Object) => {
    switch (action.type) {
        case AUTH_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case AUTH_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: true,
            };
        }
        case AUTH_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: false,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true
            };
        }
        case SIGN_OUT: {
            return initialState
        }
        default:
            return state
    }
};

export default authReducer;