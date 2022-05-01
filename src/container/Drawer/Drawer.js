import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Dimensions, StyleSheet} from 'react-native';

import Navigators from '../StackNavigators/Home';

import colors from '../../assests/styles';
import CustomeComponent from './CustomeComponent';

const {width: DEVICE_WIDTH} = Dimensions.get('window');

const Drawer = createDrawerNavigator(
  {
    Navs: {
      screen: Navigators,
      navigationOptions: {
        title: '',
      },
    },
  },
  {
    drawerWidth: DEVICE_WIDTH * 0.7,
    contentComponent: CustomeComponent,
    contentOptions: {
      activeTintColor: colors.white,
      inactiveTintColor: colors.white,
      activeBackgroundColor: colors.primary,
      inactiveBackgroundColor: colors.primary,
      itemsContainerStyle: {
        paddingHorizontal: 15,
      },
      labelStyle: {fontSize: 18, fontWeight: '100'},
    },
    drawerBackgroundColor: colors.primary,
    unmountInactiveRoutes: true,
    iconContainerStyle: {
      color: colors.white,
    },
  },
);

export default Drawer;

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    paddingLeft: DEVICE_WIDTH / 2,
    justifyContent: 'center',
  },
  borderContainer: {
    borderBottomWidth: 2,
    width: DEVICE_WIDTH,
    paddingLeft: DEVICE_WIDTH / 2,
    justifyContent: 'center',
    opacity: 1,
    borderBottomColor: colors.white,
    paddingBottom: 15,
  },
  text: {
    color: colors.white,
    fontSize: 20,
  },
});
