import React, {PureComponent} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';

import colors from '../../assests/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const fontFamily = colors.font;

import ActiveJobs from './ActiveJobs';
import CompletedJobs from './CompletedJobs';

import Loader from '../general/Loader';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  getOrders,
  getCompletedOrders,
  removeOrderDetails,
} from '../../actions/jobs';

const {width: DEVICE_WIDTH} = Dimensions.get('window');

class JobsHome extends PureComponent {
  constructor() {
    super();
    this.state = {
      tab: 0,
      loader: true,
    };
  }
  componentDidMount() {
    const {
      getOrders,
      user,
      getCompletedOrders,
      removeOrderDetails,
      navigation,
    } = this.props;
    this.willFocus = navigation.addListener('willFocus', () => {
      const data = new FormData();
      data.append('phone_no', user.phone_no);
      data.append('session_key', user.session);
      removeOrderDetails();
      new Promise((rsl, rej) => {
        getOrders(data, rsl, rej);
        getCompletedOrders(data, rsl, rej);
      })
        .then(() => {
          this.setState({loader: false});
        })
        .catch((err) => {
          this.setState({loader: false});
          Alert.alert('Sorry', err);
        });
    });
  }
  componentWillUnmount() {
    this.willFocus.remove();
  }
  render() {
    const {tab} = this.state;
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{width: '90%', marginTop: 50, alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '95%',
            }}>
            <TouchableOpacity onPress={() => this.setState({tab: 0})}>
              <Text
                style={[
                  styles.tab,
                  {
                    borderBottomWidth: tab == 0 ? 1.5 : 0,
                    width: 90,
                    borderBottomColor: colors.number,
                  },
                ]}>
                Active
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({tab: 1})}>
              <Text
                style={[
                  styles.tab,
                  {
                    borderBottomWidth: tab == 1 ? 1.5 : 0,
                    width: 120,
                    borderBottomColor: colors.number,
                  },
                ]}>
                Completed
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={{alignSelf: 'flex-start', position: 'relative'}}>
              {tab !== 1 ? (
                <View style={{width: '100%', marginTop: 30, height: '100%'}}>
                  <ActiveJobs navigation={this.props.navigation} />
                </View>
              ) : (
                <View style={{width: '100%', marginTop: 30, height: '100%'}}>
                  <CompletedJobs
                    navigation={this.props.navigation}
                    focused={tab}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        {this.state.loader && <Loader />}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getOrders,
      getCompletedOrders,
      removeOrderDetails,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsHome);

const styles = StyleSheet.create({
  tab: {
    fontFamily,
    fontSize: 16,
    textAlign: 'center',
    borderBottomColor: colors.camera,
  },
});
