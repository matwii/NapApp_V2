import React, {Component} from 'react';
import {View, LayoutAnimation, TouchableHighlight, Platform} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from './styles';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import PlacesSearchComponent from '../places-search-component/places-search-component';

class InputAddressComponent extends Component {
    state = {
        ...this.props,
        isModalVisible: false,
        editPickup: false
    };

    componentDidUpdate(oldProps) {
        const newProps = this.props;
        if (oldProps !== newProps) {
            this.setState({...newProps})
        }
    }

    _toggleModal = (status) => {
        this.setState({isModalVisible: !this.state.isModalVisible, editPickup: status});
    };

    render() {
        let {
            active, type, pickupCoordinates, destinationCoordinates, destinationAddress, cars,
            mustGetNewCar, getCoordinates, getCar, address, isLoading, isAuthenticated, editPickup, getPickupLocation
        } = this.state;
        if (!active) {
            return null
        }
        let getNewCar = mustGetNewCar;
        if (type === 'Pickup') {
            getNewCar = false;
        }
        Platform.OS === 'ios' && LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() => {
                    this._toggleModal(true);
                }}
                                    style={styles.topContainer} >
                    <View style={styles.topContainer} pointerEvents="none">
                    <Input
                        placeholder='Travel from:'
                        containerStyle={styles.inputContainer}
                        inputContainerStyle={{borderBottomColor: 'transparent'}}
                        value={isLoading ? 'Getting address...' : address}
                        label='Travel from:'
                        pointerEvents="none"
                    />
                    </View>
                </TouchableHighlight>
                <Button
                    buttonStyle={styles.loginButtonStyle}
                    containerStyle={styles.loginButtonContainerStyle}
                    title={isAuthenticated ? "ORDER CAR" : 'SIGN IN TO BOOK A CAR'}
                    onPress={() => this._toggleModal(false)}
                    titleStyle={styles.loginTitleStyle}
                    disabled={!isAuthenticated}

                >
                </Button>
                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackButtonPress={() => this._toggleModal(false)}
                    onSwipeComplete={() => this._toggleModal(false)}
                    swipeDirection="left"
                >
                    <View style={{flex: 1}}>
                        <View style={{height: '20%'}}>
                            <Button
                                icon={
                                    <Icon
                                        name="arrow-left"
                                        size={15}
                                        color="black"
                                    />
                                }
                                onPress={() => this._toggleModal(false)}
                                buttonStyle={styles.backButtonStyle}
                                containerStyle={styles.backButtonContainerStyle}
                            />
                            <Text h4 style={{color: 'white', alignSelf: 'center'}}>
                                {`Where do you wanna travel${editPickup ? ' from' : ''}?`}
                            </Text>
                            <View/>
                        </View>
                        <PlacesSearchComponent
                            toggleModal={this._toggleModal}
                            type={type}
                            address={address}
                            pickupCoordinates={pickupCoordinates}
                            destinationCoordinates={destinationCoordinates}
                            destinationAddress={destinationAddress}
                            cars={cars}
                            getNewCar={getNewCar}
                            getCoordinates={getCoordinates}
                            getCar={getCar}
                            editPickup={editPickup}
                            getPickupLocation={getPickupLocation}
                        />
                    </View>
                </Modal>
            </View>
        )
    }
}

InputAddressComponent.propTypes = {
    active: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    pickupCoordinates: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }).isRequired,
    destinationCoordinates: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }),
    destinationAddress: PropTypes.string.isRequired,
    cars: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        regNr: PropTypes.string,
        coordinates: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
        }),
    })),
    mustGetNewCar: PropTypes.bool.isRequired,
    getCoordinates: PropTypes.func.isRequired,
    chooseOnMap: PropTypes.func.isRequired,
    getCar: PropTypes.func.isRequired,
};

export default InputAddressComponent;
