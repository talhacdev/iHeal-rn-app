import React from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';

import colors from '../../assests/styles';
import confirm from '../../assests/confirm.png';

const {width: DEVICE_WIDTH} = Dimensions.get('window');
const Finished = () => {
  return (
    <View style={styles.container}>
      <Image
        source={confirm}
        style={{width: DEVICE_WIDTH * 0.55, height: DEVICE_WIDTH * 0.55}}
        resizeMode="center"
      />
      <Text style={styles.text}>Payment Received</Text>
    </View>
  );
};

export default Finished;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: '15%',
  },
  text: {
    color: colors.number,
    fontSize: 18,
    marginBottom: 5,
    marginTop: 15,
    fontFamily: colors.font,
  },
});
