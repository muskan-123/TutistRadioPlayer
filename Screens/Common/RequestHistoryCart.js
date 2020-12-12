import React from "react";
import { View, StyleSheet, Text } from "react-native";

import constant from "../../Constants/constant";

const RequestHistoryCart = (props) => {
  const { dataArray } = props;
  return (
    <View style={styles.container}>
      {dataArray.map((item, key) => (
        <View key={key} style={styles.cartView}>
          <View style={styles.textContainer}>
            <Text style={styles.keyText}>{item.key}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.valueText}>{item.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.Colors.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  cartView: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: constant.Colors.grey,
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 1,
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  keyText: {
    color: "black",
    fontSize: 16,
    fontFamily: constant.Fonts.FontFamily.regular,
  },
  valueText: {
    color: constant.Colors.darkRed,
    fontSize: 16,
    fontFamily: constant.Fonts.FontFamily.regular,
  },
});

export default RequestHistoryCart;
