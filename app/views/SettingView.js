import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import Profile from './ProfileView';

export default class SettingView extends Component {
  render() {
    return (
      <View>
        <Profile />
      </View>
    );
  }
}
