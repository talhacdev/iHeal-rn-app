import React from 'react';
import {View, Image} from 'react-native';
import Logo from '../assests/header_logo.jpg';
import logo from '../assests/logo.png';
import {connect} from 'react-redux';

const LoadingScreen = (props) => {
  React.useEffect(() => {
    setTimeout(() => {
      const {user} = props;
      if (user) {
        if (
          user?.name !== '' &&
          user?.dp !== '' &&
          user?.idcopy_back !== '' &&
          user?.idcopy_front !== ''
        ) {
          props.navigation.navigate('Drawer');
        } else {
          // props.navigation.navigate('UpdateName');
          props.navigation.navigate('Drawer');
        }
      } else {
        props.navigation.navigate('AuthStack');
      }
      // props.user !== undefined
      //   ? props.navigation.navigate('Drawer')
      //   : props.navigation.navigate('AuthStack');
    }, 3000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Image source={logo} style={{height: 200, width: 200}} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};

export default connect(mapStateToProps, null)(LoadingScreen);
