import { connect } from 'react-redux';
import CarListComponent from '../../components/car-list-component/car-list-component';
// import { fetchCoordinates, chooseDestinationOnMap } from '../../actions/destination-actions';

const mapStateToProps = (state: Object) => ({
  cars: state.carList.cars,
  bookedRide: state.rides.bookedRide,
});

// const mapDispatchToProps = (dispatch: Function) => ({
// });

export default connect(mapStateToProps)(CarListComponent);
// mapDispatchToProps,
