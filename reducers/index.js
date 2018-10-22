import { combineReducers } from 'redux';
import mapReducer from './map-reducer';
import carListReducer from './car-list-reducer';
import directionsReducer from './directions-reducer';
import inputAddressReducer from './input-address-reducer';

// Root Reducer
const rootReducer = combineReducers({
  map: mapReducer,
  carList: carListReducer,
  directions: directionsReducer,
  inputAddress: inputAddressReducer,
});

export default rootReducer;
