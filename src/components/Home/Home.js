import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
  Dimensions,
  Linking,
  TouchableOpacity,
  Text,
} from 'react-native';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '../../assests/styles';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {$CombinedState, bindActionCreators} from 'redux';
import {fcmToken, checkVersion} from '../../actions/auth';
import {getUserData} from '../../actions/profile';
import Modal from 'react-native-modal';
const {height: DEVICE_HEIGHT} = Dimensions.get('window');
const fontFamily = colors.font;
import {Divider} from 'react-native-elements';
import pkg from '../../../package.json';
import {showPopup, acceptOrder} from '../../actions/app';
//fcm
import {fcmService} from '../../service/FCMService';
import {localNotificationService} from '../../service/LocalNotificationService';
import moment from 'moment';
import {ScrollView} from 'react-native';

const Home = ({
  navigation,
  user,
  checkVersion,
  showPopup,
  fcmToken,
  acceptOrder,
}) => {
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [notiData, setNotiData] = useState(null);
  useEffect(() => {
    if (Platform.OS == 'ios') {
      getlocation();
    } else {
      requestLocationPermission();
    }
  }, []);
  const getlocation = () => {
    // geolocation.requestAuthorization()
    Geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const region = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        const marker = {latitude, longitude};
        setRegion(region);
        setMarker(marker);
      },
      (error) => {
        Alert.alert('Error', 'Location permission not granted');
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'iHeal',
          message: 'We need to access your location',
          // buttonNeutral: 'Ask Me Later',
          // buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getlocation();
      } else {
        requestLocationPermission();
      }
    } catch (err) {}
  };
  useEffect(() => {
    checkVersionFun();
    getPopupData();
  }, []);
  const getPopupData = async () => {
    try {
      const res = await showPopup(user?.session, user?.phone_no);
    } catch (err) {}
  };
  const checkVersionFun = () => {
    const data = new FormData();
    data.append('version', pkg.version);
    data.append('platform', Platform.OS);
    data.append('session_key', user && user.session);
    data.append('phone_no', user && user.phone_no);
    const promise = new Promise((rsl, rej) => {
      checkVersion(data, rsl, rej);
    });
    promise.then(async (res) => {
      Alert.alert(
        'iHeal',
        `A new version is available. To make use of the latest features, please update now`,
        [
          {
            text: 'Later',
          },
          {
            text: 'Update',
            onPress: () => Linking.openURL(res),
          },
        ],
      );
    });
  };
  const uploadFcmFun = async (token) => {
    // const {user, fcmToken} = this.props;
    const data = new FormData();
    data.append('phone_no', user.phone_no);
    data.append('session_key', user.session);
    data.append('token', token);
    fcmToken(data);
  };

  useEffect(() => {
    try {
      fcmService.registerAppWithFCM();

      fcmService.register(onRegister, onNotification, onOpenNotification);
      localNotificationService.configure(onOpenNotification);
    } catch (err) {
      console.log(err);
    }
    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);

  const onRegister = async (token) => {
    uploadFcmFun(token);
  };

  const onNotification = (notify, remoteMessage) => {
    console.log('remoteMessage onNotification: ', remoteMessage);
    console.log('notify onNotification: ', notify);

    localNotificationService.configure(onOpenNotification, remoteMessage);

    const options = {
      soundName: 'default',
      playSound: true, //,
      // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
      // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
    };
    localNotificationService.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options,
    );
  };
  const handleAccept = () => {
    const formData = new FormData();
    formData.append('order_id', notiData && notiData.order_id);
    new Promise((rsl, rej) => {
      acceptOrder(formData, user, rsl, rej);
    })
      .then((res) => {
        setModalVisible(false);

        // Alert.alert('iHeal', res.data.message);
        console.log(res);
      })
      .catch((err) => {
        setModalVisible(false);

        // Alert.alert('iHeal', err.message);

        console.log(err);
      });
  };
  const onOpenNotification = async (notify, remoteMessage) => {
    const res = await AsyncStorage.getItem('notification');
    console.log('async', JSON.parse(res));
    // console.log('onOpen ', remoteMessage);
    // let data = remoteMessage
    //   ? JSON.parse(remoteMessage.data && remoteMessage.data.orderdata)
    //   : JSON.parse(notify.orderdata);
    let parsedData = JSON.parse(res);
    parsedData && setNotiData(parsedData);

    const region = {
      latitude: parseFloat(parsedData && parsedData.lat),
      longitude: parseFloat(parsedData && parsedData.longi),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    const marker = {
      latitude: parseFloat(parsedData && parsedData.lat),
      longitude: parseFloat(parsedData && parsedData.longi),
    };

    console.log(region, marker);
    parsedData && setRegion(region);
    parsedData && setMarker(marker);
    parsedData && setModalVisible(true);
  };

  const renderModal = () => {
    return (
      <Modal isVisible={isModalVisible} coverScreen={true} hasBackdrop={true}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 4,

            height: Dimensions.get('window').height / 1.3,
            justifyContent: 'center',
          }}>
          <ScrollView contentContainerStyle={{flex: 1, marginVertical: 10}}>
            <Text style={styles.primaryText}>
              Description: {notiData && notiData.description}
            </Text>
            <Divider style={{width: '100%', height: 0.5}} />
            <Text style={styles.primaryText}>
              Date: {moment(notiData && notiData.order_date).format('L')}
            </Text>
            <Divider style={{width: '100%', height: 0.5}} />
            <Text style={styles.primaryText}>
              Time:
              {notiData?.time}
            </Text>
            <Divider style={{width: '100%', height: 0.5}} />
            <Text style={styles.primaryText}>
              Address: {notiData && notiData.geo_address}
            </Text>
            <Divider style={{width: '100%', height: 0.5}} />
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.mapmodal}
              initialRegion={{
                latitude: 0.0,
                longitude: 0.0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              // zoomEnabled
              // zoomControlEnabled
              region={region}
              // minZoomLevel={15}
            >
              {marker && <Marker coordinate={marker} />}
            </MapView>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity
                style={[
                  styles.primaryBtn,
                  {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: colors.primary,
                  },
                ]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.primaryText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => handleAccept()}>
                <Text style={[styles.primaryText, {color: 'white'}]}>
                  Accept
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 0.0,
          longitude: 0.0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={region}>
        {marker && <Marker coordinate={marker} />}
      </MapView>
      {isModalVisible && renderModal()}
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    popupData: state.appReducer.popupData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fcmToken,
      getUserData,
      checkVersion,
      showPopup,
      acceptOrder,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtn: {
    width: '40%',
    backgroundColor: colors.primary,
    marginTop: 10,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 55 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  mapmodal: {
    // marginTop: 14,
    width: '100%',
    height: '30%',
    marginBottom: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 23,
  },
  primaryText: {
    color: '#000',
    fontSize: 18,

    margin: 10,
  },
});
