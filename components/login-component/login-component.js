import React from 'react';
import { View, TextInput, TouchableHighlight, Text, Image } from 'react-native';
import styles from './styles';

const LoginComponent = () => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image
        style={{ width: 80, height: 80 }}
        source={require('../car-component/car.png')}
      />
    </View>
    <TextInput
      placeholder="Username"
      style={styles.input}
    />
    <TextInput
      placeholder="Password"
      style={styles.input}
      secureTextEntry
    />
    <TouchableHighlight
      style={styles.okButton}
    >
      <Text style={styles.buttonText}>OK</Text>
    </TouchableHighlight>
    <View style={styles.bottomContainer}>
      <TouchableHighlight>
        <Text style={styles.linkText}>Sign up</Text>
      </TouchableHighlight>
      <TouchableHighlight>
        <Text style={styles.linkText}>Forgotten password?</Text>
      </TouchableHighlight>
    </View>
  </View>
);


export default LoginComponent;
