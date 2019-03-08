import { connect } from 'react-redux';
import MapComponent from '../../components/map-component/map-component';
import { fetchCurrentLocation, fetchCars, getLocation } from '../../actions/map-actions';

const mapStateToProps = (state: Object) => ({
    region: state.map.region,
    destination: state.directions.destinationCoordinates,
    pickup: state.directions.pickupCoordinates,
    isLoading: state.map.isLoading,
});

const mapDispatchToProps = (dispatch: Function) => ({
    onRegionChange: region => dispatch(getLocation(region)),
    getCurrentLocation: () => dispatch(fetchCurrentLocation()),
    getCars: () => dispatch(fetchCars()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MapComponent);
