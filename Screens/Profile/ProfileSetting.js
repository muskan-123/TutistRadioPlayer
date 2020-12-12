import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, Switch } from "react-native";
import constant from "../../Constants/constant";
import Cart from "../../Components/UI/Cart";

const ProfileSettingScreen = (props) => {
  const [switchOneState, setSwitchOneState] = useState(true);
  const [switchTwoState, setSwitchTwoState] = useState(false);

  const handlerSwitchValues = (id) => {
    switch (id) {
      case 0:
        setSwitchOneState(!switchOneState);
        break;
      case 1:
        setSwitchTwoState(!switchTwoState);
        break;
      default:
        break;
    }
  };

  const createSwitch = () => {
    const createCart = (value, text, style, id) => {
      return (
        <Cart style={{ ...styles.cart, ...style }}>
          <Text style={styles.text}>{text}</Text>
          <Switch
            value={value}
            onValueChange={() => {
              handlerSwitchValues(id);
            }}
          />
        </Cart>
      );
    };
    return (
      <View style={styles.cartContainer}>
        {createCart(switchOneState, "One Click", styles.extraStyle, 0)}
        {createCart(switchTwoState, "Fast Access Login", null, 1)}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container} forceInset={{ bottom: "always" }}>
        {createSwitch()}
      </SafeAreaView>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: constant.Strings.ScreenTitle.setting,
    headerTintColor: "black"
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  extraStyle: {
    marginBottom: 20,
  },
  cart: {
    flexDirection: "row",
    height: 55,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  cartContainer: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: constant.Fonts.FontFamily.semiBold,
    textAlign: "left",
  },
});

export default ProfileSettingScreen;
