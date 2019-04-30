import {connect} from 'react-redux';
import BookCarComponent from '../../components/book-car-component/book-car-component';
import {cancelBooking, bookRide, driveCar, addRideToDatabase} from '../../actions/book-car-actions';

const mapStateToProps = (state: Object) => ({
    active: state.directions.destinationCoordinates !== null &&
        !state.inputAddress.active &&
        !state.inputAddress.chooseOnMap &&
        !state.rides.bookedRide,
    directions: state.directions.routeToPickup, // .concat(state.directions.routeToDestination),
    car: state.carList.reservedCar,
    user: state.authentication.user,
    isLoading: state.rides.isLoading,
    places: {
        startCoordinates: state.directions.startCoordinates,
        startTime: (state.directions.timeToPickup + state.directions.timeToDestination),
        pickupCoordinates: state.directions.pickupCoordinates,
        pickupTime: state.directions.timeToDestination,
        destinationCoordinates: state.directions.destinationCoordinates,
    },
});


const mapDispatchToProps = (dispatch: Function) => ({
    cancelRide: (carId) => dispatch(cancelBooking(carId)),
    bookRide: (car, places) => dispatch(addRideToDatabase(car, places)),
    driveCar: (directions, car) => dispatch(driveCar(directions, car, 0, 'Pickup', null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookCarComponent);
