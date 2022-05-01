import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import colors from '../../assests/styles';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateOrderPayment} from '../../actions/jobs';

import Loader from '../general/Loader';

const {height: DEVICE_HEIGHT} = Dimensions.get('window');

import DismissKeybaord from '../general/DismissKeybaord';

const Payment = (props) => {
  const job = props.navigation.getParam('job');
  console.log(job);
  const [loader, setLoader] = useState(false);
  const [margin, setMargin] = useState(false);

  // const [payment, setPayment] = useState(job?.net_payable);
  const [payment, setPayment] = useState('');

  const handler = () => {
    try {
      if (payment.length < 1) {
        Alert.alert('iHeal', 'Please enter the payment');
      } else {
        Keyboard.dismiss();
        const {updateOrderPayment, user, navigation, orderDetails} = props;
        setLoader(true);

        const data = new FormData();
        data.append('phone_no', user.phone_no);
        data.append('session_key', user.session);
        data.append('orderid', job?.order_id);
        data.append('amountpaid', payment);
        console.log(data);
        new Promise((rsl, rej) => {
          updateOrderPayment(data, rsl, rej);
        })
          .then((res) => {
            setLoader(false);
            Alert.alert('iHeal', 'Payment Done');
            props.navigation.navigate('Home');
            // navigation.dispatch({
            //   type: 'CustomNav',
            //   routeName: 'Finished',
            //   key: 'Finished',
            // });
          })
          .catch((err) => {
            setLoader(false);
            Alert.alert('Sorry', err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <DismissKeybaord>
      <View style={[styles.wrapper]}>
        <View style={[styles.container, {marginTop: margin ? -200 : 0}]}>
          <Text style={styles.text}>Payment Received</Text>

          <TextInput
            style={[
              styles.input,
              {
                marginBottom: 10,
              },
            ]}
            value={`${payment}`}
            // // value={' '}
            onChangeText={(payment) => {
              setPayment(payment);
            }}
            keyboardType="numeric"
            onFocus={() => {
              setMargin(true);
            }}
          />

          <TouchableOpacity
            style={styles.primaryBtn}
            mode="contained"
            onPress={() => handler()}>
            <Text style={styles.primaryText}>Finish</Text>
          </TouchableOpacity>
        </View>
        {loader && <Loader />}
      </View>
    </DismissKeybaord>
  );
};

const mapStateToProps = (state) => {
  return {
    orderDetails: state.jobsReducer.orderDetails,
    user: state.authReducer.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateOrderPayment,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

const fontFamily = colors.font;
const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    fontFamily,
    color: colors.number,
    marginVertical: 10,
  },
  input: {
    fontFamily,
    borderWidth: 1,
    width: '90%',
    borderRadius: 20,
    padding: 10,
    borderColor: colors.inputFields,
    textAlign: 'center',
  },
  primaryBtn: {
    width: '90%',
    backgroundColor: colors.primary,
    marginTop: 10,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 30
  },
  primaryText: {
    color: colors.white,
    fontSize: 18,
    fontFamily,
    fontWeight: '600',
  },
});
