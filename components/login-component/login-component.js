import React from 'react';
import {View, TextInput, TouchableHighlight, Text, Image} from 'react-native';
import {SocialIcon, Button} from 'react-native-elements'
import styles from './styles';

const LoginComponent = () => (
    <View style={styles.container}>
        <TextInput
            placeholder="Username"
            style={styles.input}
        />
        <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
        />
        <Button
            title='Log in'
            rounded
            buttonStyle={{
                backgroundColor: "rgb(30,144,255)"
            }}
        />
        <View style={styles.bottomContainer}>
            <TouchableHighlight>
                <Text style={styles.linkText}>Sign up</Text>
            </TouchableHighlight>
            <TouchableHighlight>
                <Text style={styles.linkText}>Forgotten password?</Text>
            </TouchableHighlight>
        </View>
        <SocialIcon
            title='Sign In With Facebook'
            button
            type='facebook'
            onPress={() => console.log('onPress')}
        />
        <SocialIcon
            title='Sign In With Google'
            button
            type='google-plus-official'
        />
    </View>
);


export default LoginComponent;
