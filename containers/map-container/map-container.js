import { connect } from 'react-redux';
import MapComponent from '../../components/map-component/map-component';
import { setRegion, fetchLocation, fetchCars } from '../../actions/map-actions';

const mapStateToProps = (state: Object) => ({
    region: state.map.region,
    destination: state.directions.destinationCoordinates,
    pickup: state.directions.pickupCoordinates,
    isLoading: state.carList.isLoading,
    socket: state.carList.socket
});

const mapDispatchToProps = (dispatch: Function) => ({
    onRegionChange: region => dispatch(setRegion(region)),
    getLocation: () => dispatch(fetchLocation()),
    getCars: (socket) => dispatch(fetchCars(socket)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MapComponent);
