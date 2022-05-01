import React, {Component} from 'react';
import {Text, View, Alert, Dimensions, TouchableOpacity} from 'react-native';
// import { Button } from 'react-native-paper'
import RNRestart from 'react-native-restart';
let deviceWidth = Dimensions.get('window').width;

export default class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }
  static getDerivedStateFromError(error) {
    return {hasError: true};
  }
  render() {
    if (this.state.hasError)
      return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              marginTop: '60%',
              fontSize: deviceWidth > 700 ? 24 : 18,
              marginBottom: 20,
            }}>
            Something went wrong.
          </Text>
          <TouchableOpacity
            onPress={() => RNRestart.Restart()}
            mode="outlined"
            style={{}}>
            <Text
              style={{fontSize: deviceWidth > 700 ? 20 : 15, color: 'green'}}>
              Restart App
            </Text>
          </TouchableOpacity>
        </View>
      );
    return this.props.children;
  }
}
