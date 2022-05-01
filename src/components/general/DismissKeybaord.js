import React from 'react'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'

const DismissKeybaord = ({ children }) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
        >
            {children}
        </TouchableWithoutFeedback>
    )
}

export default DismissKeybaord
