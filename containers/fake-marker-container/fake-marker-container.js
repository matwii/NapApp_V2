import { connect } from 'react-redux';
import FakeMarkerComponent from '../../components/fake-marker-component/fake-marker-component';
// import { fetchCoordinates, chooseDestinationOnMap } from '../../actions/destination-actions';

const mapStateToProps = (state: Object) => ({
  active: state.inputAddress.chooseOnMap,
});

// const mapDispatchToProps = (dispatch: Function) => ({
// });

export default connect(mapStateToProps)(FakeMarkerComponent);
// mapDispatchToProps,
