import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import colors, {primaryBtn, primaryText} from '../../assests/styles';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateOrderStatus} from '../../actions/jobs';
import Loader from '../general/Loader';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

class FinishJob extends Component {
  state = {
    loader: false,
  };
  handler = () => {
    const {updateOrderStatus, user, navigation} = this.props;
    this.setState({loader: true});
    const orderid = navigation.getParam('orderid');
    const data = new FormData();
    data.append('phone_no', user.phone_no);
    data.append('session_key', user.session);
    data.append('orderid', orderid);
    data.append('status', '5');
    new Promise((rsl, rej) => {
      updateOrderStatus(data, rsl, rej);
    })
      .then((res) => {
        this.setState({loader: false});
        navigation.goBack();
      })
      .catch((err) => {
        this.setState({loader: false});
        Alert.alert('Sorry', err);
      });
  };
  render() {
    const {orderDetails} = this.props;
    try {
      const date = orderDetails.order_execution_date.split('-');
      const cordinates = {
        latitude: JSON.parse(orderDetails.address.lat),
        longitude: JSON.parse(orderDetails.address.longi),
      };
      return (
        <View
          style={{
            flex: 1,
          }}>
          <View style={styles.btn}>
            <TouchableOpacity
              style={[
                primaryBtn,
                {
                  width: '90%',
                },
              ]}
              mode="contained"
              onPress={() => this.handler()}>
              <Text style={primaryText}>Finish Job</Text>
            </TouchableOpacity>
          </View>
          {this.state.loader && <Loader />}
        </View>
      );
    } catch {
      return <Loader />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    orderDetails: state.jobsReducer.orderDetails,
    user: state.authReducer.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateOrderStatus,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishJob);

const fontFamily = colors.font;

const styles = StyleSheet.create({
  map: {
    // ...StyleSheet.absoluteFillObject,
    height: 200,
    marginTop: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  text: {
    fontFamily,
    color: colors.text,
  },
  orderText: {
    fontFamily,
    fontSize: 20,
    marginTop: 10,
  },
  orderDetails: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    width: 250,
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: colors.inputFields,
  },
  brand: {
    fontFamily,
    width: '50%',
    paddingLeft: 10,
    paddingTop: 20,
  },
  border: {
    borderRightWidth: 2,
    borderRightColor: colors.inputFields,
  },
  textRight: {
    textAlign: 'right',
    paddingRight: 10,
  },
  btn: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
});
