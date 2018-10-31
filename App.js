import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Image, View, Text } from 'react-native';
import configureStore from './store/configureStore';
import MapContainer from './containers/map-container/map-container';
import FakeMarkerContainer from './containers/fake-marker-container/fake-marker-container';
import InputAddressContainer from './containers/input-address-container/input-address-container';
import ButtonContainer from './containers/button-container/button-container';
import InfoContainer from './containers/info-container/info-container';
import RideInfoContainer from './containers/ride-info-container/ride-info-container';
import BookCarContainer from './containers/book-car-container/book-car-container';

const store = configureStore({});

export default class App extends React.Component {
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
