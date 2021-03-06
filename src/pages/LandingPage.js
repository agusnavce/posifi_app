import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class LandingPage extends Component {
    onGuestPress() {
        Actions.choices();
    }
   
    render() {
        return (
            <ImageBackground
                source={require('../assets/img/mnav.png')}
                style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.title}>
                    </View>
                    <View style={styles.enter}>
                        <TouchableOpacity style={styles.enterBtn} onPress={this.onGuestPress.bind(this)}>
                            <Text style={styles.enterText}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        ) 
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    },
    container: {
        flex: 1, 
        display: 'flex',
        backgroundColor: 'rgba(0,0,0,.4)'
    },
    title: {
        flex: .7,
        flexDirection: 'row'
    },
    titleBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // to center item
        marginLeft: 60,
        marginRight: 60,
    },
    h1: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#fff'
    },
    enter: {
        flex : .3,
        flexDirection : 'row',
        alignItems : 'flex-end'
    },
    enterBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#9e9e9e'
    },
    enterText: {
        fontSize: 24,
        fontWeight: '700',
        color: 'black'
    }
});
