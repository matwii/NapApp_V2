import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    addressInput: {
        fontSize: 16,
        height: 45,
        width: 250,
        backgroundColor: '#EEE',
    },
    okButton: {
        justifyContent: 'center',
        width: 45,
        height: 45,
    },
    longButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        height: 40,
    },
    buttonText: {
        fontSize: 16,
    },
    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'center',
    },
    loginButtonStyle: {
        borderRadius: 10,
        height: 40
    },
    loginTitleStyle: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
    },
    loginButtonContainerStyle: {
        alignSelf: 'center',
        width: '100%',
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: 'transparent',
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 2,
    },
    backButtonStyle: {
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 20
    },
    backButtonContainerStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        marginBottom: 10
    }
});
