import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import Constants from "../../Constants/constant";

const Loader = (props) => {
  const { size, style } = props;
  return (
    <View style={{ ...styles.container, style }}>
      <ActivityIndicator
        size={"large"}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
        color={Constants.Colors.kPrimary}
      ></ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Loader;
