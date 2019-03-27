import { connect } from 'react-redux';
import CurrentLocation from '../../components/current-location-component/current-location';
import { fetchCurrentLocation, fetchCars, getLocation } from '../../actions/map-actions';


const mapDispatchToProps = (dispatch: Function) => ({
    getCurrentLocation: () => dispatch(fetchCurrentLocation()),
});

export default connect(null, mapDispatchToProps)(CurrentLocation);
// mapDispatchToProps,