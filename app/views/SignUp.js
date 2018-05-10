import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import TextInput2 from '../components/inputText';
import firebase from 'react-native-firebase';
import {
    StackNavigator,
  } from 'react-navigation';
import Login from './LoginView';
import { Button } from 'react-native-elements'

const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

export default class SignUpFirebase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            password: '+84',   
            loading: false,
            confirmResult: null,
        };
    }
        componentDidMount() {
            this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.setState({
                        name: '',
                        phone: '',
                        email: '',
                        password: '+84',
                        loading: false,
                        confirmResult: null,
                    });
                }
            });
        }
    
        componentWillUnmount() {
            if (this.unsubscribe) this.unsubscribe();
        }

        async RegisterApp() {
            this.setState({ error: "", loading: true });
            const { email, password, name, phone } = this.state;    
            firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(confirmResult => {
				this.setState({
					confirmResult,
					message: 'Đăng kí thành công'
				})
			})
			.catch(error => this.setState({
				message: `Đăng kí lỗi: ${error.message}`
			}));
            await AsyncStorage.setItem("email", email);
            await AsyncStorage.setItem("name", name);
            await AsyncStorage.setItem("password", password);
            await AsyncStorage.setItem("phone", phone);
        }
        renderMessage() {
            const { message } = this.state;
            if (!message.length) return null;
            return (
                <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
            );
        }
          
    render() {
        const { user, confirmResult } = this.state;
		return (
			<View style={styles.container}>
                <KeyboardAvoidingView behavior="padding">
                <View style ={styles.boderSignup}>
                    <TextInput2 
                        placeholder="Name" 
                        onChangeText={name => this.setState({name})}                        
                    />
                    <TextInput2 
                        placeholder="Phone" 
                        onChangeText={phone => this.setState({phone})}                        
                    />
                    <TextInput2 
                        placeholder="Email" 
                        onChangeText={email => this.setState({email})}        
                    />
                    <TextInput2 
                        placeholder="Password" 
                        onChangeText={password => this.setState({password})}
                        secureTextEntry                         
                    />
                    <Button
                        title="Sign Up"
                        // loading
                        // loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                        buttonStyle={{
                        backgroundColor: "rgba(92, 99,216, 1)",
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 25  
                        }}
                        onPress={this.RegisterApp.bind(this)}
                    />
                </View>
                <View>
                    <View style={styles.loginWrap}>
                        <Text style={styles.accountText}>You have an account?</Text>
                    </View>
                    <View>
                    <Button
                        title="Login"
                        // loading
                        // loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                        buttonStyle={{
                            backgroundColor: "red",
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 25  
                            
                        }}
                        onPress={() => this.props.navigation.navigate('Login')}
                    />
                    </View>
                 </View>

                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    boderSignup: {
        margin: 10,
    },   
    login: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
      accountText: {
        // color: "#D8D8D8"
        color: "#000"
      },
      loginWrap: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
        marginTop: 15,
      },
      loginLinkText: {
        color: "#FFF",
        marginLeft: 5,
      }
})