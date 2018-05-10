/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import {
    StyleSheet,
    View,
    StatusBar,
    Button,
    Platform
} from 'react-native';

import store from './redux/store';
import AppWithNavigationState from './AppWithNavigationState';
import firebase from 'react-native-firebase';
import * as variables from './styles/variables'

Platform.OS != "ios" && StatusBar.setBackgroundColor(variables.darkenPrimaryColor);
StatusBar.setBarStyle('light-content');

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <AppWithNavigationState />
                    {/* <Button title="logout" onPress={() => {
                        firebase.auth().signOut();
                    }} /> */}
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
