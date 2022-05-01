import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
  Alert,
} from 'react-native';
import {Rating} from 'react-native-ratings';

import colors from '../../assests/styles';
const {height: DEVICE_HEIGHT, width: DEVICE_WIDTH} = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {getuserRatingBalance} from '../../actions/app';

const fontFamily = colors.font;

const stars = [1, 2, 3, 4, 5];

import homeImage from '../../assests/home.png';
import jobImage from '../../assests/job.png';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logout, removeBlock} from '../../actions/auth';

const CustomDrawerContentComponent = (props) => {
  const [userData, setData] = useState(null);

  console.log(props);
  useEffect(() => {
    const {session, blocked, removeBlock, navigation} = props;
    if (session) {
      removeBlock();
      Alert.alert('iHeal', 'Your Session has expired', [
        {
          text: 'Log in',
        },
      ]);
      navigation.navigate('AuthStack');
    }
    if (blocked) {
      removeBlock();
      Alert.alert(
        'iHeal',
        'You have been blocked\nPlease contact our customer support',
        [
          {
            text: 'Close',
          },
        ],
      );
      navigation.navigate('AuthStack');
    }
  });
  useEffect(() => {
    const unsub = getData();
    return unsub;
  }, [props.navigation]);
  const getData = () => {
    console.log(props);
    const data = new FormData();
    data.append('u_id', props?.user?.u_id);
    data.append('from', 'user');
    new Promise((rsl, rej) => {
      props.getuserRatingBalance(data, rsl, rej);
    })
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => {});
  };
  logoutFun = () => {
    Alert.alert('iHeal', 'Log out now?', [
      {
        text: 'No',
      },
      {
        text: 'Log out',
        onPress: () => {
          props.logout();
          props.navigation.navigate('AuthStack');
        },
      },
    ]);
  };
  try {
    return (
      <View
        style={{
          backgroundColor: colors.primary,
          flex: 1,
          // width: 200,
        }}>
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              paddingLeft: DEVICE_HEIGHT < 600 ? 20 : 30,
              backgroundColor: colors.primary,
              borderBottomColor: colors.primary,
              marginTop: 50,
              paddingBottom: 30,
              borderBottomWidth: 2,
              borderBottomColor: colors.white,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <View style={{flex: 0.7}}>
                <Text
                  style={[
                    {
                      fontFamily: colors.font,
                      color: colors.white,
                      fontSize: DEVICE_WIDTH > 380 ? 18 : 15,
                    },
                  ]}>
                  {props.user.name}
                </Text>
                <View style={{alignSelf: 'flex-start'}}>
                  <Rating
                    readonly
                    type="star"
                    ratingCount={5}
                    fractions={0}
                    imageSize={20}
                    startingValue={userData?.totalrating}
                    tintColor={colors.primary}
                    // showRating
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  marginRight: 10,
                  padding: 4,
                  borderColor: 'white',
                }}>
                <Text
                  style={[
                    {
                      fontFamily: colors.boldFont,
                      color: colors.white,
                      fontWeight: 'bold',
                      fontSize: DEVICE_WIDTH > 380 ? 18 : 15,
                    },
                  ]}>
                  {`Rs: ${userData?.blnc ? userData?.blnc : '0'}`}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: colors.primary,
              width: '100%',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Home');
                // props.navigation.dispatch({
                //     type: 'CustomNav',
                //     routeName: 'Home',
                //     key: 'Home',
                // })
              }}
              style={[
                styles.routesContainer,
                {
                  marginTop: 0,
                },
              ]}>
              <Image
                source={homeImage}
                style={{width: 30, height: 30, marginBottom: 20}}
              />
              <Text style={styles.text}>Home</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Message');
                // props.navigation.dispatch({
                //     type: 'CustomNav',
                //     routeName: 'Home',
                //     key: 'Home',
                // })
              }}
              style={[
                styles.routesContainer,
                {
                  marginTop: 0,
                },
              ]}>
              <Image
                source={homeImage}
                style={{width: 30, height: 30, marginBottom: 20}}
              />
              <Text style={styles.text}>Message</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.dispatch({
                  type: 'CustomNav',
                  routeName: 'JobsHome',
                  key: 'JobsHome',
                });
              }}
              style={[
                styles.routesContainer,
                {
                  borderBottomWidth: 2,
                  borderBottomColor: colors.white,
                  marginBottom: 20,
                },
              ]}>
              <Image
                source={jobImage}
                style={{width: 30, height: 30, marginBottom: 20}}
              />
              <Text style={styles.text}>My Jobs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.dispatch({
                  type: 'CustomNav',
                  routeName: 'SettingsHome',
                  key: 'SettingsHome',
                });
              }}
              style={styles.routesContainer}>
              <SimpleLineIcons
                name="settings"
                style={{fontSize: 25, color: colors.white}}
              />
              <Text style={[styles.text, {marginBottom: 0}]}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                logoutFun();
              }}
              style={{
                flexDirection: 'row',
                paddingLeft: DEVICE_HEIGHT < 600 ? 20 : 30,
                alignItems: 'center',
                marginTop: 20,
              }}>
              <MaterialCommunityIcons
                name="logout"
                style={{
                  fontSize: 25,
                  color: colors.white,
                  transform: [{rotateY: '180deg'}],
                }}
              />
              <Text style={[styles.text, {marginBottom: 0}]}>Logout</Text>
            </TouchableOpacity>
            {/* <DrawerItems {...props} /> */}
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: colors.primary,
            borderTopColor: colors.primary,
            height: 50,
            paddingLeft: DEVICE_HEIGHT < 600 ? 20 : 30,
            alignSelf: 'flex-start',
          }}>
          {/* <Text style={styles.footerText}>iHeal by Sysbi</Text> */}
        </View>
      </View>
    );
  } catch {
    return <View />;
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.authReducer.user,
    blocked: state.authReducer.blocked,
    session: state.authReducer.session,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      logout,
      removeBlock,
      getuserRatingBalance,
    },
    dispatch,
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT < 600 ? 17 : 20,
    fontFamily,
    marginBottom: 10,
    marginLeft: 5,
  },
  editIcon: {
    fontSize: 30,
  },
  routesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: DEVICE_HEIGHT < 600 ? 20 : 30,
  },
  routeText: {
    fontFamily,
    fontSize: DEVICE_HEIGHT > 700 ? 22 : DEVICE_HEIGHT < 600 ? 17 : 20,
    color: colors.white,
  },
  footerText: {
    fontSize: 12,
    color: colors.white,
    fontFamily,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomDrawerContentComponent);
