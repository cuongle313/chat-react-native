import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './../redux/user/action';
import { bindActionCreators } from 'redux'
import firebase from 'react-native-firebase';

class ThinhView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneNumber: '+84'
		}
	}
	componentDidMount = () => {
		
	};

	render() {
		const { phoneNumber } = this.state;
		return (

			this.props.user.myCrushPhoneNumber
				? (
					<View style={{ padding: 25 }}>
						<Text>Bạn đang chờ xác nhận của người ấy</Text>
						<Text>{this.props.user.myCrushPhoneNumber}</Text>
						<Button title="Hủy" onPress={() => {
							this.props.cancelCurrentCush();
						}} />
					</View>
				)
				: (
					<View style={{ padding: 25 }}>

						<Text>Nhập số điện thoại của người ấy</Text>
						<TextInput
							keyboardType="phone-pad"
							// autoFocus
							style={{ height: 40, marginTop: 15, marginBottom: 15 }}
							onChangeText={value => this.setState({ phoneNumber: value })}
							placeholder={'Số điện thoại ... '}
							value={phoneNumber}
						/>
						<Button title="Kết bạn" onPress={() => {
							console.log(this.props);
							this.props.setFriend(phoneNumber);
						}} />
					</View>

				)

		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ThinhView);
