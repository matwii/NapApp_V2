import { connect } from 'react-redux';
import InfoComponent from '../../components/info-component/info-component';
import { changeAddress } from '../../actions/info-container-actions';

// returns time in s seconds from now, format hh:mm
function formatTime(seconds) {
  const newSeconds = Date.now().valueOf() + (seconds * 1000);
  const date = new Date(newSeconds);
  const formattedTime = date.toString().substr(16, 5);
  return formattedTime;
}

const mapStateToProps = (state: Object, ownProps: Object) => ({
  active: state.directions.destinationCoordinates !== null &&
    !state.inputAddress.active &&
    !state.inputAddress.chooseOnMap &&
    !state.rides.bookedRide,
  destinationAddress: state.directions.destinationAddress,
  pickupAddress: state.directions.pickupAddress,
  destinationTime: formatTime(state.directions.timeToPickup + state.directions.timeToDestination),
  pickupTime: formatTime(state.directions.timeToPickup),
});

const mapDispatchToProps = (dispatch: Function) => ({
  changeAddress: type => dispatch(changeAddress(type)),
  // getAddress: (destinationCoordinates, pickupCoordinates) =>
  //   dispatch(fetchAddress(destinationCoordinates, pickupCoordinates)),
  // getCar: (cars, pickupCoordinates) => dispatch(getBestCar(cars, pickupCoordinates)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoComponent);
