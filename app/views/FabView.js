import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as variables from '../styles/variables';

export default class FabView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActionButton buttonColor={variables.buttonFab}>
          <ActionButton.Item buttonColor={variables.buttonIconFab} title="New Todo" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }

}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        backgroundColor: '#f3f3f3'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});