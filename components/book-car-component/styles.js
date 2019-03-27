import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonContainerStyle: {
        width: '48%',
        marginTop: 10,
        backgroundColor: 'transparent',
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 1,
    },
    bookButtonStyle: {
        height: 36
    },
    cancelButtonStyle: {
        height: 36,
        backgroundColor: '#F5F5F5'
    },
    bookButtonTitleStyle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    cancelButtonTitleStyle: {
        fontSize: 16,
        color: 'grey',
        fontWeight: 'bold',
    },
    cancelButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        borderRadius: 10,
        marginTop: 10,
        height: 45,
    },
    buttonText: {
        fontSize: 12,
        color: 'white',
    },
});
