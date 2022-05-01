import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Alert,
} from 'react-native';

import colors from '../../assests/styles';
const {height: DEVICE_HEIGHT} = Dimensions.get('window');

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signUp, signIn} from '../../actions/auth';

import Loader from '../general/Loader';
import DisableKeyboard from '../general/DismissKeybaord';

class ConfirmPassword extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      loader: false,
    };
  }
  componentDidMount = () => {};
  handler = () => {
    const {password} = this.state;
    const {navigation} = this.props;
    if (password.length < 8) {
      Alert.alert('Invalid', 'Password must be 8 cheracters long');
      this.password.focus();
      return false;
    } else {
      Keyboard.dismiss();
      this.setState({loader: true});
      const phone = navigation.getParam('phone');
      new Promise((rsl, rej) => {
        this.props.signIn(phone, password, rsl, rej);
      })
        .then((res) => {
          this.setState({loader: false});
          this.props.navigation.navigate('Drawer');
        })
        .catch((err) => {
          this.setState({loader: false});
          if (
            err ==
            'You have been blocked\nPlease Contact our customer support for more details'
          ) {
            Alert.alert('iHeal', err);
            this.props.navigation.goBack();
          } else {
            Alert.alert('Wrong Password', '');
          }
        });
    }
  };
  render() {
    return (
      <DisableKeyboard>
        <View style={styles.container}>
          <View style={{width: '90%', alignItems: 'center', marginTop: '15%'}}>
            <Text style={styles.text}>Enter your password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                autoFocus
                value={this.state.password}
                placeholder="Password"
                placeholderTextColor="black"
                style={styles.input}
                onChangeText={(password) => this.setState({password})}
                secureTextEntry
                ref={(input) => (this.password = input)}
              />
            </View>
            <TouchableOpacity
              style={styles.primaryBtn}
              mode="contained"
              onPress={() => this.handler()}>
              <Text style={styles.primaryText}>Confirm</Text>
            </TouchableOpacity>
          </View>
          {this.state.loader && <Loader />}
        </View>
      </DisableKeyboard>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    prop: state.prop,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      signUp,
      signIn,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPassword);

const fontFamily = colors.font;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: DEVICE_HEIGHT > 600 ? 20 : 16,
    fontFamily,
  },
  inputContainer: {
    width: '80%',
    marginTop: 50,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.schedule,
    marginBottom: 20,
    padding: 5,
    fontFamily,
    color: colors.camera,
    height: 40,
  },
  primaryBtn: {
    width: '80%',
    backgroundColor: colors.primary,
    marginTop: 10,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 55 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
    fontFamily,
  },
});
