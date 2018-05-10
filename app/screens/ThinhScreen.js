/**
 * Màn hình thả tính 
 * Đi đớp thính
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ThinhView from './../views/ThinhView';

export default class ThinhScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<ThinhView />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})