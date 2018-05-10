import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import CardStack, { Card } from 'react-native-card-stack-swiper';
// import * as img from '../common/Image';

export default class Slider extends Component {
  render() {
    return (
      <CardStack style={styles.container} ref={swiper => { this.swiper = swiper }}>
        <Card style={styles.background}>
          <Image source={require('../public/images/any.jpg') }/>
        </Card>
        <Card style={styles.background}>
          <Image source={require('../public/images/any.jpg') } />
        </Card>
        <Card style={styles.background}>
          <Image source={require('../public/images/any.jpg') } />
        </Card>
      </CardStack>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
  },
  // card:{
  //   width: '100%',
  //   height: '100%'
  // },    
    background: {
    width: '100%',
    height: '100%',
    position: 'relative',
},
});