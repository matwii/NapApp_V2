import { connect } from 'react-redux';
import RideInfoComponent from '../../components/ride-info-component/ride-info-component';
import { updateRide } from '../../actions/rides-actions';
import { afterPickup } from '../../actions/car-actions';

// returns time in s seconds from now, format hh:mm
function formatTime(seconds) {
  if (seconds === 0) {
    return '0';
  }
  const newSeconds = Date.now().valueOf() + (seconds * 1000);
  const date = new Date(newSeconds);
  const formattedTime = date.toString().substr(16, 5);
  return formattedTime;
}

const mapStateToProps = (state: Object) => ({
  inactive: !state.rides.bookedRide,
  atPickup: state.directions.atPickup,
  bookedRide: state.rides.bookedRide,
  pickupTime: formatTime(state.directions.timeToPickup),
  destinationTime: formatTime(state.directions.timeToPickup + state.directions.timeToDestination),
  directions: state.directions.routeToDestination,
  car: state.carList.reservedCar,
  places: {
    startCoordinates: state.directions.startCoordinates,
    startTime: (state.directions.timeToPickup + state.directions.timeToDestination),
    pickupCoordinates: state.directions.pickupCoordinates,
    pickupTime: state.directions.timeToDestination,
    destinationCoordinates: state.directions.destinationCoordinates,
  },
});

const mapDispatchToProps = (dispatch: Function) => ({
  continueRide: (directions, car, places) => dispatch(driveCar(directions, car, 0, 'Destination', places)),
  moveFromPickup: () => dispatch(afterPickup()),
    updateRide: (status) => dispatch(updateRide(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(RideInfoComponent);
