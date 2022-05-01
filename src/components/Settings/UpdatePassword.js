import React, { Component } from 'react'
import {
    Text, View, StyleSheet, TextInput, TouchableOpacity,
    ScrollView, Dimensions, Alert
} from 'react-native';

import colors from '../../assests/styles';
const { height: DEVICE_HEIGHT } = Dimensions.get('window')

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePassword } from '../../actions/profile';

import Loader from '../general/Loader'
import DismissKeybaord from '../general/DismissKeybaord'

class UpdatePassword extends Component {
    constructor() {
        super();
        this.state = {
            old: '',
        }
    }
    handler = () => {
        const { user, updatePassword, navigation } = this.props;
        let { old, newPass } = this.state;
        if (newPass.length < 8) {
            alert('Password must be 8 characters long')
        }
        else {
            this.setState({ loader: true })
            const formData = new FormData();
            formData.append("phone_no", user.phone_no)
            formData.append("session_key", user.session)
            formData.append("old_pass", old);
            formData.append("new_pass", newPass);
            new Promise((rsl, rej) => {
                updatePassword(formData, rsl, rej)
            })
                .then((res) => {
                    this.setState({ loader: false })
                    navigation.goBack();
                })
                .catch((err) => {
                    Alert.alert('Sorry', err)
                    this.setState({ loader: false })
                })
        }
    }
    render() {
        return (
            <DismissKeybaord>
                <View style={styles.container}
                    keyboardShouldPersistTaps='always'
                >
                    <View style={styles.inputContainer} >
                        <TextInput
                            autoFocus
                            secureTextEntry
                            placeholder='Old Password'
                            placeholderTextColor={colors.schedule}
                            style={styles.input}
                            onChangeText={(old) => this.setState({ old })}
                            value={this.state.old}
                            ref={(input) => this.old = (input)}
                            onSubmitEditing={() => this.newPass.focus()}
                        />
                        <TextInput
                            secureTextEntry
                            placeholder='New Password'
                            placeholderTextColor={colors.schedule}
                            style={styles.input}
                            onChangeText={(newPass) => this.setState({ newPass })}
                            value={this.state.newpass}
                            ref={(input) => this.newPass = (input)}
                        />
                    </View>
                    <TouchableOpacity style={styles.primaryBtn}
                        onPress={() => this.handler()}
                    >
                        <Text style={styles.primaryText} >Update</Text>
                    </TouchableOpacity>
                    {this.state.loader && <Loader />}
                </View>
            </DismissKeybaord>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updatePassword
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);

const fontFamily = colors.font
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
    },
    text: {
        fontSize: DEVICE_HEIGHT > 600 ? 20 : 16,
        fontFamily
    },
    inputContainer: {
        width: '80%',
        marginBottom: DEVICE_HEIGHT > 600 ? 30 : 20
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: colors.schedule,
        marginBottom: 40,
        padding: 5,
        fontFamily,
        // color: colors.schedule,
        // height: DEVICE_HEIGHT > 600 ? 30 : 25,
        fontSize: 18
    },
    primaryBtn: {
        width: '80%',
        backgroundColor: colors.primary,
        marginTop: 10,
        borderRadius: 10,
        height: DEVICE_HEIGHT > 600 ? 55 : 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    primaryText: {
        color: colors.white,
        fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
        fontFamily
    },
})
