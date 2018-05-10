import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';

import firebase from 'react-native-firebase';

const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

export default class PhoneAuthTest extends Component {
	constructor(props) {
		super(props);
		this.unsubscribe = null;
		this.state = {
			message: '',
			codeInput: '',
			phoneNumber: '+84',
			confirmResult: null,
		};
	}

	componentDidMount() {
		this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				// User has been signed out, reset the state
				this.setState({
					user: null,
					message: '',
					codeInput: '',
					phoneNumber: '+84',
					confirmResult: null,
				});
			}
		});
	}

	componentWillUnmount() {
		if (this.unsubscribe) this.unsubscribe();
	}

	signIn = () => {
		const { phoneNumber } = this.state;
		this.setState({ message: 'Đang gửi mã xác nhận...' });
		firebase.auth().signInWithPhoneNumber(phoneNumber)
			.then(confirmResult => {
				this.setState({
					confirmResult,
					message: 'Mã xác nhận đã gửi!'
				})
			})
			.catch(error => this.setState({
				message: `Đăng nhập lỗi: ${error.message}`
			}));
	};

	confirmCode = () => {
		const { codeInput, confirmResult } = this.state;
		if (confirmResult && codeInput.length) {
			confirmResult.confirm(codeInput)
				.then((user) => {
					this.setState({
						message: 'Xác nhận thành công!'
					});
				})
				.catch(error => this.setState({
					message: `Lỗi mã xác nhận: ${error.message}`
				}));
		}
	};

	renderPhoneNumberInput() {
		const { phoneNumber } = this.state;
		return (
			<View style={{ padding: 25 }}>
				<Text>Nhâp số điện thoại của bạn:</Text>
				<TextInput
					autoFocus
					style={{ height: 40, marginTop: 15, marginBottom: 15 }}
					onChangeText={value => this.setState({ phoneNumber: value })}
					placeholder={'Số điện thoại ... '}
					value={phoneNumber}
				/>
				<Button title="Đăng nhập" color="green" onPress={this.signIn} />
			</View>
		);
	}

	renderMessage() {
		const { message } = this.state;
		if (!message.length) return null;
		return (
			<Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
		);
	}

	renderVerificationCodeInput() {
		const { codeInput } = this.state;
		return (
			<View style={{ marginTop: 25, padding: 25 }}>
				<Text>Nhập mã xác nhận:</Text>
				<TextInput
					autoFocus
					style={{ height: 40, marginTop: 15, marginBottom: 15 }}
					onChangeText={value => this.setState({ codeInput: value })}
					placeholder={'Code ... '}
					value={codeInput}
				/>
				<Button title="Xác nhận" color="#841584" onPress={this.confirmCode} />
			</View>
		);
	}

	
	render() {
		const { user, confirmResult } = this.state;
		return (
			<View style={{ flex: 1 }}>
				{!confirmResult && this.renderPhoneNumberInput()}
				{this.renderMessage()}
				{confirmResult && this.renderVerificationCodeInput()}
			</View>
		);
	}
}