import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import constant from "../../Constants/constant";

const TopView = (props) => {
  const { isTextRequired = true, logoStyle, Container } = props;
  let view = isTextRequired ? (
    <View>
      <Text style={styles.text}>{constant.ServiceProvider.time}</Text>
      <Text style={styles.text}>Email : {constant.ServiceProvider.email}</Text>
    </View>
  ) : null;
  return (
    <View>
      <View style={{ ...styles.logoContainer, ...Container }}>
        <Image
          style={{ ...styles.logo, ...logoStyle }}
          source={require("../../assets/matka360.png")}
        />
      </View>
      {view}
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 160,
    height: "auto",
    aspectRatio: 2.4 / 2,
  },
  text: {
    color: constant.Colors.primary,
    textAlign: "center",
    fontFamily: constant.Fonts.FontFamily.bold,
    fontSize: constant.Fonts.Size.Title,
    marginBottom: 3,
  },
});

export default React.memo(TopView);
