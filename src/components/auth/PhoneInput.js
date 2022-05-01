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
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors, {primaryBtn, primaryText} from '../../assests/styles';

import codes from './codes';
import Modal from 'react-native-simple-modal';
import Loader from '../general/Loader';
const {height: DEVICE_HEIGHT, width: DEVICE_WIDTH} = Dimensions.get('window');

import lube from '../../assests/header_logo.jpg';
import logo from '../../assests/logo.png';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signin} from '../../actions/auth';

import DismissKeybaord from '../general/DismissKeybaord';

class PhoneAuth extends React.Component {
  constructor() {
    super();
    this.state = {
      countryCode: 'PK',
      phoneNumber: '',
      code: '+92',
      password: '',
    };
    this.animate = new Animated.Value(1);
  }
  handler = () => {
    const {phoneNumber, code, password} = this.state;
    const {navigation, signin} = this.props;
    if (phoneNumber.length < 9) {
      Alert.alert('Invalid', 'Please enter a valid phoneNumber');
      return false;
    } else if (!password) {
      Alert.alert(null, 'Please enter your password');
    } else {
      Keyboard.dismiss();
      let phone = code + phoneNumber;
      this.setState({loader: true});
      new Promise((rsl, rej) => {
        signin(phone, password, rsl, rej);
      })
        .then((res) => {
          this.setState({loader: false});
          console.log(res);
          if (
            res?.name !== '' &&
            res?.dp !== '' &&
            res?.idcopy_back !== '' &&
            res?.idcopy_front !== ''
          ) {
            navigation.navigate('Drawer');
          } else {
            navigation.navigate('UpdateName');
          }
        })
        .catch((err) => {
          this.setState({loader: false});
          Alert.alert('Sorry!', err);
        });
    }
  };
  render() {
    const imageAnimation = this.animate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, DEVICE_WIDTH * 0.3],
    });
    const marginBottom = this.animate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 40],
    });
    return (
      <DismissKeybaord>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView
            style={{paddingBottom: 50, flex: 1}}
            ref="scroll"
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{flex: 1}}>
            <View style={styles.container}>
              <View>
                <Animated.Image
                  source={logo}
                  resizeMode="contain"
                  style={{
                    width: DEVICE_WIDTH * 0.4,
                    height: imageAnimation,
                    marginBottom: 40,
                  }}
                />
              </View>
              <Animated.View
                style={[
                  styles.phoneNumberContainer,
                  {
                    marginBottom: marginBottom,
                  },
                ]}>
                <TouchableOpacity
                  style={styles.pickerContainer}
                  onPress={() => this.setState({countryModal: true})}>
                  <CountryPicker
                    {...{
                      countryCode: this.state.countryCode,
                      withFlag: true,
                      withEmoji: false,
                    }}
                    visible={false}
                    modalProps={{visible: false}}
                  />
                  <Text style={styles.phoneNumber}>{this.state.code}</Text>
                  <Icon name="angle-down" style={styles.Icon} />
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  value={this.state.phoneNumber}
                  onChangeText={(phoneNumber) => {
                    if (
                      phoneNumber == 0 &&
                      this.state.phoneNumber.length == 0
                    ) {
                    } else {
                      this.setState({phoneNumber});
                    }
                  }}
                  maxLength={10}
                  keyboardType="number-pad"
                  onFocus={() =>
                    Animated.timing(this.animate, {
                      toValue: 0,
                    }).start()
                  }
                  ref={(input) => {
                    this.phone = input;
                  }}
                  returnKeyLabel="Next"
                  onSubmitEditing={() => this.password.focus()}
                  blurOnSubmit={false}
                />
              </Animated.View>
              <TextInput
                ref={(input) => {
                  this.password = input;
                }}
                style={[
                  styles.input,
                  {
                    width: DEVICE_WIDTH > 700 ? '80%' : '80%',
                  },
                ]}
                placeholder="Password"
                value={this.state.password}
                onChangeText={(password) => this.setState({password})}
                maxLength={10}
                onFocus={() =>
                  Animated.timing(this.animate, {
                    toValue: 0,
                  }).start()
                }
                returnKeyLabel="Done"
                secureTextEntry
              />
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={[
                    primaryBtn,
                    {
                      width: '90%',
                    },
                  ]}
                  mode="contained"
                  onPress={() => this.handler()}>
                  <Text style={primaryText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          {this.state.loader && <Loader />}
          <Modal
            open={this.state.countryModal}
            modalDidClose={() => this.setState({countryModal: false})}
            modalStyle={{
              backgroundColor: 'white',
            }}
            containerStyle={{
              backgroundColor: 'white',
            }}>
            <ScrollView>
              {codes.map((country, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={{paddingVertical: 10}}
                    onPress={() =>
                      this.setState({
                        countryCode: country.cca2,
                        code: country.code,
                        countryModal: false,
                      })
                    }>
                    <Text>
                      {country.name} ({country.code})
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Modal>
          {/* <Text
            onPress={() => {
              this.props.navigation.navigate('Signup');
            }}
            style={[
              styles.phoneNumber,
              {
                fontSize: 16,
                alignSelf: 'center',
                color: colors.primary,
                marginVertical: 20,
              },
            ]}>
            Don't have an account? Signup
          </Text> */}
        </SafeAreaView>
      </DismissKeybaord>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      signin,
    },
    dispatch,
  );
};

export default connect(null, mapDispatchToProps)(PhoneAuth);

const fontFamily = colors.font;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: DEVICE_WIDTH > 700 ? '80%' : '80%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: colors.inputFields,
    width: '30%',
    paddingBottom: 10,
    marginTop: 50,
    justifyContent: 'space-around',
  },
  phoneNumber: {
    fontSize: 20,
    color: colors.camera,
    fontFamily,
  },
  Icon: {
    color: colors.camera,
    fontSize: 20,
    marginLeft: 5,
  },
  input: {
    backgroundColor: colors.white,
    width: '60%',
    borderBottomWidth: 2,
    borderBottomColor: colors.inputFields,
    height: 50,
    fontSize: DEVICE_HEIGHT > 600 ? 20 : 16,
    fontFamily,
  },
  btnContainer: {
    width: DEVICE_WIDTH > 700 ? '77%' : '85%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
