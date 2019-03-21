import {StyleSheet, Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    linkedInContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectorContainer: {
        flex: 1,
        alignItems: 'center',
    },
    titleContainer: {
        height: 100,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    helpContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        color: 'white',
        fontSize: 30,
        textShadowColor:'black',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius: 10,
    },
    categoryText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontFamily: 'light',
        backgroundColor: 'transparent',
        opacity: 0.54,
    },
    selectedCategoryText: {
        opacity: 1,
    },
    rowSelector: {
        height: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH - 30,
        borderRadius: 10,
        paddingTop: 18,
        paddingBottom: 18,
        alignItems: 'center',
    },
    loginButton: {
        borderRadius: 10,
        height: 40,
        width: 200,
    },
    loginTextButton: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    loginButtonContainerStyle: {
        alignSelf: 'center',
        width: SCREEN_WIDTH - 30,
        height: 40
    },
    selected: {
        position: 'absolute',
        borderRadius: 50,
        height: 0,
        width: 0,
        top: -5,
        borderRightWidth: 70,
        borderBottomWidth: 70,
        borderColor: 'white',
        backgroundColor: 'white',
    },
});
