import React from 'react';
import { View, Text } from 'react-native';
import { SocialIcon, Button, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Entypo } from '@expo/vector-icons';
import styles from './styles';
import { connect } from "react-redux";
import {googleAuth, checkIfLoggedIn, signOut} from "../../actions/auth-actions";
import ProfileComponent from './profile-component';

class LoginComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: this.props.isAuthenticated,
            user: this.props.user,
            token: this.props.token,
            username: '',
            password: ''
        };
    }

    async componentWillMount(){
        await this.props.checkIfLoggedIn();
        this.props.navigation.setParams({
            headerRightOnPress: this.headerRightOnPress,
            title: this.props.isAuthenticated ? 'Sign Out' : 'Sign Up'
        });
    }

    /**
     * Compares previous state before and after logging in. If the state is changed we update the header button title
     * @param prevProps
     */
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
            this.props.navigation.setParams({
                title: this.props.isAuthenticated ? 'Sign Out' : 'Sign Up'
            });
        }
    }

    /**
     * Options for the header. Setting title and adding button to the header
     * @param navigation
     * @returns {{headerTitle: string, headerRight: *}}
     */
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Profile',
            headerRight: (
                <Button
                    onPress={navigation.getParam('headerRightOnPress')}
                    title={navigation.getParam('title')}
                    buttonStyle={{ backgroundColor: "transparent", elevation: 0 }}
                    titleStyle={{ fontWeight: "bold", color: 'black' }}
                />
            ),
        };
    };

    /**
     * Sign up button in the header. Transfers the user to the sign up page.
     */
    headerRightOnPress = () => {
        this.props.isAuthenticated ? this.props.signOut() : console.log('OnPress!');
    };

    /**
     * Authenticates the the users google account with Oauth.
     * Sends a request to the server that checks with the google api if the user is valid.
     * returns user data and token.
     * @returns {Promise<*>}
     */


    render(){
        let content = this.props.isAuthenticated ?
            (
                <ProfileComponent user={this.props.user}/>
            ) :
            (
                <View>
                    <Input
                        placeholder='E-Mail'
                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                color="black"
                            />
                        }
                        keyboardType="email-address"
                        containerStyle={styles.inputContainer}
                        inputContainerStyle={{borderBottomColor: 'transparent'}}
                    />
                    <Input
                        placeholder='Password'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color='black'
                            />
                        }
                        secureTextEntry={true}
                        containerStyle={styles.inputContainer}
                        inputContainerStyle={{borderBottomColor: 'transparent'}}
                    />
                    <Button
                        title="Log In"
                        icon={
                            <Entypo
                                name='login'
                                size={15}
                                color='white'
                            />
                        }
                        loading={false}
                        loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                        titleStyle={{ color: 'white' }}
                        buttonStyle={styles.loginButtonStyle}
                        containerStyle={styles.loginButtonContainerStyle}
                    />
                    <SocialIcon
                        title='Sign In With Google'
                        button
                        type='google-plus-official'
                        onPress={() => this.props.googleAuth() && this.props.navigation.setParams({isAuthenticated: this.props.isAuthenticated})}
                    />
                    <SocialIcon
                        title='Sign In With LinkedIn'
                        button
                        type='linkedin'
                        onPress={() => console.log('onPress LinkedIn')}
                    />
                </View>
        );
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                {content}
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch: Function) => ({
    googleAuth: () => dispatch(googleAuth()),
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
    signOut: () => dispatch(signOut())
});

function mapStateToProps( state: Object ) {
    return {
        isLoading: state.authentication.isLoading,
        error: state.authentication.error,
        isAuthenticated: state.authentication.isAuthenticated,
        user: state.authentication.user,
        token: state.authentication.token,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
