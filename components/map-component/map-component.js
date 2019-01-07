import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';
import {MapView} from 'expo';
import { View } from 'react-native'
import CarListContainer from '../../containers/car-list-container/car-list-container';
import DirectionsContainer from '../../containers/directions-container/directions-container';
import styles from './styles';

class MapComponent extends React.Component {
    async componentWillMount() {
        this.props.getLocation();
        this.props.getCars();
    }

    render() {
        return (
            <MapView
                region={this.props.region}
                style={styles.map}
                onRegionChangeComplete={reg => this.props.onRegionChange(reg)}
            >
                {this.props.destination &&
                <MapView.Marker
                    coordinate={this.props.destination}
                />
                }
                {this.props.pickup &&
                <MapView.Marker
                    coordinate={this.props.pickup}
                    title="Pickup location"
                >
                    <Image
                        style={{width: 7, height: 7}}
                        source={require('./location.png')}
                    />
                </MapView.Marker>
                }
                <DirectionsContainer />
                <CarListContainer />
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
    getLocation: PropTypes.func.isRequired,
    getCars: PropTypes.func.isRequired,
};

export default MapComponent;
