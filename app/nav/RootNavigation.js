import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';

import Main from './../screens/MainScreen';
import Splash from './../screens/SplashScreen';
import Login from './../screens/LoginScreen';
import Thinh from './../screens/ThinhScreen';
import SignUp from './../screens/SignUpScreen';

import * as variables from './../styles/variables'

const RootNavigation = StackNavigator(
    {
        Splash: {
            screen: Splash,
            navigationOptions: {
                header: null
            }
        },
        Main: {
            screen: Main,
            navigationOptions: {
                header: null
                // headerStyle: {
                //     backgroundColor: variables.primaryColor
                // }
            }
        },
        Thinh: {
            screen: Thinh,
            navigationOptions: {
                header: null
                // headerStyle: {
                //     backgroundColor: variables.primaryColor
                // }
            }
        },
        Login: {
            screen: Login,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: variables.primaryColor
                }
            }
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: {
                header: null
            }
        },
    },
    {
        initialRouteName: 'Splash',
    }
);

export default RootNavigation