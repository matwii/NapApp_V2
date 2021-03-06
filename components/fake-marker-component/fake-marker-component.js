import React from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';


const FakeMarkerComponent = ({ active }) => {
    return (
        <View pointerEvents="none" style={{position: 'absolute', top: -10, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require('./icons8-marker.png')}
            pointerEvents="none"
          />
        </View>
    );
};

FakeMarkerComponent.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default FakeMarkerComponent;
