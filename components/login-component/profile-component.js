import React from 'react';
import { View, ScrollView} from "react-native";
import {Avatar, Text} from 'react-native-elements'
import styles from './styles'

class ProfileComponent extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        let {user} = this.props;
        let avatar;
        if (user.google_image) {
            avatar = (
                <Avatar
                    rounded
                    size="large"
                    source={{uri: user.google_image}}
                />
            )
        } else {
            avatar = (
                <Avatar
                    rounded
                    size="large"
                    title={user.name.split(" ").map((n)=>n[0]).join(".")}
                />
            )
        }
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.profileTopContainerStyle}>
                    {avatar}
                    <Text h3 style={{color: 'white'}}>{user.name}</Text>
                </View>
                <ScrollView style={{backgroundColor: 'white'}}>
                    <Text>{user.name}</Text>
                </ScrollView>
            </View>
        )
    }
}

export default ProfileComponent;
