import {Rating} from 'react-native-ratings';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Header, Divider} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assests/styles';
import {connect} from 'react-redux';

const fontFamily = colors.font;
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {giverating} from '../../actions/app';
class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: '',
    };
  }
  handleRating = async () => {
    const {popupData, user, giverating} = this.props;
    const job = this.props.navigation.getParam('job');
    try {
      const formData = new FormData();
      formData.append('order_id', job && job.order_id);
      formData.append('stars', this.state.rating);
      formData.append('from', 'user');
      const res = await giverating(
        formData,
        user && user.phone_no,
        user && user.session,
      );

      if (res.data.status) {
        Alert.alert('iHeal', res.data.message);
        this.props.navigation.navigate('Home');
      } else {
        Alert.alert('iHeal', res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  ratingCompleted = (rating) => {
    console.log('Rating is: ' + rating);
    this.setState({rating});
  };
  render() {
    const job = this.props.navigation.getParam('job');
    console.log(job);
    const {popupData} = this.props;
    return (
      <View style={{flex: 1}}>
        <View>
          <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
          {/* <Header
            backgroundColor={'white'}
            centerComponent={<Text style={[styles.texthome]}>RWP10KO8G</Text>}
          /> */}
        </View>
        <View
          style={{
            backgroundColor: '#DDD',
            height: height / 9,
            width: '100%',
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <View
            style={{
              // backgroundColor: 'orange',
              width: '15%',
              flexDirection: 'column',
            }}>
            
          </View> */}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <View
              style={{
                width: '10%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: 'green',
                  alignSelf: 'center',
                }}
              />
              <Divider
                style={{
                  width: 1,
                  height: 25,
                  alignSelf: 'center',
                  borderStyle: 'dotted',
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: 'lightgray',
                }}
              />
              <FontAwesome name="map-marker" size={20} color={'red'} />
            </View> */}
            <View style={{width: '100%'}}>
              <TextInput
                style={{
                  padding: 20,
                  width: '100%',
                  fontSize: 14,
                  fontFamily,
                }}
                editable={false}
                placeholder={job?.geo_address}
              />
              {/* <Divider style={{height: 2}} /> */}
              {/* <TextInput
                style={{padding: 10, width: '100%', fontSize: 14, fontFamily}}
                editable={false}
                placeholder="10a Dhamial Rd Ashraf Colony MPCHS"
              /> */}
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'green',
            height: 40,
            marginTop: 20,
            marginLeft: 15,
            marginRight: 15,
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <Text
            style={{
              fontFamily,
              color: 'grey',
              fontSize: 15,
            }}>
            Net-Payable
          </Text>
          <Text
            style={{position: 'absolute', right: 5, fontFamily, fontSize: 15}}>
            {job?.net_payable}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'green',
            height: 40,
            marginTop: 10,
            alignItems: 'center',
            alignContent: 'center',
            borderBottomWidth: 2,
            borderBottomColor: 'grey',
            marginLeft: 15,
            marginRight: 15,
          }}>
          <Text
            style={{
              fontFamily,
              // marginLeft: 20,
              color: 'grey',
              fontSize: 15,
            }}>
            Amount-Paid
          </Text>
          <Text
            style={{position: 'absolute', right: 5, fontFamily, fontSize: 15}}>
            {job?.amountpaid}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'green',
            height: 40,
            marginTop: 20,
            marginLeft: 15,
            marginRight: 15,
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <Text
            style={{
              fontFamily,
              color: 'grey',
              fontSize: 15,
            }}>
            Description
          </Text>
          <Text
            style={{position: 'absolute', right: 5, fontFamily, fontSize: 15}}>
            {job?.description}
          </Text>
        </View>
        <View style={{marginTop: 200}}>
          <Rating
            type="star"
            ratingCount={5}
            fractions={0}
            imageSize={40}
            startingValue={0}
            // showRating
            onFinishRating={this.ratingCompleted}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.handleRating();
          }}
          style={{
            backgroundColor: 'black',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            marginBottom: 20,
            height: 40,
            backgroundColor: 'green',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome name="check" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  fontsize: {
    color: 'white',
  },
  texthome: {
    color: 'grey',
    fontFamily,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
const mapStateToProps = (state) => {
  const {user} = state.authReducer;
  const {popupData} = state.appReducer;

  return {user, popupData};
};
export default connect(mapStateToProps, {giverating})(Ratings);
