import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Platform,
  Dimensions,
} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');
import colors from '../../assests/styles';
import Logo from '../../assests/logo.png';
import Modal from 'react-native-modal';

import Home from '../../components/Home/Home';

import JobsHome from '../../components/Job/Home';
import FinishJob from '../../components/Job/FinishJob';
import Finished from '../../components/Job/Finished';
import Rating from '../../components/Job/Rating';
import Payment from '../../components/Job/Payment';
import Map from '../../components/Map';
import Settings from '../../components/Settings/Home';
import UpdateName from '../../components/Settings/UpdateName';
import UpdatePassword from '../../components/Settings/UpdatePassword';
import Messages from '../../components/Messages/Messages';

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => {
      return {
        headerLeft: (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{paddingHorizontal: 20}}>
            <Icon name="menu" color={colors.primary} style={{fontSize: 35}} />
          </TouchableOpacity>
        ),
        headerRight: (
          <View style={{paddingHorizontal: 20}}>
            <Image
              source={Logo}
              style={{
                width: DEVICE_HEIGHT < 500 ? 50 : 50,
                height: DEVICE_HEIGHT < 500 ? 50 : 50,
              }}
              resizeMode="contain"
            />
          </View>
        ),
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          height: DEVICE_HEIGHT < 500 ? 50 : 80,
          borderBottomWidth: 0,
          // alignItems:'center'
        },
      };
    },
  },

  Rating: {
    screen: Rating,
    navigationOptions: {
      headerShown: false,
    },
  },
  JobsHome: {
    screen: JobsHome,
    navigationOptions: ({navigation}) => {
      return {
        title: 'My Jobs',
        headerTitleStyle,
        headerStyle,
        headerLeft: <HeaderLeft navigation={navigation} />,
      };
    },
  },
  Map: {
    screen: Map,
    navigationOptions: ({navigation}) => {
      return {
        title: 'Location',
        headerTitleStyle,
        headerStyle,
        headerLeft: <HeaderLeft navigation={navigation} />,
      };
    },
  },
  Payment: {
    screen: Payment,
    navigationOptions: ({navigation}) => {
      return {
        title: 'My Jobs',
        headerTitleStyle,
        headerStyle,
        headerLeft: <HeaderLeft navigation={navigation} />,
      };
    },
  },

  Message: {
    screen: Messages,
    navigationOptions: {
      headerShown: false,
    },
  },

  FinishJob: {
    screen: FinishJob,
    navigationOptions: ({navigation}) => {
      return {
        title: 'Job Detail',
        headerTitleStyle,
        headerStyle,
        headerLeft: <HeaderLeft navigation={navigation} />,
      };
    },
  },

  Finished: {
    screen: Finished,
    navigationOptions: ({navigation}) => {
      return {
        title: 'Finish Done',
        headerTitleStyle,
        headerStyle,
        headerLeft: <HeaderLeft navigation={navigation} />,
      };
    },
  },

  //// settings ////
  SettingsHome: {
    screen: Settings,
    navigationOptions: ({navigation}) => {
      return {
        headerLeft: (
          <>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{paddingHorizontal: 20}}>
              <Icon name="menu" color={colors.primary} style={{fontSize: 35}} />
            </TouchableOpacity>
          </>
        ),
        headerRight: (
          <View
            style={{
              paddingHorizontal: 0,
            }}>
            <Image
              source={Logo}
              style={{
                width: DEVICE_HEIGHT < 500 ? 50 : 50,
                height: DEVICE_HEIGHT < 500 ? 50 : 50,
              }}
              resizeMode="contain"
            />
          </View>
        ),
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          height: DEVICE_HEIGHT < 500 ? 50 : 80,
          borderBottomWidth: 0,
        },
      };
    },
  },

  UpdateName: {
    screen: UpdateName,
    navigationOptions: ({navigation}) => {
      return {
        title: 'Update Profile',
        headerTitleStyle,
        headerStyle,
        headerLeft: <HeaderLeft navigation={navigation} />,
      };
    },
  },
  UpdatePassword: {
    screen: UpdatePassword,
    navigationOptions: ({navigation}) => {
      return {
        title: 'Update your Password',
        headerTitleStyle,
        headerStyle,
        headerLeft: <HeaderLeft navigation={navigation} />,
      };
    },
  },

  // initialRouteName: 'Payment',
});

export default HomeStack;

const headerTitleStyle = {
  textAlign: 'center',
  flex: 1,
  right: Platform.OS == 'ios' ? 0 : DEVICE_WIDTH * 0.075,
  fontFamily: colors.font,
};
const headerStyle = {
  elevation: 0,
  shadowOpacity: 0,
  height: DEVICE_HEIGHT < 500 ? 30 : 60,
  borderBottomWidth: 0,
};

function HeaderLeft(props) {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.goBack()}
      style={{paddingHorizontal: 15}}>
      <AntDesign
        name="arrowleft"
        color={colors.number}
        style={{fontSize: 25}}
      />
    </TouchableOpacity>
  );
}
const prevStateWithActions = HomeStack.router.getStateForAction;
HomeStack.router = {
  ...HomeStack.router,
  getStateForAction(action, state) {
    if (state && action.type === 'CustomNav') {
      const routes = state.routes.slice(0, 1);
      routes.push(action);
      return {
        ...state,
        routes,
        index: 1,
      };
    }
    return prevStateWithActions(action, state);
  },
};
