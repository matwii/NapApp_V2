import React from 'react';
import PropTypes from 'prop-types';
import CarComponent from '../car-component/car-component';


const CarListComponent = ({cars, bookedCar, carBooked}) => {
    console.log('cars: ' + cars);
    if (carBooked) {
        return (
            <CarComponent
                coordinates={bookedCar.coordinate}
                id={bookedCar.id}
                regNr={bookedCar.regNr}
                {...bookedCar}
                key={bookedCar.id}
            />
        );
    }
    return (
        cars.map(car => (
            <CarComponent
                coordinates={car.coordinate}
                id={car.id}
                regNr={car.regNr}
                {...car}
                key={car.id}
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
    carBooked: PropTypes.bool.isRequired,
};

export default CarListComponent;
