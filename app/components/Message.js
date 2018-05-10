import React, { Component } from 'react';
import {  View, Text, StyleSheet} from 'react-native';
import * as variables from './../styles/variables'


export default class Message extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>{this.props.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingVertical: 10,
        backgroundColor: variables.messColorSend,    
        borderRadius: 25,    
        marginBottom: 10,
        maxWidth: '75%'
    },
    textStyle:{
      color: variables.primaryColor,
      paddingLeft: 10,
    }
})