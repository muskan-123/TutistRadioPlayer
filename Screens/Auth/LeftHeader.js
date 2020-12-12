import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import constant from "../../Constants/constant";

const LeftHeader = (props) => {
  return (
    <View style={styles.leftHeaderView}>
      <Image
        style={{ width: 17, height: 17 }}
        source={require("../../assets/whatsapp.png")}
      />
      <Text style={styles.contact}>{constant.ServiceProvider.contact}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  leftHeaderView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 50,
  },
  contact: {
    color: "black",
    fontFamily: constant.Fonts.FontFamily.bold,
    fontSize: constant.Fonts.Size.Title,
    marginLeft: 5,
    fontWeight: "bold"
  },
});

export default LeftHeader;
