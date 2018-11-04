import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 10,
    backgroundColor: '#EEE',
  },
  imageContainer: {
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  input: {
    fontSize: 16,
    height: 45,
    margin: 10,
    backgroundColor: '#EEE',
  },
  okButton: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDD',
    margin: 10,
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
  linkText: {
    fontSize: 14,
    color: 'blue',
  },
});
