import React, { Children } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Constants from "../../Constants/constant";

const Cart = (props) => {
  const { selectedCart } = props;
  return (
    <LinearGradient
      colors={["#f0eaa8", "#e9d060"]}
      style={{ ...styles.cartView, ...props.style }}
    >
      {props.children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cartView: {
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
});

export default Cart;
