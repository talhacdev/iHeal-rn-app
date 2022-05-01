import React, {useEffect} from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import ErrorBoundary from './exceptionHandler';
import Drawer from './Drawer/Drawer';
import AuthStack from './StackNavigators/auth';
import LoadginScreen from './LoadingScreen';
console.disableYellowBox = true;

import BackgroundTimer from 'react-native-background-timer';
import Geolocation from 'react-native-geolocation-service';
import {connect} from 'react-redux';
import {sendLocation} from '../actions/app';
const App = ({sendLocation, user}) => {
  useEffect(() => {
    const intervalId = BackgroundTimer.setInterval(() => {
      getWorkerLocation();
    }, 60000);
    return () => {
      intervalId;
    };
  });

  const getWorkerLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        (position) => {
          let {latitude, longitude} = position.coords;

          if (latitude && longitude) {
            const params = new FormData();
            params.append('lat', latitude);
            params.append('longi', longitude);

            new Promise((rsl, rej) => {
              sendLocation(params, user, rsl, rej);
            })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
          }
        },
        (error) => {
          console.log(error);
          // See error code charts below.
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ErrorBoundary>
        <AppContainer />
      </ErrorBoundary>
    </>
  );
};

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      LoadginScreen: {
        screen: LoadginScreen,
      },

      AuthStack: {
        screen: AuthStack,
      },
      Drawer: {
        screen: Drawer,
      },
    },
    {
      // initialRouteName: 'Drawer',
    },
  ),
);
const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};
export default connect(mapStateToProps, {sendLocation})(App);
