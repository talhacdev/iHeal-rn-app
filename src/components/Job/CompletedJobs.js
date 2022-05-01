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

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCompletedOrders} from '../../actions/jobs';
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
class CompletedJobs extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const {orders, navigation} = this.props;
    return (
      <View style={{flex: 1, height: '100%'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          {orders !== undefined ? (
            <View style={{marginBottom: 30}}>
              {orders.map((job, i) => {
                let date = job.order_execution_date.split('-');
                return (
                  <TouchableOpacity
                    key={i}
                    style={{marginBottom: 20}}
                    onPress={
                      () => {
                        console.log(job);
                        if (job?.user_rating != null) {
                          alert('already rated');
                        } else {
                          this.props.navigation.navigate('Rating', {job});
                        }
                      }
                      // navigation.navigate('OrderDetails', {
                      //   orderid: job.order_id,
                      // })
                    }>
                    <View style={{paddingLeft: 10}}>
                      <Text style={styles.text}>Order id {job?.order_id}</Text>
                      <Text style={styles.text}>{job.from_time}</Text>
                      <Text style={styles.text}>
                        {job?.order_execution_date}
                      </Text>
                    </View>
                    <View style={styles.address}>
                      <Icon
                        name="location-pin"
                        style={{fontSize: 20, color: colors.primary}}
                      />
                      <Text
                        style={[
                          styles.text,
                          {fontSize: 13, marginBottom: 0, width: '90%'},
                        ]}>
                        {job?.geo_address?.slice(0, 100)}
                      </Text>
                    </View>
                  </TouchableOpacity>
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
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.jobsReducer.completedOrders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCompletedOrders,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CompletedJobs);

const fontFamily = colors.font;

const styles = StyleSheet.create({
  text: {
    fontFamily,
    fontSize: 16,
    color: colors.number,
    marginBottom: 3,
    width: '100%',
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    width: '100%',
    borderBottomColor: colors.inputFields,
  },
  noorderstext: {
    fontFamily,
    textAlign: 'center',
    fontSize: 18,
  },
});
