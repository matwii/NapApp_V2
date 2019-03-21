import React, {Component} from 'react';
import {View, Keyboard, Animated, Dimensions} from 'react-native';
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

    };
    moveAnimation = new Animated.Value(0)

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => this.animate('up')
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => this.animate('down')
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props;
        if (oldProps !== newProps) {
            this.setState({...newProps})
        }
    }

    _toggleModal = () =>
        this.setState({isModalVisible: !this.state.isModalVisible});


    animate = (direction) => {
        const {height} = Dimensions.get('window')
        if (direction === 'up') {
            Animated.spring(this.moveAnimation, {
                toValue: -(height / 4),
            }).start();
        } else {
            Animated.spring(this.moveAnimation, {
                toValue: 0,
            }).start();
        }
    };

    render() {
        let {
            active, type, pickupCoordinates, destinationCoordinates, destinationAddress, cars,
            mustGetNewCar, getCoordinates, chooseOnMap, getCar, address, isLoading
        } = this.state;
        if (!active) {
            return null
        }
        let getNewCar = mustGetNewCar;
        if (type === 'Pickup') {
            getNewCar = false;
        }

        return (
            <View style={styles.container}>
                <Animated.View
                    style={[styles.topContainer, {transform: [{translateY: this.moveAnimation}]}]}
                >
                    <Input
                        placeholder='Travel from:'
                        containerStyle={styles.inputContainer}
                        inputContainerStyle={{borderBottomColor: 'transparent'}}
                        onSubmitEditing={async (event) => {
                            getCoordinates(event.nativeEvent.text, type, pickupCoordinates, destinationCoordinates, destinationAddress, cars) &&
                            getCar(cars, pickupCoordinates, getNewCar)
                        }}
                        onChangeText={address => this.setState({address})}
                        value={isLoading ? 'Getting address...' : address}
                        label='Travel from:'
                    />
                </Animated.View>
                <Button
                    buttonStyle={styles.loginButtonStyle}
                    containerStyle={styles.loginButtonContainerStyle}
                    title="Order Car"
                    onPress={this._toggleModal}
                    raised
                    titleStyle={{fontWeight: 'bold'}}
                >
                    <Text>Choose {type.toLowerCase()} on map</Text>
                </Button>
                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackButtonPress={this._toggleModal}
                    onSwipeComplete={this._toggleModal}
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
                                onPress={this._toggleModal}
                                buttonStyle={styles.backButtonStyle}
                                containerStyle={styles.backButtonContainerStyle}
                            />
                            <Text h4 style={{color: 'white', alignSelf: 'center'}}>
                                Where do you wanna travel?
                            </Text>
                            <View/>
                        </View>
                        <PlacesSearchComponent
                            toggleModal={this._toggleModal}
                            type={type}
                            pickupCoordinates={pickupCoordinates}
                            destinationCoordinates={destinationCoordinates}
                            destinationAddress={destinationAddress}
                            cars={cars}
                            getNewCar={getNewCar}
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
