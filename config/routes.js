import { createBottomTabNavigator, createStackNavigator} from "react-navigation";
import {FontAwesome} from '@expo/vector-icons';
import React from "react";
import {StyleSheet, View, Animated} from "react-native";
import MapContainer from "../containers/map-container/map-container";
import InputAddressContainer from "../containers/input-address-container/input-address-container";
import FakeMarkerContainer from "../containers/fake-marker-container/fake-marker-container";
import ButtonContainer from "../containers/button-container/button-container";
import InfoContainer from "../containers/info-container/info-container";
import RideInfoContainer from "../containers/ride-info-container/ride-info-container";
import BookCarContainer from "../containers/book-car-container/book-car-container";
import LoginContainer from '../containers/login-container/login-container'

class mapScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <MapContainer test='test'/>
                <Animated.View style={styles.topContainer}>
                    <InputAddressContainer/>
                </Animated.View>
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

export const Routes = createBottomTabNavigator({
    Map: {
        screen: mapScreen,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <FontAwesome name="map-o" size={20} color={tintColor}/>
        }
    },
    Profile: {
        screen: createStackNavigator({
            profile: {
                screen: LoginContainer,
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
        bottom: 0,
        position: 'absolute',
        padding: 30,
    },
    bottomContainer: {
        position: 'absolute',
        padding: 30,
        bottom: 0
    },
});

