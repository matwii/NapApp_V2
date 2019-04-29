import {connect} from 'react-redux';
import InputAddressComponent from '../../components/input-address-component/input-address-component';
import {fetchCoordinates, chooseDestinationOnMap} from '../../actions/input-address-actions';
import {getBestCar} from '../../actions/car-actions';
import {changeRegion} from "../../actions/map-actions";

const mapStateToProps = (state: Object) => ({
    active: state.inputAddress.active,
    type: state.inputAddress.type,
    pickupCoordinates: state.directions.pickupCoordinates,
    destinationCoordinates: state.directions.destinationCoordinates,
    destinationAddress: state.directions.destinationAddress,
    cars: state.carList.cars,
    mustGetNewCar: state.directions.pickupChanged,
    address: state.directions.pickupAddress,
    isLoading: state.directions.isLoading,
    isAuthenticated: state.authentication.isAuthenticated
});
const mapDispatchToProps = (dispatch: Function) => ({
    getCoordinates:
        (address, type, pickupCoordinates, destinationCoordinates, destinationAddress, cars) =>
            dispatch(fetchCoordinates(address, type, pickupCoordinates, destinationCoordinates, destinationAddress, cars)),
    chooseOnMap: type => dispatch(chooseDestinationOnMap(type)),
    getCar: (cars, pickup, mustGetNewCar) => dispatch(getBestCar(cars, pickup, mustGetNewCar)),
    getPickupLocation: region => dispatch(changeRegion(region)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(InputAddressComponent);
