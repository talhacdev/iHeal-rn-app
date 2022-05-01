import React from 'react'
import { View, Dimensions, ActivityIndicator } from 'react-native';
// import { ActivityIndicator } from 'react-native-paper';
import colors from '../../assests/styles';
const { height: DEVICE_HEIGHT } = Dimensions.get('window');

const Loader = () => {
    return (
        <View style={{
            backgroundColor: 'rgba(121,121,121,0.5)', position: 'absolute',
            width: '100%', height: DEVICE_HEIGHT
        }} >
            <ActivityIndicator
                color={colors.secondary}
                size={50}
                style={{ marginTop: DEVICE_HEIGHT * 0.4 }}
            />
        </View>
    )
}

export default Loader
