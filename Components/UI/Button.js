import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Constants from "../../Constants/constant";
import constant from "../../Constants/constant";

const CustomButton = (props) => {
  const { style, title, textStyle, onPress } = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={styles.buttonGradient}
    >
      {
        <LinearGradient
          colors={["#f0eaa8", "#e9d060"]}
          style={{ ...styles.buttonGradient, ...style }}
        >
          <Text
            textBreakStrategy={"simple"}
            style={{ ...styles.text, ...textStyle }}
          >
            {title}
          </Text>
        </LinearGradient>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    height: 44,
  },
  buttonGradient: {
    height: 44,
    marginVertical: 10,
    width: "90%",
    borderRadius: 30,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: constant.Fonts.Size.headerTitle,
    textAlign: "center",
    color: "black",
    fontFamily: Constants.Fonts.FontFamily.semiBold,
    fontWeight: "bold",
  },
  highlightButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomButton;
