import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  SafeAreaView,
  Dimensions,
  Animated,
  Linking,
  ScrollView,
  SectionList,
  FlatList,
} from 'react-native';
import colors from '../../assests/styles';

import Loader from '../general/Loader';
const {height: DEVICE_HEIGHT, width: DEVICE_WIDTH} = Dimensions.get('window');

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  signUp,
  signIn,
  getCategList,
  uploadCategList,
} from '../../actions/auth';
import DisableKeyboard from '../general/DismissKeybaord';

import {CheckBox} from 'react-native-elements';

class ChooseCateg extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      promo: '',
      email: '',
      electricalMain: false,
      DATA: [],
      loader: false,
    };
    this.animationEmail = new Animated.Value(0);
    this.animationPassword = new Animated.Value(0);
  }
  handler = async () => {
    let {DATA} = this.state;
    let {user} = this.props;

    var result = DATA.filter((e) => e.data)
      .map((e) => e.data.map((link) => (link.checked ? link.id : '')))
      .reduce((a, b) => a.concat(b), []);
    var finalres = result.filter((j) => j != '');

    if (finalres.length > 0) {
      this.setState({loader: true});

      const formData = new FormData();
      finalres &&
        finalres.map((item) => {
          formData.append('cat_id[]', item);
        });
      console.log(formData);
      const res = await this.props.uploadCategList(
        formData,
        user && user.phone_no,
        user && user.session,
      );
      if (res.status) {
        if (
          user?.name !== '' &&
          user?.dp !== '' &&
          user?.idcopy_back !== '' &&
          user?.idcopy_front !== ''
        ) {
          this.props.navigation.navigate('Drawer');
        } else {
          this.props.navigation.navigate('UpdateName');
        }
      } else {
        Alert.alert('iHeal', 'Kindly choose category');
      }
      this.setState({loader: false});
    }
  };
  componentDidMount = async () => {
    try {
      const res = await this.props.getCategList();
      this.setState({DATA: this.props.categList});
    } catch (err) {
      console.log(err);
    }
  };

  handleCheckPress = (item) => {
    const {DATA} = this.state;

    let newArr =
      DATA &&
      DATA.map((subItem) => {
        return {
          ...subItem,
          data: subItem.data.map((elem) => {
            if (elem.id === item.id) {
              return {
                ...elem,
                checked: !elem.checked,
              };
            }
            return elem;
          }),
        };
      });
    this.setState({DATA: newArr});
  };
  render() {
    const animEmail = this.animationEmail.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -120],
    });
    let opacity = this.animationEmail.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    const animPassword = this.animationPassword.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0],
    });
    return (
      <ScrollView style={{flex: 1, marginHorizontal: 5}}>
        {this.state.loader && <Loader />}
        <Animated.Text
          style={[
            styles.headerText,
            {
              opacity,
            },
          ]}>
          Please Choose your categories & sub categories
        </Animated.Text>

        {this.props.categList && (
          <SectionList
            sections={this.state.DATA}
            extraData={this.state.DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index}) => (
              <CheckBox
                title={item.name}
                textStyle={{
                  color: item.checked ? colors.primary : '#000',
                }}
                checkedColor={item.checked ? colors.primary : 'black'}
                checked={item.checked ? true : false}
                onPress={() => {
                  this.handleCheckPress(item);
                }}
              />
            )}
            renderSectionHeader={({section: {title}}) => (
              <Animated.Text
                style={[
                  styles.headerText,
                  {
                    opacity,
                    alignSelf: 'flex-start',
                  },
                ]}>
                {title}
              </Animated.Text>
            )}
          />
        )}

        <TouchableOpacity
          style={styles.primaryBtn}
          mode="contained"
          onPress={() => this.handler()}>
          <Text style={styles.primaryText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const {categList, user} = state.authReducer;
  return {categList, user};
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      signUp,
      signIn,
      getCategList,
      uploadCategList,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCateg);

const fontFamily = colors.font;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingTop: DEVICE_HEIGHT > 600 ? '15%' : '10%',
  },
  headerText: {
    fontSize: DEVICE_HEIGHT > 600 ? 18 : 14,
    color: colors.number,
    width: '90%',
    // textAlign: 'center',
    marginHorizontal: 10,

    fontFamily,
    lineHeight: 22,
    alignSelf: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    width: DEVICE_WIDTH > 700 ? '80%' : '90%',
  },
  input: {
    backgroundColor: colors.white,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: colors.inputFields,
    height: DEVICE_HEIGHT > 600 ? 40 : 30,
    fontSize: 15,
    marginVertical: 13,
    paddingVertical: 5,
    fontFamily,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 55 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
    fontFamily,
  },
});
export const Item = ({title, onPress, key}) => (
  <View>
    <CheckBox
      key={key}
      title={title.name}
      textStyle={{color: title.checked ? colors.primary : '#000'}}
      checkedColor={colors.primary}
      checked={Boolean(title.checked)}
      onPress={onPress}
    />
  </View>
);
