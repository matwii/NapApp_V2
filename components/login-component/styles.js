import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'center',
        marginBottom: 10
    },
    mainContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    loginButtonStyle: {
        borderColor: "black",
        borderRadius: 20,
        elevation: 3,
    },
    loginButtonContainerStyle: {
        alignSelf: 'center',
        width: '90%',
        marginBottom: 20
    },
    profileTopContainerStyle: {
        height: '35%',
        backgroundColor: '#1E90FF',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
