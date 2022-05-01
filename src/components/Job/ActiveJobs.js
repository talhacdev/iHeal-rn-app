import React, {PureComponent} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import colors from '../../assests/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Alert} from 'react-native';

const MONTHS = [
  'Janurary',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Auguest',
  'September',
  'October',
  'November',
  'December',
];

class ActiveJobs extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {orders, navigation} = this.props;
    console.log(orders);
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        {orders !== undefined ? (
          <View style={{marginBottom: 30}}>
            {orders.map((job, i) => {
              let date = job.order_execution_date.split('-');
              return (
                <View
                  key={i}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    key={i}
                    style={{marginBottom: 20, width: '100%'}}
                    // onPress={() =>
                    //   navigation.navigate('JobStatus', {orderid: job.order_id})
                    // }
                    onPress={() => {
                      navigation.navigate('Payment', {job});
                    }}>
                    <View style={{paddingLeft: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.text}>Order id {job.order_id}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          {/* <TouchableOpacity
                      style={{
                        width: '10%',
                        alignItems: 'flex-end',
                        paddingRight: 5,
                      }}
                      onPress={() =>
                        navigation.navigate('OrderDetails', {
                          orderid: job.order_id,
                        })
                      }>
                      <View
                        style={{
                          backgroundColor: colors.primary,
                          borderRadius: 100,
                          width: 30,
                          height: 30,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <FontAwesome
                          name="angle-right"
                          size={20}
                          style={{
                            color: 'white',
                          }}
                        />
                      </View>
                    </TouchableOpacity> */}
                          {/* <MaterialCommunityIcons
                            onPress={() => {
                              console.log(job);
                              navigation.navigate('Message', {job});
                            }}
                            name={'chat'}
                            size={20}
                            style={{marginBottom: 10, marginRight: 10}}
                            color={colors.primary}
                          /> */}
                          <Icon
                            onPress={() => {
                              job.longi
                                ? navigation.navigate('Map', {job})
                                : Alert.alert('iHeal', 'No Location Found');
                            }}
                            name="location-pin"
                            style={{
                              fontSize: 20,
                              color: colors.primary,
                              marginRight: 10,
                            }}
                          />
                        </View>
                      </View>
                      <Text style={styles.text}>{job.from_time}</Text>
                      <Text style={styles.text}>
                        {job?.order_execution_date}
                      </Text>
                    </View>
                    <View style={styles.address}>
                      <Icon
                        name="location-pin"
                        style={{
                          fontSize: 20,
                          color: colors.primary,
                          marginRight: 10,
                        }}
                      />
                      <Text
                        style={[
                          styles.text,
                          {fontSize: 13, marginBottom: 0, width: '100%'},
                        ]}>
                        {job?.geo_address?.slice(0, 100)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              marginTop: 20,
            }}>
            <Text style={styles.noorderstext}>
              You don't have any order yet
            </Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.jobsReducer.orders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveJobs);

const fontFamily = colors.font;

const styles = StyleSheet.create({
  text: {
    fontFamily,
    fontSize: 16,
    color: colors.number,
    marginBottom: 3,
    width: '80%',
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    marginHorizontal: 10,
    borderBottomColor: colors.inputFields,
  },
  noorderstext: {
    fontFamily,
    textAlign: 'center',
    fontSize: 18,
  },
});
