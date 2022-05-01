import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors} from './colors';
import {fontSizes} from './fontSizes';
import {fonts} from './fonts';
import MaterialIcon from './MaterialIcon';

export const MoneyChat = ({money}) => {
  return (
    <View style={styles.moneyContainer}>
      <View style={styles.rupeeIconContainer}>
        <Text style={styles.rupeeIcon}>₹</Text>
        <MaterialIcon
          name="arrow-up"
          style={{marginTop: 4}}
          size={10}
          color={colors.primary}
        />
      </View>
      <Text style={styles.moneyText}>500</Text>
      <MaterialIcon
        name="arrow-left"
        style={{marginLeft: 6, alignSelf: 'flex-start', marginTop: 6}}
        size={24}
        color={colors.primary}
      />
    </View>
  );
};

export const GalleryChat = ({uri, text}) => {
  return (
    <View>
      <Image style={styles.galleryPhotoImg} source={{uri}} />
      <Text style={styles.galleryPhotoText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  moneyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: '#EAEAEA',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  moneyText: {
    // fontSize: fontSizes.xbig,
    color: colors.primary,
  },
  rupeeIconContainer: {
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rupeeIcon: {
    color: colors.primary,
    fontSize: 14,
  },
  galleryPhotoImg: {
    width: 200,
    height: 200,
  },
  galleryPhotoText: {
    fontSize: 14,
    color: colors.white,
    marginTop: 6,
  },
});
