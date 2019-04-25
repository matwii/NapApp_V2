import {FETCH_RIDES_SUCCESS} from "./action-types";
import {getRides} from "../services/http-requests";

const fetchRidesSuccess = (rides) => (
    {
        type: FETCH_RIDES_SUCCESS,
        payload: {rides}
    }
);

export const fetchRides = () => (
    async (dispatch, getState) => {
        try {
            const {token} = getState().authentication.user;
            const rides = await getRides(token);
            dispatch(fetchRidesSuccess(rides));
        } catch (e) {
            console.log(e)
        }
    }
);

