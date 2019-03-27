import {Dimensions, StyleSheet} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: 'white',
        width: 300,
        marginTop: 10,
    },
    infoText: {
        padding: 10,
        fontSize: 14,
        backgroundColor: 'white',
    },
    labelText: {
        fontSize: 12,
        color: '#AAA',
    },
    button: {
        alignItems: 'center',
        padding: 10,
        paddingRight: 20,
        width: 50,
        backgroundColor: 'white',
    },
    buttonText: {
        fontSize: 12,
        color: 'black',
    },
    list: {
        borderTopWidth: 1,
        borderColor: '#D3D3D3',
        backgroundColor: '#fff',
        width: SCREEN_WIDTH-20,
        borderRadius: 10,
    }
});
