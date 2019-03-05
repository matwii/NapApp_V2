import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'center',
        marginBottom: 10,
        width: '80%'
    },
    mainContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    loginButtonStyle: {
        borderRadius:25,
        elevation: 2,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
    },
    loginButtonContainerStyle: {
        alignSelf: 'center',
        width: '60%',
        marginBottom: 20
    },
    profileTopContainerStyle: {
        height: '35%',
        backgroundColor: '#1E90FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkedInContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
