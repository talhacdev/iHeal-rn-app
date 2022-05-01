import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import colors from '../../assests/styles';

import Loader from '../general/Loader';
const {height: DEVICE_HEIGHT, width: DEVICE_WIDTH} = Dimensions.get('window');
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {confirmOTP, authState, signInWithPhone} from '../../actions/auth';
import {updateProfile} from '../../actions/profile';

import DisableKeyboard from '../general/DismissKeybaord';

class OTP extends React.Component {
  constructor() {
    super();
    this.state = {
      code: '',
      timer: 59,
      disabled: true,
      confirmation: null,
      loader: false,
      update: undefined,
    };
  }
  componentDidMount = () => {
    const update = this.props.navigation.getParam('update');
    const phone = this.props.navigation.getParam('phone');
    this.setState({update});
    this.interValFun();
    new Promise((rsl, rej) => {
      this.props.authState(rsl, rej);
    }).then((res) => {
      if (update) {
        if (res.metadata.lastSignInTime == res.metadata.creationTime) {
          this.updatePhone();
        } else {
          Alert.alert('Sorry!', 'Phone Number Already Exist.');
          this.setState({loader: false});
          this.props.navigation.replace('SettingsHome');
        }
      } else {
        this.setState({loader: false});
        this.props.navigation.replace('Password', {phone});
      }
    });
  };
  interValFun() {
    setInterval(() => {
      if (this.state.timer !== 0) {
        this.setState({
          timer: this.state.timer - 1,
        });
      } else {
        this.setState({
          disabled: false,
        });
      }
    }, 1000);
  }
  handler = (code) => {
    const phone = this.props.navigation.getParam('phone');
    if (code.length < 6) {
      Alert.alert('Invalid Code', null);
      return false;
    } else {
      const confirmation = this.props.navigation.getParam('res');
      Keyboard.dismiss();
      this.setState({loader: true});
      new Promise((rsl, rej) => {
        this.props.confirmOTP(code, confirmation, rsl, rej);
      })
        .then((res) => {
          // this.setState({ loader: false })
          // if (update) {
          //     this.updatePhone()
          // }
          // else {
          //     if (res.metadata.lastSignInTime == res.metadata.creationTime) {
          //         this.props.navigation.navigate("CreatePassword", { phone })
          //     }
          //     else {
          //         this.props.navigation.navigate("ConfirmPassword", { phone })
          //     }
          // }
        })
        .catch((err) => {
          Alert.alert('Wrong Code', 'Please enter the correct code');
          this.setState({loader: false});
        });
    }
  };
  sendAgain = () => {
    if (!this.state.disabled) {
      this.setState({
        disabled: true,
        timer: 59,
      });
      this.interValFun();
      const phone = this.props.navigation.getParam('phone');
      new Promise((rsl, rej) => {
        // this.props.signInWithPhone(phone, rsl, rej)
      });
    }
  };
  updatePhone = () => {
    const {authReducer, navigation, updateProfile} = this.props;
    const {phone_no, session, name, email} = authReducer.user;
    const phone = navigation.getParam('phone');
    const formData = new FormData();
    formData.append('phone_no', phone_no);
    formData.append('session_key', session);
    formData.append('email', email);
    formData.append('cell_no', phone);
    formData.append('name', name);
    new Promise((rsl, rej) => {
      updateProfile(formData, rsl, rej);
    })
      .then((res) => {
        this.setState({loader: false});
        navigation.navigate('SettingsHome');
      })
      .catch((err) => {
        Alert.alert('No Internet', 'Please Check Your Internet Connection');
        this.setState({loader: false});
      });
  };
  render() {
    const {timer, disabled, code, loader, update} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <DisableKeyboard>
          <View style={styles.container}>
            <View style={styles.wrapper}>
              {update !== true && (
                <Text style={styles.text}>Welcome to iHeal!</Text>
              )}
              <Text style={styles.text}>
                Enter the one time passcode sent as a SMS to your mobile number{' '}
              </Text>
              <View style={styles.phoneNumberContainer}>
                {/* <OTPInputView
                  style={{
                    width: '80%',
                    height: 100,
                    color: colors.camera,
                    fontFamily,
                  }}
                  pinCount={6}
                  autoFocusOnLoad
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={code => {
                    this.handler(code);
                  }}
                  onCodeChanged={code => {
                    this.setState({code});
                  }}
                /> */}
                <OTPInputView
                  style={{width: '80%', height: 200}}
                  pinCount={6}
                  // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                  // onCodeChanged = {code => { this.setState({code})}}
                  autoFocusOnLoad
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={(code) => {
                    this.handler(code);
                  }}
                  onCodeChanged={(code) => {
                    this.setState({code});
                  }}
                />
              </View>
              <View style={styles.timerContainer}>
                <TouchableOpacity onPress={() => this.sendAgain()}>
                  <Text
                    style={{
                      color: disabled ? colors.inputFields : colors.number,
                      fontFamily,
                    }}>
                    Send again
                  </Text>
                </TouchableOpacity>
                {timer != 0 && (
                  <Text
                    style={{
                      fontFamily,
                    }}>
                    {timer}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.primaryBtn}
                mode="contained"
                onPress={() => this.handler(code)}>
                <Text style={styles.primaryText}>Next</Text>
              </TouchableOpacity>
            </View>
            {loader && <Loader />}
          </View>
        </DisableKeyboard>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      confirmOTP,
      authState,
      signInWithPhone,
      updateProfile,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OTP);

const fontFamily = colors.font;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  wrapper: {
    alignItems: 'center',
    width: '90%',
  },
  text: {
    fontSize: DEVICE_HEIGHT > 600 ? 18 : 14,
    color: colors.camera,
    paddingTop: DEVICE_HEIGHT > 600 ? 50 : 30,
    fontFamily,
    textAlign: 'center',
  },
  phoneNumberContainer: {
    marginTop: 50,
    marginBottom: 20,
  },
  timerContainer: {
    width: '80%',
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: colors.white,
    width: 100,
    borderBottomWidth: 2,
    borderBottomColor: colors.inputFields,
    height: 50,
    fontSize: DEVICE_HEIGHT > 600 ? 20 : 16,
    fontFamily,
    textAlign: 'center',
  },
  btnContainer: {
    width: DEVICE_WIDTH > 700 ? '80%' : '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  primaryBtn: {
    width: DEVICE_WIDTH > 700 ? '80%' : '90%',
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 55 : 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: colors.camera,
    fontFamily,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
