import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('SpecicalOne/app/public/images/a.jpg')} style={styles.background}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
})