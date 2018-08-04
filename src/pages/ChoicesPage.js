import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

export default class ChoicesPage extends Component {

    onExhibitionsPress = () => {
        Actions.tours();
    }

    onGeneralInfoPress = () => {
        Actions.generalInfo();
    }

    onProgramsPress = () => {
        Actions.programs();
    }

    onShopPress = () => {
        Linking.openURL('http://www.cafamshop.org/')
    }

    render() {
        return (
            <LinearGradient colors={['#fff','#d9d9d9']} style={styles.LinearGradient}>
                <View style={styles.textBoxContainer}>
                    <Image source={require('../assets/img/mnav2.png')} />
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.onExhibitionsPress.bind(this)}>
                            <Text style={styles.textStyle}>Exhibición</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle1} onPress={this.onGeneralInfoPress.bind(this)}>
                            <Text style={styles.textStyle}>Información General</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle2} onPress={this.onProgramsPress.bind(this)}>
                            <Text style={styles.textStyle}>Programas</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.buttonStyle3} onPress={this.onShopPress.bind(this)}>
                            <Text style={styles.textStyle}>Shop</Text>
                    </TouchableOpacity> */}
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    LinearGradient: {
        flex: 1,
        display: 'flex'
    },
    textBoxContainer: {
        flex: .5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 70
    },
    choicesText: {
        fontSize: 50,
        fontWeight: '600',
        color: '#fff'
    },
    buttonsContainer: {
        flex: .5,
        marginRight: 10,
        marginLeft: 10
    },
    buttonStyle: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e62e00',
        marginBottom: 20
    },
    buttonStyle1: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cccc00',
        marginBottom: 20
    },
    buttonStyle2: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0066cc',
        marginBottom: 20
    },
    buttonStyle3: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FE4A49',
        marginBottom: 20
    },
    textContainer: {
        flex: 1,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 25,
        color: '#fff',
        letterSpacing: 1.5
    }
});
