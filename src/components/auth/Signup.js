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
  Platform,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../assests/styles';

import codes from './codes';
import Modal from 'react-native-simple-modal';
import {ScrollView} from 'react-native-gesture-handler';
import Loader from '../general/Loader';
const {height: DEVICE_HEIGHT, width: DEVICE_WIDTH} = Dimensions.get('window');

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signInWithPhone, checkuser} from '../../actions/auth';

import DisableKeyboard from '../general/DismissKeybaord';

class PhoneInput extends React.Component {
  constructor() {
    super();
    this.state = {
      countryCode: 'PK',
      phoneNumber: '',
      code: '+92',
    };
  }

  handler = () => {
    const {phoneNumber, code} = this.state;
    if (phoneNumber.length < 5) {
      Alert.alert('Invalid', 'Please enter a valid phoneNumber');
      return false;
    } else {
      Keyboard.dismiss();
      let number = code + phoneNumber;
      this.setState({loader: true});
      this.phone.blur();
      this.OTPFun(number);
      // new Promise((rsl, rej) => {
      //   this.props.checkuser(number, rsl, rej);
      // })
      //   .then(res => {
      //     if (res == true) {
      //       this.setState({loader: false});
      //       this.props.navigation.navigate('ConfirmPassword', {phone: number});
      //     } else {
      //     }
      //   })
      //   .catch(err => {
      //     this.setState({loader: false});
      //     Alert.alert('Sorry', JSON.stringify(err));
      //   });
    }
  };
  OTPFun = (number) => {
    new Promise((rsl, rej) => {
      this.props.signInWithPhone(number, rsl, rej);
    })
      .then((res) => {
        this.setState({loader: false});

        this.props.navigation.navigate('OtpAndroid', {phone: number, res});
      })
      .catch((err) => {
        this.setState({loader: false});
        Alert.alert(JSON.stringify(err));
        console.log(err);
      });
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <DisableKeyboard>
          <View style={styles.container}>
            <Text style={styles.text}>Welcome to iHeal Driver!</Text>
            <Text style={styles.text}>Please enter your phone number</Text>
            <View style={styles.phoneNumberContainer}>
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
                placeholderTextColor="black"
                style={styles.input}
                placeholder="Phone Number"
                value={this.state.phoneNumber}
                onChangeText={(phoneNumber) => {
                  if (phoneNumber == 0 && this.state.phoneNumber.length == 0) {
                  } else {
                    this.setState({phoneNumber});
                  }
                }}
                maxLength={10}
                keyboardType="number-pad"
                ref={(input) => (this.phone = input)}
              />
            </View>
            <TouchableOpacity
              style={styles.primaryBtn}
              mode="contained"
              onPress={() => this.handler()}>
              <Text style={styles.primaryText}>Next</Text>
            </TouchableOpacity>
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
          </View>
        </DisableKeyboard>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      signInWithPhone,
      checkuser,
    },
    dispatch,
  );
};

export default connect(null, mapDispatchToProps)(PhoneInput);

const fontFamily = colors.font;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: DEVICE_HEIGHT > 600 ? 20 : 14,
    color: colors.camera,
    paddingTop: DEVICE_HEIGHT > 600 ? 50 : 30,
    fontFamily,
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: DEVICE_WIDTH > 700 ? '80%' : '90%',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: colors.inputFields,
    width: '30%',
    paddingBottom: 10,
    marginTop: 100,
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
    // marginRight: 25,
    fontSize: DEVICE_HEIGHT > 600 ? 20 : 16,
    fontFamily,
    color: 'black',
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
});
