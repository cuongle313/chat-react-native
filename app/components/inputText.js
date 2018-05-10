import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default class Text_Input extends Component {
    render() {
        return (
            <TextInput {...this.props}
                style = {styles.input}
                autoCorrect={false}  
                underlineColorAndroid='transparent' 
            />
        );
    }
}

const styles = StyleSheet.create({
    input: {
        margin: 15,
        height: 50,
        borderColor: '#888',
        borderWidth: 1,
        borderRadius: 25,
          
      },
})