import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assests/styles';
const {height: DEVICE_HEIGHT} = Dimensions.get('window');
const ImagePicker = require('react-native-image-picker');
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateProfile} from '../../actions/profile';
import RBSheet from 'react-native-raw-bottom-sheet';
import {storeurl} from '../../config/config';
import Loader from '../general/Loader';
import DismissKeybaord from '../general/DismissKeybaord';

class UpdateName extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loader: false,
      nic: '',
      image: '',
      cnicFront: '',
      cnicback: '',
      selectedCateg: [],
    };
  }

  componentDidMount() {
    console.log(JSON.stringify(this.props.user.dp));
    this.setState({
      name: this.props.user.name,
    });
  }

  openCamera = (from) => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        if (response.didCancel) {
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else {
          const source = {uri: response.uri};
          if (from == 1) {
            this.setState({image: response.uri});
          } else if (from == 2) {
            this.setState({cnicFront: response.uri});
          } else {
            this.setState({cnicback: response.uri});
          }
          // setImage(source);
          // setFile(response);
        }
      },
    );
  };
  handler = () => {
    const {user, updateProfile, navigation} = this.props;
    let {name, cnicFront, cnicback, image} = this.state;
    name = name.trim();
    if (name.length < 2) {
      alert('Please enter first name');
    } else if (!image && !this.props.user.dp) {
      alert('Please upload profile image');
    } else if (
      (!cnicFront && !this.props.user.idcopy_front) ||
      (!cnicback && !this.props.user.idcopy_back)
    ) {
      alert('Please upload CNIC Front and back picture');
    } else {
      this.setState({loader: true});
      const formData = new FormData();
      formData.append('phone_no', user.phone_no);
      formData.append('session_key', user.session);
      formData.append('name', name);
      formData.append('cell_no', user.phone_no);
      formData.append('email', user.email);
      {
        image &&
          formData.append('file', {
            uri: image,
            name: 'IMG_' + new Date().getTime(),
            type: 'image/jpeg',
          });
      }
      {
        cnicFront &&
          formData.append('idcopy_front', {
            uri: cnicFront,
            name: 'IMG_' + new Date().getTime(),
            type: 'image/jpeg',
          });
      }
      cnicback &&
        formData.append('idcopy_back', {
          uri: cnicback,
          name: 'IMG_' + new Date().getTime(),
          type: 'image/jpeg',
        });
      console.log(formData);
      new Promise((rsl, rej) => {
        updateProfile(formData, rsl, rej);
      })
        .then((res) => {
          this.setState({loader: false});
          navigation.navigate('Home');
        })
        .catch((err) => {
          Alert.alert('iHeal', err);
          this.setState({loader: false});
        });
    }
  };
  render() {
    const {cnicback, cnicFront, image, selectedCateg} = this.state;
    return (
      <ScrollView
        style={{flex: 1, flexGrow: 1}}
        contentContainerStyle={{alignItems: 'center', marginTop: 20}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.openCamera(1)}
          style={{
            alignItems: 'center',
            height: 100,
            width: 100,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.primary,
            marginBottom: 30,
            alignSelf: 'center',
          }}>
          {!image && !this.props.user.dp ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.openCamera(1)}>
              <Ionicons name="ios-camera" size={40} color={colors.primary} />
            </TouchableOpacity>
          ) : (
            <Image
              source={{
                uri: image ? image : `${storeurl}${this.props?.user?.dp}`,
              }}
              style={{
                alignItems: 'center',
                height: 100,
                width: 100,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.primary,

                borderStyle: 'dashed',
                alignSelf: 'center',
              }}
            />
          )}
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your full name"
            placeholderTextColor={colors.schedule}
            style={styles.input}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.openCamera(2)}
          style={{
            alignItems: 'center',
            height: 180,
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            borderWidth: 1,
            borderColor: colors.primary,
            marginVertical: 10,
            borderStyle: 'dashed',
          }}>
          {!cnicFront && !this.props.user.idcopy_front ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.openCamera(2)}>
              <Ionicons name="ios-camera" size={40} color={colors.primary} />
            </TouchableOpacity>
          ) : (
            <Image
              source={{
                uri: cnicFront
                  ? cnicFront
                  : `${storeurl}${this.props.user.idcopy_front}`,
              }}
              style={{
                // alignItems: 'center',
                height: 150,
                width: 280,
                // justifyContent: 'center',
              }}
            />
          )}
          <Text style={{color: colors.primary}}>CNIC FRONT SIDE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.openCamera(3)}
          style={{
            alignItems: 'center',
            height: 180,
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            borderWidth: 1,
            borderColor: colors.primary,
            marginVertical: 10,
            borderStyle: 'dashed',
          }}>
          {!cnicback && !this.props.user.idcopy_back ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.openCamera(3)}>
              <Ionicons name="ios-camera" size={40} color={colors.primary} />
            </TouchableOpacity>
          ) : (
            <Image
              source={{
                uri: cnicback
                  ? cnicback
                  : `${storeurl}${this.props.user.idcopy_back}`,
              }}
              style={{
                // alignItems: 'center',
                height: 150,
                width: 280,
                // justifyContent: 'center',
              }}
            />
          )}

          <Text style={{color: colors.primary}}>CNIC Back SIDE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => this.handler()}>
          <Text style={[styles.primaryText]}>Update</Text>
        </TouchableOpacity>
        {this.state.loader && <Loader />}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateProfile,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateName);

const fontFamily = colors.font;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  text: {
    fontSize: DEVICE_HEIGHT > 600 ? 20 : 16,
    fontFamily,
  },
  inputContainer: {
    width: '80%',
    marginBottom: DEVICE_HEIGHT > 600 ? 20 : 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.schedule,
    marginBottom: 20,
    padding: 5,
    fontFamily,
    // color: colors.schedule,
    // height: DEVICE_HEIGHT > 600 ? 30 : 25,
    fontSize: 18,
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
    fontSize: DEVICE_HEIGHT > 600 ? 18 : 16,
    fontFamily,
    margin: 20,
  },
});
