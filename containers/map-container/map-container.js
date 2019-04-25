import { connect } from 'react-redux';
import MapComponent from '../../components/map-component/map-component';
import { fetchCurrentLocation, fetchCars, getInitialLocation } from '../../actions/map-actions';

const mapStateToProps = (state: Object) => ({
    initialRegion: state.map.initialRegion,
    region: state.map.region,
    destination: state.directions.destinationCoordinates,
    pickup: state.directions.pickupCoordinates,
    isLoading: state.map.isLoading,
    isLoadingDirections: state.directions.isLoading,
    currentLocation: state.directions.currentLocationCoordinates,
    active: state.inputAddress.active,
    socket: state.authentication.socket
});

const mapDispatchToProps = (dispatch: Function) => ({
    onRegionChange: region => dispatch(getInitialLocation(region)),
    getCurrentLocation: () => dispatch(fetchCurrentLocation(false)),
    getCars: () => dispatch(fetchCars()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MapComponent);
