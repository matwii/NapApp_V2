import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {Avatar} from 'react-native-elements'

export default class UserProfileView extends Component {

    render() {
        let {user} = this.props;
        console.log(user);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Avatar
                            rounded
                            size="large"
                            title={user.name.split(" ").map((n)=>n[0]).join(".")}
                            avatarStyle={{backgroundColor: '#b5213c'}}
                        />

                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.userInfo}>{user.email}</Text>
                    </View>
                </View>

                <View style={styles.body}>
                    <Text>
                        No rides for this user
                    </Text>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#1faadb",
    },
    headerContent:{
        padding:30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
    },
    name:{
        fontSize:22,
        color:"#000000",
        fontWeight:'600',
    },
    userInfo:{
        fontSize:16,
        color:"white",
        fontWeight:'600',
    },
    body:{
        alignItems:'center',
    },
    item:{
        flexDirection : 'row',
    },
    infoContent:{
        flex:1,
        alignItems:'flex-start',
        paddingLeft:5
    },
    iconContent:{
        flex:1,
        alignItems:'flex-end',
        paddingRight:5,
    },
    icon:{
        width:30,
        height:30,
        marginTop:20,
    },
    info:{
        fontSize:18,
        marginTop:20,
        color: "#FFFFFF",
    }
});