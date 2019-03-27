import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Image } from 'react-native';
import {MapView} from 'expo';
import Spinner from '../../components/spinner/spinner';
import CarListContainer from '../../containers/car-list-container/car-list-container';
import DirectionsContainer from '../../containers/directions-container/directions-container';
import styles from './styles';

class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(0.5);
        this.props.getCurrentLocation();
        this.props.getCars();
    }

    componentDidMount() {
        this.animateLocation();
    }


    /**
     * starts animation for current location. This is to indicate better where the user are.
     */
    animateLocation(){
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.springValue, {
                    toValue: 1,
                    duration: 1000,
                    delay: 1000,
                }),
                Animated.timing(this.springValue, {
                    toValue: 0.5,
                    duration: 1000,
                })
            ]),
        ).start()
    }

    render() {
        if (this.props.isLoading) {
            return (
                <Spinner/>
            )
        }
        return (
            <MapView
                region={this.props.region}
                style={styles.map}
                onRegionChangeComplete={reg => this.props.active && this.props.onRegionChange(reg)}
            >
                {this.props.destination &&
                <MapView.Marker
                    coordinate={this.props.destination}
                    tracksViewChanges={false}
                    pinColor={'red'}
                />
                }
                {this.props.pickup && !this.props.active &&
                <MapView.Marker
                    coordinate={this.props.pickup}
                    tracksViewChanges={false}
                    pinColor={'green'}
                />
                }
                {this.props.currentLocation &&
                <MapView.Marker
                    coordinate={this.props.currentLocation}
                    title="Current location"
                    tracksViewChanges={false}
                >
                    <Animated.Image style={{width: 30, height: 30, transform: [{scale: this.springValue }] }} source={require('./location.png')} />
                </MapView.Marker>
                }
                <DirectionsContainer/>
                <CarListContainer/>
            </MapView>
        );
    }
}


MapComponent.propTypes = {
    region: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        latitudeDelta: PropTypes.number.isRequired,
        longitudeDelta: PropTypes.number.isRequired,
    }).isRequired,
    destination: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
    }),
    pickup: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
    }),
    onRegionChange: PropTypes.func.isRequired,
    getCurrentLocation: PropTypes.func.isRequired,
    getCars: PropTypes.func.isRequired,
};

export default MapComponent;
