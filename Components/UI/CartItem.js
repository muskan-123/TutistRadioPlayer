import React, {Children} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Constants from '../../Constants/constant';
import Cart from '../../Components/UI/Cart';
import constant from '../../Constants/constant';

const CartItem = (props) => {
  const {icon, title, iconStyle, selectHandler, imageStyle} = props;

  return (
    <Cart style={styles.style}>
      <TouchableWithoutFeedback onPress={selectHandler}>
        <View style={styles.container}>
          {/* <View style={[styles.imageContainer, imageStyle]}> */}
          {/* <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color="#e05a00"
            /> */}
          {/* <Image style={styles.icon} source={icon} resizeMode="contain" /> */}
          {/* </View> */}
          <View style={{justifyContent: 'flex-start'}}>
            <Text style={styles.text}>{title}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Cart>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    height: 43,
    width: 43,
    marginLeft: 15,
    marginRight: 13,
    borderRadius: 21.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: constant.Fonts.FontFamily.semiBold,
    textAlign: 'left',
    color: constant.Colors.primary,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  style: {
    marginVertical: 10,
    width: '100%',
    height: 70,
    borderRadius: 12,
    backgroundColor: constant.Colors.primary,
    paddingHorizontal: 30,
  },
});

export default CartItem;
