import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import PhoneInput from '../../components/auth/PhoneInput';

import colors from '../../assests/styles';
import Signup from '../../components/auth/Signup';
import ConfirmPassword from '../../components/auth/ConfirmPassword';
import OtpAndroid from '../../components/auth/OtpAndroid';
import Password from '../../components/auth/Password';
import ChooseCateg from '../../components/auth/ChooseCateg';
import UpdateName from '../../components/Settings/UpdateName';

const AuthStack = createStackNavigator(
  {
    PhoneInput: {
      screen: PhoneInput,
      navigationOptions: ({navigation}) => {
        return {
          header: null,
        };
      },
    },
    Signup: {
      screen: Signup,
      navigationOptions: ({navigation}) => {
        return {
          header: null,
        };
      },
    },

    Confirm: {
      screen: ConfirmPassword,
      navigationOptions: ({navigation}) => {
        return {
          header: null,
        };
      },
    },
    OtpAndroid: {
      screen: OtpAndroid,
      navigationOptions: ({navigation}) => {
        return {
          header: null,
        };
      },
    },
    Password: {
      screen: Password,
      navigationOptions: ({navigation}) => {
        return {
          header: null,
        };
      },
    },
    ChooseCateg: {
      screen: ChooseCateg,
      navigationOptions: ({navigation}) => {
        return {
          header: null,
        };
      },
    },
    UpdateName: {
      screen: UpdateName,
      navigationOptions: ({navigation}) => {
        return {
          header: null,
        };
      },
    },
  },
  {
    // initialRouteName: 'Signup',
  },
);

export default AuthStack;
