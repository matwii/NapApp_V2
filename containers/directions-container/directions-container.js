import { connect } from 'react-redux';
import DirectionsComponent from '../../components/directions-component/directions-component';


const mapStateToProps = (state: Object) => ({
  active: state.directions.routeToDestination.length > 0,
  directions: state.directions.routeToPickup.concat(state.directions.routeToDestination),
});


export default connect(mapStateToProps)(DirectionsComponent);
