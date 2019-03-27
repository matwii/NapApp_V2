import React from 'react';
import {Button, Text} from "react-native-elements";
import {MaterialIcons} from 'react-native-vector-icons';

import styles from './styles';

const CurrentLocation = ({getCurrentLocation}) => (
        <Button
            icon={
                <MaterialIcons
                    name="my-location"
                    size={18}
                    color="black"
                />
            }
            onPress={() => getCurrentLocation()}
            buttonStyle={styles.currentLocationStyle}
            containerStyle={styles.currentLocationContainerStyle}
        />
);

export default CurrentLocation;
