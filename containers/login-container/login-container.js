import { connect } from 'react-redux';
import LoginComponent from '../../components/login-component/login-component';
import {checkIfLoggedIn, googleAuth, signOut, linkedInAuth} from "../../actions/auth-actions";
import {fetchRides} from "../../actions/rides-actions";

const mapStateToProps = (state: Object) => ({
    isLoading: state.authentication.isLoading,
    error: state.authentication.error,
    isAuthenticated: state.authentication.isAuthenticated,
    user: state.authentication.user,
    token: state.authentication.token,
    rides: state.rides.rides
});

const mapDispatchToProps = (dispatch: Function) => ({
    googleAuth: () => dispatch(googleAuth()),
    linkedInAuth: (token) => dispatch(linkedInAuth(token)),
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
    signOut: () => dispatch(signOut()),
    fetchRides: () => dispatch(fetchRides())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);


