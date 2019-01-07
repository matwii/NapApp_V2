import React from 'react';
import {Provider} from 'react-redux';
import {StyleSheet, Image, View, Text} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {FontAwesome} from '@expo/vector-icons';
import configureStore from './store/configureStore';
import MapContainer from './containers/map-container/map-container';
import FakeMarkerContainer from './containers/fake-marker-container/fake-marker-container';
import InputAddressContainer from './containers/input-address-container/input-address-container';
import ButtonContainer from './containers/button-container/button-container';
import InfoContainer from './containers/info-container/info-container';
import RideInfoContainer from './containers/ride-info-container/ride-info-container';
import BookCarContainer from './containers/book-car-container/book-car-container';
import LoginComponent from './components/login-component/login-component'

const store = configureStore({});

export default class App extends React.Component {
    render(){
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        )
    }
}

class mapScreen extends React.Component {
    render() {
        return (
                <View style={styles.container}>
                    <Image source={require('./components/car-component/car.png')} style={{width: 0, height: 0}}/>
                    <Image source={require('./components/map-component/location.png')} style={{width: 0, height: 0}}/>
                    <MapContainer/>
                    <View style={styles.topContainer}>
                        <InputAddressContainer/>
                    </View>
                    <FakeMarkerContainer/>
                    <View style={styles.bottomContainer}>
                        <ButtonContainer/>
                        <InfoContainer
                            type="Pickup"
                        />
                        <InfoContainer
                            type="Destination"
                        />
                        <RideInfoContainer/>
                        <BookCarContainer/>
                    </View>
                </View>
        );
    }
}

const Routes = createBottomTabNavigator({
    Map: {
        screen: mapScreen,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <FontAwesome name="map-o" size={20} color={tintColor}/>
        }
    },
    Profile: {
        screen: createStackNavigator({
            profile: {
                screen: LoginComponent,
                navigationOptions: {
                    headerTitle: 'Profile'
                }
            }
        }),
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <FontAwesome name="user" size={20} color={tintColor}/>
        }
    }
}, {
    lazy: false
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContainer: {
        flex: 1,
        top: 0,
        position: 'absolute',
        padding: 30,
    },
    bottomContainer: {
        position: 'absolute',
        padding: 30,
        bottom: 0
    },
});
