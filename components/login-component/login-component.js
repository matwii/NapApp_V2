import React from 'react';
import {
    View,
    ImageBackground,
    LayoutAnimation,
    Text,
    KeyboardAvoidingView
} from 'react-native';
import {SocialIcon, Button, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import config from '../../lib/oauthconfig';
import {Entypo} from '@expo/vector-icons';
import styles from './styles';
import {Font} from 'expo';
import LinkedInModal from 'react-native-linkedin'
import ProfileComponent from './profile-component';

const BG_IMAGE = require('../../assets/images/bg-photo1.jpeg');

const TabSelector = ({selected}) => {
    return (
        <View style={styles.selectorContainer}>
            <View style={selected && styles.selected}/>
        </View>
    );
};

class LoginComponent extends React.Component {
    state = {
        email: '',
        password: '',
        fontLoaded: false,
        selectedCategory: 0,
        isLoading: false,
        isEmailValid: true,
        isPasswordValid: true,
        isConfirmationValid: true,
    };

    /**
     * Loads fonts and renders the header based on if user is logged in. This function are fired before component is rendered
     * @returns {Promise<void>}
     */
    async componentWillMount() {
        await Font.loadAsync({
            georgia: require('../../assets/fonts/Georgia.ttf'),
            regular: require('../../assets/fonts/Montserrat-Regular.ttf'),
            light: require('../../assets/fonts/Montserrat-Light.ttf'),
        });
        this.setState({fontLoaded: true});
        await this.props.checkIfLoggedIn();
        this.props.navigation.setParams({
            headerRightOnPress: this.headerRightOnPress,
            title: this.props.isAuthenticated ? 'Sign Out' : 'Sign Up',
            header: !this.props.isAuthenticated && null
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
                title: this.props.isAuthenticated ? 'Sign Out' : 'Sign Up',
                header: !this.props.isAuthenticated && null,
            });
        }
    }

    /**
     * Options for the header. Setting title and adding button to the header
     * @param navigation
     * @returns {{headerTitle: string, headerRight: *}}
     */
    static navigationOptions = ({navigation}) => {
        return {
            header: navigation.getParam('header'),
            headerTitle: 'Profile',
            headerRight: (
                <Button
                    onPress={navigation.getParam('headerRightOnPress')}
                    title={navigation.getParam('title')}
                    buttonStyle={{backgroundColor: "transparent", elevation: 0}}
                    titleStyle={{fontWeight: "bold", color: 'black'}}
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

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    /**
     * function for manual login. Validates the input, then requests login to server
     */
    login = () => {
        const {email, password} = this.state;
        this.setState({isLoading: true});
        // Simulate an API call
        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            this.setState({
                isLoading: false,
                isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
                isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
            });
        }, 1500);
    }

    /**
     * function for manual signup. Validates the input, then requests signup to server and stores user into the database
     */
    signUp = () => {
        const {email, password, passwordConfirmation} = this.state;
        this.setState({isLoading: true});
        // Simulate an API call
        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            this.setState({
                isLoading: false,
                isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
                isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
                isConfirmationValid:
                    password === passwordConfirmation || this.confirmationInput.shake(),
            });
        }, 1000);
    }

    /**
     * Function for selecting between signup and login category. It also handles the animation.
     * @param selectedCategory
     */
    selectCategory(selectedCategory) {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            selectedCategory,
            isLoading: false,
        });
    }

    render() {
        const {
            selectedCategory, isLoading, fontLoaded, email, isEmailValid, password, isPasswordValid,
            passwordConfirmation, isConfirmationValid
        } = this.state;
        const isLoginPage = selectedCategory === 0;
        const isSignUpPage = selectedCategory === 1;
        let content = this.props.isAuthenticated ?
            (
                <ProfileComponent user={this.props.user}/>
            ) :
            (
                <View style={{flex: 1}}>
                    <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                        {fontLoaded ? (
                            <View>
                                <KeyboardAvoidingView
                                    contentContainerStyle={styles.loginContainer}
                                    behavior="position"
                                >
                                    <View style={{flexDirection: 'row'}}>
                                        <Button
                                            disabled={isLoading}
                                            type="clear"
                                            activeOpacity={0.7}
                                            onPress={() => this.selectCategory(0)}
                                            containerStyle={{flex: 1}}
                                            titleStyle={[
                                                styles.categoryText,
                                                isLoginPage && styles.selectedCategoryText,
                                            ]}
                                            title={'Login'}
                                        />
                                        <Button
                                            disabled={isLoading}
                                            type="clear"
                                            activeOpacity={0.7}
                                            onPress={() => this.selectCategory(1)}
                                            containerStyle={{flex: 1}}
                                            titleStyle={[
                                                styles.categoryText,
                                                isSignUpPage && styles.selectedCategoryText,
                                            ]}
                                            title={'Sign up'}
                                        />
                                    </View>
                                    <View style={styles.rowSelector}>
                                        <TabSelector selected={isLoginPage}/>
                                        <TabSelector selected={isSignUpPage}/>
                                    </View>
                                    <View style={styles.formContainer}>
                                        <Input
                                            leftIcon={
                                                <Icon
                                                    name="envelope-o"
                                                    color="rgba(0, 0, 0, 0.38)"
                                                    size={25}
                                                    style={{backgroundColor: 'transparent'}}
                                                />
                                            }
                                            value={email}
                                            keyboardAppearance="light"
                                            autoFocus={false}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            keyboardType="email-address"
                                            returnKeyType="next"
                                            inputStyle={{marginLeft: 10}}
                                            placeholder={'Email'}
                                            containerStyle={{
                                                borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                            }}
                                            ref={input => (this.emailInput = input)}
                                            onSubmitEditing={() => this.passwordInput.focus()}
                                            onChangeText={email => this.setState({email})}
                                            errorMessage={
                                                isEmailValid ? null : 'Please enter a valid email address'
                                            }
                                        />
                                        <Input
                                            leftIcon={
                                                <SimpleIcon
                                                    name="lock"
                                                    color="rgba(0, 0, 0, 0.38)"
                                                    size={25}
                                                    style={{backgroundColor: 'transparent'}}
                                                />
                                            }
                                            value={password}
                                            keyboardAppearance="light"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            secureTextEntry={true}
                                            returnKeyType={isSignUpPage ? 'next' : 'done'}
                                            blurOnSubmit={true}
                                            containerStyle={{
                                                marginTop: 16,
                                                borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                            }}
                                            inputStyle={{marginLeft: 10}}
                                            placeholder={'Password'}
                                            ref={input => (this.passwordInput = input)}
                                            onSubmitEditing={() =>
                                                isSignUpPage
                                                    ? this.confirmationInput.focus()
                                                    : this.login
                                            }
                                            onChangeText={password => this.setState({password})}
                                            errorMessage={
                                                isPasswordValid
                                                    ? null
                                                    : 'Please enter at least 8 characters'
                                            }
                                        />
                                        {isSignUpPage && (
                                            <Input
                                                leftIcon={
                                                    <SimpleIcon
                                                        name="lock"
                                                        color="rgba(0, 0, 0, 0.38)"
                                                        size={25}
                                                        style={{backgroundColor: 'transparent'}}
                                                    />
                                                }
                                                value={passwordConfirmation}
                                                secureTextEntry={true}
                                                keyboardAppearance="light"
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                keyboardType="default"
                                                returnKeyType={'done'}
                                                blurOnSubmit={true}
                                                containerStyle={{
                                                    marginTop: 16,
                                                    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                                }}
                                                inputStyle={{marginLeft: 10}}
                                                placeholder={'Confirm password'}
                                                ref={input => (this.confirmationInput = input)}
                                                onSubmitEditing={this.signUp}
                                                onChangeText={passwordConfirmation =>
                                                    this.setState({passwordConfirmation})
                                                }
                                                errorMessage={
                                                    isConfirmationValid
                                                        ? null
                                                        : 'Please enter the same password'
                                                }
                                            />
                                        )}
                                        <Button
                                            buttonStyle={styles.loginButton}
                                            containerStyle={{marginTop: 32, flex: 0}}
                                            activeOpacity={0.8}
                                            title={isLoginPage ? 'LOGIN' : 'SIGN UP'}
                                            onPress={isLoginPage ? this.login : this.signUp}
                                            titleStyle={styles.loginTextButton}
                                            loading={isLoading}
                                            disabled={isLoading}
                                        />
                                    </View>
                                </KeyboardAvoidingView>
                                <SocialIcon
                                    title={`Sign ${isLoginPage ? 'In' : 'Up'} With Google`}
                                    button
                                    type='google-plus-official'
                                    style={styles.loginButtonContainerStyle}
                                    fontStyle={{fontSize: 10}}
                                    iconSize={12}
                                    onPress={() => this.props.googleAuth()}
                                />
                                <SocialIcon
                                    title={`Sign ${isLoginPage ? 'In' : 'Up'} With LinkedIn`}
                                    button
                                    type='linkedin'
                                    onPress={() => this.modal.open()}
                                    fontStyle={{fontSize: 10}}
                                    iconSize={12}
                                    style={styles.loginButtonContainerStyle}
                                />
                                <View style={styles.linkedInContainer}>
                                    <LinkedInModal
                                        ref={ref => {
                                            this.modal = ref
                                        }}
                                        clientID={config.LINKEDIN_CLIENT_ID}
                                        clientSecret={config.LINKEDIN_CLIENT_SECRET}
                                        redirectUri={`http://localhost:3000/auth/linkedin/callback`}
                                        onSuccess={data => this.props.linkedInAuth(data)}
                                        permissions={['r_basicprofile', 'r_emailaddress']}
                                        linkText={null}
                                        onError={() => this.modal.close}
                                    />
                                </View>
                            </View>
                        ) : (
                            <Text>Loading...</Text>
                        )}
                    </ImageBackground>
                </View>
            );
        return (
            <View style={{flex: 1}}>
                {content}
            </View>
        )
    }
}

export default LoginComponent;
