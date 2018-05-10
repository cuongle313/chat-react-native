import React, { Component } from 'react';
import {  View } from 'react-native';
import PropTypes from 'prop-types';

import contactData from '../components/contact.json'

import Profile from '../components/Profile'

export default class componentName extends Component {
  render() {
    return (
      <View>
        <Profile {...contactData} />
      </View>
    );
  }
}

