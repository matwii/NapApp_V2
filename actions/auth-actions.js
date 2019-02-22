import { Google } from "expo";
import config from "../lib/oauthconfig";
import {
    AUTH_ERROR,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    SIGN_OUT
} from './action-types';
import {AsyncStorage} from 'react-native'

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

export const checkIfLoggedIn = () => (
    async (dispatch: Function) => {
        try {
            const retrievedItem  = await AsyncStorage.getItem('user');
            const user = JSON.parse(retrievedItem);
            if (retrievedItem) {
                dispatch(fetchAuthSuccess(user, user.token));
            }
        } catch (e) {
            console.log('an error occured');
        }
    }
);

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
                fetch('http://10.22.32.33:3000/auth/google', options).then(r => {
                    const token = r.headers.get('x-auth-token');
                    r.json().then(user => {
                        user.token = token;
                        console.log('USER ' + JSON.stringify(user));
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
