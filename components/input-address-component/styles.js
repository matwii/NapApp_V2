import { StyleSheet } from 'react-native';

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
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    backgroundColor: 'white',
  },
  longButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 45,
    marginTop: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 16,
  },
});
