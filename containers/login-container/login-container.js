import { connect } from 'react-redux';
import LoginComponent from '../../components/login-component/login-component';

const mapStateToProps = (state: Object) => ({
    isLoading: state.authentication.isLoading,
    error: state.authentication.error,
    isAuthenticated: state.authentication.isAuthenticated,
    user: state.authentication.user,
    token: state.authentication.token,
    navigation: this.props.navigation
});

const mapDispatchToProps = (dispatch: Function) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);


