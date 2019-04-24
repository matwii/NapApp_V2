import { Google } from "expo";
import config from "../lib/oauthconfig";
import {HOST} from "../lib/config";
import {
    AUTH_ERROR,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    SIGN_OUT,
    SET_SOCKET
} from './action-types';
import {AsyncStorage} from 'react-native'
import {getRides} from "../services/http-requests";

const fetchAuthRequest = () => (
    {
        type: AUTH_REQUEST,
        payload: {isLoading: true},
    }
);

const fetchAuthError = () => (
    {
        type: AUTH_ERROR,
        payload: {error: true},
    }
);

const fetchAuthSuccess = (user: Object, token: String) => (
    {
        type: AUTH_SUCCESS,
        payload: {user, token, isAuthenticated: true}
    }
);

const signOutSuccess = () => (
    {
        type: SIGN_OUT
    }
)

export const setSocket = () => (
    {
        type: SET_SOCKET,
    }
);

/**
 * Checks if user object is stored in AsyncStorage. This determines the global state that determines if we show
 * profile or not.
 * @returns {Function}
 */
export const checkIfLoggedIn = () => (
    async (dispatch: Function) => {
        try {
            const retrievedItem  = await AsyncStorage.getItem('user');
            const user = JSON.parse(retrievedItem);
            if (retrievedItem) {
                dispatch(getRides(user.token))
                dispatch(fetchAuthSuccess(user, user.token));
            }
        } catch (e) {
            console.log('an error occured');
        }
    }
);

/**
 * Signs the user out by removing user object from AsyncStorage
 * @returns {Function}
 */
export const signOut =() => (
    async (dispatch: Function) => {
        try {
            await AsyncStorage.removeItem('user');
            dispatch(signOutSuccess())
        } catch (e) {
            console.log('an error occured');
        }
    }
);


export const linkedInAuth = (token) => (
    async (dispatch: Function) => {
        const tokenBlob = new Blob([JSON.stringify({access_token: token.access_token}, null, 2)], {type: 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        const response = await fetch(`${HOST}/auth/linkedin`, options);
        const resToken = await response.headers.get('x-auth-token');
        const user = await response.json();
        if (resToken) {
            AsyncStorage.setItem('user', JSON.stringify(user))
                .then(() => {
                    dispatch(fetchAuthSuccess(user, resToken))
                })
                .catch(() => {
                    console.log('There was an error saving the product')
                })
        }
    }
);

/**
 * Gets access token from Google Oauth. If we get the token we send it to the server for validation.
 * Server returns the user object and we store it in AsyncStorage
 * @returns {Function}
 */
export const googleAuth = () => (
    async (dispatch: Function) => {
        dispatch(fetchAuthRequest());
        try {
            const result = await Google.logInAsync({
                androidClientId: config.GOOGLE_CLIENT_ID_ANDROID,
                iosClientId: config.GOOGLE_CLIENT_ID_IOS,
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                const tokenBlob = new Blob([JSON.stringify({access_token: result.accessToken}, null, 2)], {type: 'application/json'});
                const options = {
                    method: 'POST',
                    body: tokenBlob,
                    mode: 'cors',
                    cache: 'default'
                };
                fetch(`${HOST}/auth/google`, options).then(r => {
                    const token = r.headers.get('x-auth-token');
                    r.json().then(user => {
                        user.token = token;
                        if (token) {
                            AsyncStorage.setItem('user', JSON.stringify(user))
                                .then(() => {
                                    dispatch(fetchAuthSuccess(user, token))
                                })
                                .catch(() => {
                                    console.log('There was an error saving the product')
                                })
                        }
                    });
                })
            } else {
                dispatch(fetchAuthError());
            }
        } catch (e) {
            dispatch(fetchAuthError());
        }
    }
);
