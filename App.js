import React, {Component} from 'react';
import {View, Text} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text> App </Text>
      </View>
    );
  }
}
