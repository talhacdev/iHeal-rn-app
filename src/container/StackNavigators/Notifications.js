import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import colors from '../../assests/styles'

const Notifications = () => {
    return (
        <View
        >
            <Icon
                name='bell-o'
                style={{
                    fontSize: 25,
                    color: colors.inputFields,
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    borderRadius: 50,
                    borderColor: colors.red,
                    alignSelf: 'flex-end',
                    borderWidth: StyleSheet.hairlineWidth,
                    padding: 1,
                    width: 15,
                    height: 15,
                    alignItems: 'center',
                    // marginTop:-5
                    right: -5
                }}
            >
                <Text style={{
                    fontSize: 8,
                    color: colors.red,
                    fontFamily: colors.font,
                }} >
                    1
            </Text>
            </View>
        </View>
    )
}

export default Notifications
