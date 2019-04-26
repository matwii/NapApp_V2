import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  infoText: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 300,
    height: 45,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 12,
    color: 'black',
  },
    loginButtonContainerStyle: {
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: 'transparent',
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 2,
        width: 120
    },
    loginButtonStyle: {
        borderRadius: 10,
        height: 40,
    },
    loginTitleStyle: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
    },
    cancelButtonTitleStyle: {
        fontSize: 12,
        color: 'grey',
        fontWeight: 'bold',
    },
    cancelButtonStyle: {
        height: 40,
        borderRadius: 10,
        backgroundColor: '#F5F5F5'
    },
});
