import { connect } from 'react-redux';
import ButtonComponent from '../../components/button-component/button-component';
import { fetchAddress } from '../../actions/input-address-actions';
import { getBestCar } from '../../actions/car-actions';

const mapStateToProps = (state: Object) => ({
  active: state.inputAddress.chooseOnMap,
  type: state.inputAddress.type,
  coordinates: {
    latitude: state.map.region.latitude,
    longitude: state.map.region.longitude,
  },
  pickupCoordinates: state.directions.pickupCoordinates,
  destinationCoordinates: state.directions.destinationCoordinates,
  destinationAddress: state.directions.destinationAddress,
  cars: state.carList.cars,
  mustGetNewCar: state.directions.pickupChanged,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getAddress:
    (coordinates, type, pickupCoordinates, destinationCoordinates, destinationAddress, cars) =>
      dispatch(fetchAddress(coordinates, type, pickupCoordinates, destinationCoordinates, destinationAddress, cars)),
  getCar: (cars, pickup, mustGetNewCar) => dispatch(getBestCar(cars, pickup, mustGetNewCar)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ButtonComponent);
