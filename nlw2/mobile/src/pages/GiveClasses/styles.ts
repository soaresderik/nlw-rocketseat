import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        justifyContent: 'center',
        backgroundColor: '#8257e5'
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 32,
        lineHeight: 37
    },
    description: {
        fontFamily: 'Poppins_400Regular',
        color: '#d4c2ff',
        marginTop: 24,
        fontSize: 16,
        lineHeight: 26,
        maxWidth: 240
    },
    okButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#04d361',
        height: 58,
        marginVertical: 40,
        borderRadius: 8
    },
    okButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Archivo_700Bold'
    }
});

export default styles;