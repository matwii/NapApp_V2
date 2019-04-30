import React from 'react';
import PropTypes from 'prop-types';
import CarComponent from '../car-component/car-component';
import {View} from 'react-native'


const CarListComponent = ({cars, bookedRide}) => {
    console.log(bookedRide);
    return (
        cars.map(car => (
            <CarComponent
                coordinates={car.coordinate}
                id={car.id}
                regNr={car.regNr}
                {...car}
                key={car.id}
                bookedRide={bookedRide ? bookedRide : null}
            />
        ))
    );
};

CarListComponent.propTypes = {
    cars: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        regNr: PropTypes.string,
        coordinates: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
        }),
    })),
    bookedCar: PropTypes.shape({
        id: PropTypes.number,
        regNr: PropTypes.string,
        coordinates: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
        }),
    }),
};

export default CarListComponent;
