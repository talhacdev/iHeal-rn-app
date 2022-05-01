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
  Animated,
  Linking,
} from 'react-native';
import colors from '../../assests/styles';

import Loader from '../general/Loader';
const {height: DEVICE_HEIGHT, width: DEVICE_WIDTH} = Dimensions.get('window');

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signup, signIn} from '../../actions/auth';
import DisableKeyboard from '../general/DismissKeybaord';

class Password extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      promo: '',
      email: '',
    };
    this.animationEmail = new Animated.Value(0);
    this.animationPassword = new Animated.Value(0);
  }
  handler = async () => {
    // const phone = this.props.navigation.getParam('phone');
    let {password} = this.state;
    if (!password) {
      alert('Kindly enter password ');
    } else {
      Keyboard.dismiss();
      this.setState({loader: true});
      const phone = this.props.navigation.getParam('phone');
      new Promise((rsl, rej) => {
        this.props.signup(phone, password, rsl, rej);
      })
        .then((res) => {
          // try {
          //   firebase.analytics().logEvent('user_signup_success');
          //   this.setState({loader: false});
          // } catch (e) {
          //   this.setState({loader: false});
          // }
          alert(res.data.message);
          this.props.navigation.navigate('ChooseCateg');
          this.setState({loader: false});
        })
        .catch((err) => {
          this.setState({loader: false});

          alert(err);
        });
    }
  };
  render() {
    const animEmail = this.animationEmail.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -120],
    });
    let opacity = this.animationEmail.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    const animPassword = this.animationPassword.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0],
    });
    return (
      <SafeAreaView style={{flex: 1}}>
        <DisableKeyboard>
          <Animated.View style={styles.container}>
            {!this.state.hide && (
              <Animated.Text
                style={[
                  styles.headerText,
                  {
                    opacity,
                  },
                ]}>
                Please create a password for your account
              </Animated.Text>
            )}

            <View style={styles.inputContainer}>
              <Animated.View
                style={{
                  marginTop: this.state.hide == true ? 5 : animEmail,
                }}>
                {/* <TextInput
                                    style={[styles.input]}
                                    placeholder='Email'
                                    value={this.state.email}
                                    onChangeText={(email) => this.setState({ email })}
                                    // maxLength={10}
                                    ref={(input) => { this.email = input; }}
                                    onSubmitEditing={() => this.password.focus()}
                                    returnKeyLabel='next'
                                    keyboardType='email-address'
                                    onFocus={() => {
                                        Animated.timing(this.animationEmail, {
                                            toValue: 1,
                                        }).start(() => {
                                            this.setState({ hide: true })
                                        })
                                    }}
                                    onBlur={() => {
                                        Animated.sequence([
                                            Animated.timing(this.animationEmail, {
                                                toValue: 0,
                                            }).start()
                                        ])
                                    }}
                                    placeholderTextColor="black"
                                // secureTextEntry
                                /> */}
              </Animated.View>
              <Animated.View
                style={{
                  marginTop: animPassword,
                }}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={this.state.password}
                  onChangeText={(password) => this.setState({password})}
                  // maxLength={10}
                  ref={(input) => {
                    this.password = input;
                  }}
                  // onSubmitEditing={() => this.promo.focus()}
                  returnKeyLabel="Next"
                  secureTextEntry
                  onFocus={() => {
                    Animated.timing(this.animationPassword, {
                      toValue: 1,
                    }).start();
                  }}
                  onBlur={() => {
                    Animated.sequence([
                      Animated.timing(this.animationPassword, {
                        toValue: 0,
                      }).start(),
                    ]);
                  }}
                  placeholderTextColor="black"
                />
              </Animated.View>
              {/* <TextInput
                                style={styles.input}
                                placeholder='Referral code(optional)'
                                value={this.state.promo}
                                onChangeText={(promo) => this.setState({ promo })}
                                // maxLength={10}
                                ref={(input) => { this.promo = input; }}
                                placeholderTextColor="black"
                            /> */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  marginTop: DEVICE_WIDTH > 700 ? 20 : 0,
                }}>
                <Text
                  style={{
                    fontFamily,
                    fontSize:
                      DEVICE_WIDTH > 700 ? 16 : DEVICE_WIDTH > 350 ? 12 : 10,
                  }}>
                  By signing up, you agree to the
                </Text>
                <TouchableOpacity onPress={() => alert('Terms & Conditions')}>
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily,
                      fontSize:
                        DEVICE_WIDTH > 700 ? 16 : DEVICE_WIDTH > 350 ? 12 : 10,
                    }}>
                    Terms and Conditions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                width: DEVICE_WIDTH > 700 ? '70%' : '80%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 100,
              }}>
              <TouchableOpacity
                style={styles.primaryBtn}
                mode="contained"
                onPress={() => this.handler()}>
                <Text style={styles.primaryText}>Next</Text>
              </TouchableOpacity>
            </View>
            {this.state.loader && <Loader />}
          </Animated.View>
        </DisableKeyboard>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    prop: state.prop,
    user: state.authReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      signup,
      signIn,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Password);

const fontFamily = colors.font;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingTop: DEVICE_HEIGHT > 600 ? '15%' : '10%',
  },
  headerText: {
    fontSize: DEVICE_HEIGHT > 600 ? 18 : 14,
    color: colors.number,
    width: '70%',
    textAlign: 'center',
    marginBottom: DEVICE_HEIGHT > 600 ? 100 : 50,
    fontFamily,
    lineHeight: 22,
  },
  inputContainer: {
    width: DEVICE_WIDTH > 700 ? '80%' : '90%',
  },
  input: {
    backgroundColor: colors.white,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: colors.inputFields,
    height: DEVICE_HEIGHT > 600 ? 40 : 30,
    fontSize: 15,
    marginVertical: 13,
    paddingVertical: 5,
    fontFamily,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 55 : 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
    fontFamily,
  },
});
