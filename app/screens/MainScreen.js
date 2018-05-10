import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TabView from './../views/TabView';

export default class MainScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TabView />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})