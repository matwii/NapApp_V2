import { connect } from 'react-redux';
import LoginComponent from '../../components/login-component/login-component';
import {checkIfLoggedIn, googleAuth, signOut} from "../../actions/auth-actions";

const mapStateToProps = (state: Object) => ({
    isLoading: state.authentication.isLoading,
    error: state.authentication.error,
    isAuthenticated: state.authentication.isAuthenticated,
    user: state.authentication.user,
    token: state.authentication.token,
});

const mapDispatchToProps = (dispatch: Function) => ({
    googleAuth: () => dispatch(googleAuth()),
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
    signOut: () => dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);


