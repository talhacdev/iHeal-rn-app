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
import colors from '../assests/styles';
// import MapViewDirections from 'react-native-maps-directions';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {$CombinedState, bindActionCreators} from 'redux';
const {height: DEVICE_HEIGHT} = Dimensions.get('window');
const fontFamily = colors.font;
import {Divider} from 'react-native-elements';
//fcm
import moment from 'moment';
import {ScrollView} from 'react-native';

const Map = ({navigation, route}) => {
  const user = navigation.getParam('job');
  console.log('DEBUG PARAMS: ', user);
  const [region, setRegion] = useState({
    latitude: parseFloat(user?.lati),
    longitude: parseFloat(user?.longi),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [marker, setMarker] = useState({
    latitude: parseFloat(user?.lati),
    longitude: parseFloat(user?.longi),
  });
  const [vehicles, setVehicles] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [notiData, setNotiData] = useState(null);

  const openGoogleMaps = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${user?.lati},${user?.longi}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  //   useEffect(() => {
  //     if (Platform.OS == 'ios') {
  //       getlocation();
  //     } else {
  //       requestLocationPermission();
  //     }
  //   }, []);

  // useEffect(() => {
  //   openGoogleMaps();
  // }, []);

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
        {/* <MapViewDirections
          origin={{
            latitude: 0.0,
            longitude: 0.0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          destination={region}
          // apikey={GOOGLE_MAPS_APIKEY}
        /> */}
        {marker && <Marker coordinate={region} />}
      </MapView>

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          padding: 10,
        }}>
        <TouchableOpacity onPress={() => openGoogleMaps()}>
          <Text
            style={{alignSelf: 'center', textAlign: 'center', fontSize: 15}}>
            {user?.geo_address}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    popupData: state.appReducer.popupData,
  };
};

export default Map;
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
