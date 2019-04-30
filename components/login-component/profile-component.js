import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    RefreshControl
} from 'react-native';
import moment from 'moment'
import {Avatar, ListItem} from 'react-native-elements'

export default class UserProfileView extends Component {
    state = {
        refreshing: false,
    };

    renderRidesList = () => {
        const {rides} = this.props;
        rides.sort((a,b) => new Date(b.booked_time) - new Date(a.booked_time));
        if (rides.length > 0){
            return this.props.rides.map((item, i) =>
                <ListItem
                    key={i}
                    title={`Order#${item.ride_id}\n${item.brand} ${item.modell}\n${moment(item.booked_time).format('LLL')}`}
                    rightTitle={`status: ${item.status_name}`}
                    rightTitleStyle={item.status_id === 1 || item.status_id === 2 ? styles.greyText : styles.greenText}
                    bottomDivider
                />)
        }
        return  <Text style={{alignSelf: 'center'}}>No rides for this user</Text>
    };

    _onRefresh = async () => {
        this.setState({refreshing: true});
        await this.props.fetchRides();
        this.setState({refreshing: false});
    };

    render() {
        let {user} = this.props;
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

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>
                    {this.renderRidesList()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#1faadb",
    },
    container: {
        flex: 1
    },
    greyText: {
        color: 'grey'
    },
    greenText: {
        color: 'green'
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