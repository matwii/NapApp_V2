import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Image, View, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import configureStore from './store/configureStore';
import MapContainer from './containers/map-container/map-container';
import FakeMarkerContainer from './containers/fake-marker-container/fake-marker-container';
import InputAddressContainer from './containers/input-address-container/input-address-container';
import ButtonContainer from './containers/button-container/button-container';
import InfoContainer from './containers/info-container/info-container';
import RideInfoContainer from './containers/ride-info-container/ride-info-container';
import BookCarContainer from './containers/book-car-container/book-car-container';
import LoginComponent from './components/login-component/login-component';

const store = configureStore({});

class App extends React.Component {
    render() {
    return (
        <Provider store={store}>
          <View style={styles.container}>
              <Image source={require('./components/car-component/car.png')} style={{ width: 0, height: 0 }} />
              <Image source={require('./components/map-component/location.png')} style={{ width: 0, height: 0 }} />
              <MapContainer/>
              <View style={styles.topContainer} />
              <FakeMarkerContainer/>
              <View style={styles.bottomContainer}>
                  <InputAddressContainer />
                  <ButtonContainer/>
                  <InfoContainer
                      type="Pickup"
                  />
                  <InfoContainer
                      type="Destination"
                  />
                  <RideInfoContainer />
                  <BookCarContainer />
              </View>
          </View>
        </Provider>
    );
  }
}

export default createBottomTabNavigator({
    Map: {
        screen: App,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <FontAwesome name="map-o" size={20} color={tintColor}/>
        }
    },
    Profile: {
        screen: LoginComponent,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <FontAwesome name="user" size={20} color={tintColor}/>
        }
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: 30,
    },
    bottomContainer: {
        position: 'absolute',
        padding: 30,
        bottom: 0
    },
});
