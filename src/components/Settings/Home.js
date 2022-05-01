import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

import userImage from '../../assests/user.png';
import phoneImage from '../../assests/phone.png';
import colors from '../../assests/styles';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserData} from '../../actions/profile';

class SettingsHome extends Component {
  componentDidMount() {
    const {navigation, user, getUserData} = this.props;
    this.willFocus = navigation.addListener('willFocus', () => {
      const {phone_no, session} = user;
      getUserData(phone_no, session);
    });
  }
  componentWillUnmount() {
    this.willFocus.remove();
  }

  render() {
    const {user} = this.props;
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <Text style={[styles.header, {marginBottom: 10}]}>Profile</Text>
          <View style={styles.info}>
            <TouchableOpacity
              style={styles.list}
              onPress={() => this.props.navigation.navigate('UpdateName')}>
              <Image
                source={userImage}
                resizeMode="contain"
                style={styles.image}
              />
              <View>
                <Text style={styles.heading}>Name</Text>
                <Text style={styles.name}>{user.name}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.list}
              // onPress={() => this.props.navigation.navigate('UpdatePhone')}
            >
              <Image
                source={phoneImage}
                resizeMode="contain"
                style={styles.image}
              />
              <View>
                <Text style={styles.heading}>Mobile Number</Text>
                <Text style={styles.name}>{user.phone_no}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.list}
              onPress={() => this.props.navigation.navigate('UpdatePassword')}>
              <SimpleLineIcons name="lock" style={styles.icon} />
              <View>
                <Text style={styles.heading}>Change Password</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/*           
          <Text style={styles.header}>About</Text>
          <View style={styles.info}>
            <TouchableOpacity
              style={styles.list}
              onPress={() => this.props.navigation.navigate('Languages')}>
              <SimpleLineIcons name="globe" style={styles.icon} />
              <View>
                <Text style={styles.heading}>Language</Text>
                <Text style={styles.name}>English</Text>
              </View>
            </TouchableOpacity>
          </View>
          */}
          <Text style={styles.header}>General</Text>
          <TouchableOpacity style={styles.list}>
            <Text style={[styles.heading, {marginLeft: 20}]}>
              {' '}
              Terms and Conditions
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
      getUserData,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHome);

const fontFamily = colors.font;

const styles = StyleSheet.create({
  header: {
    color: colors.primary,
    fontSize: 22,
    marginLeft: 18,
    fontFamily,
    marginTop: 10,
  },
  info: {
    borderBottomWidth: 1.5,
    paddingBottom: 10,
    borderBottomColor: 'rgba(209,209,209,0.5)',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    height: 35,
    width: 35,
    marginLeft: 25,
    marginRight: 5,
  },
  heading: {
    fontSize: DEVICE_HEIGHT > 600 ? 16 : 12,
    fontFamily,
  },
  name: {
    fontSize: DEVICE_HEIGHT > 600 ? 12 : 9,
    fontFamily,
  },
  icon: {
    fontSize: 25,
    marginLeft: 30,
    marginRight: 9,
  },
});
