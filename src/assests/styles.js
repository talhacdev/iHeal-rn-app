import {Dimensions} from 'react-native';

const {height: DEVICE_HEIGHT, width: DEVICE_WIDTH} = Dimensions.get('window');

const colors = {
  primary: 'rgb(39,145,137)', // btn color
  secondary: 'rgb(242,242,242)', // btn color
  schedule: 'rgb(212,212,212)', // btn color
  text: 'rgb(155,155,155)', // btn color
  camera: 'rgb(51,51,51)', // profile camera icon color black
  inputFields: 'rgb(209,209,209)', // placeholder color
  number: 'rgb(100,100,100)', // profile phone number color
  locationiIcon: 'rgb(168,168,168)', // location screen color
  white: '#fff',
  red: 'red',
  lightGrey: '#F2F2F2',

  font: 'Cillian-Semi-expandedLight',
  boldFont: 'Cillian',
  seperator: 'rgba(209,209,209,0.5)',
};

export default colors;

export const primaryBtn = {
  width: '80%',
  backgroundColor: colors.primary,
  marginTop: 10,
  borderRadius: 10,
  height: DEVICE_HEIGHT > 500 ? 50 : 40,
  justifyContent: 'center',
  alignItems: 'center',
};
export const primaryText = {
  color: '#fff',
  fontSize: DEVICE_HEIGHT > 500 ? 22 : 14,
  fontFamily: colors.font,
};
