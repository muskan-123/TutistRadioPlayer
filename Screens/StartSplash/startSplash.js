import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import TopView from "../Auth/TopView";
import CustomButton from "../../Components/UI/Button";
import constant from "../../Constants/constant";
const StartSplashScreen = (props) => {
  const createView = () => {
    return (
      <View>
        <TopView
          isTextRequired={false}
          Container={{ padding: Dimensions.get("window").height / 9 }}
          logoStyle={{ width: Dimensions.get("window").height / 3 }}
        />
        <View style={styles.customBtnContainer}>
          <CustomButton
            title={constant.Strings.login + " "}
            onPress={() => props.navigation.push(constant.Navigation.login)}
          />
          {/* <CustomButton
            title={"   CREATE A NEW ACCOUNT    "}
            onPress={() => props.navigation.push(constant.Navigation.signUp)}
            textStyle={{ color: "black" }}
          /> */}
        </View>
      </View>
    );
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <ScrollView>{createView()}</ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: null,
    headerBackTitleVisible: false,
    headerLeft: () => (
      <View style={styles.leftHeaderView}>
        <Image
          style={{ width: 17, height: 17 }}
          source={require("../../assets/whatsapp.png")}
        />
        <Text style={styles.contact} onPress={() => {}}>
          {constant.ServiceProvider.contact}
        </Text>
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  customBtnContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  TextView: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  btmButtonText: {
    textAlign: "center",
    fontFamily: constant.Fonts.FontFamily.regular,
    fontSize: constant.Fonts.Size.Title,
  },
  contact: {
    color: "black",
    fontFamily: constant.Fonts.FontFamily.bold,
    fontSize: constant.Fonts.Size.Title,
    marginLeft: 5,
    fontWeight: "bold"
  },
  leftHeaderView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
  customBtnStyle: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: constant.Colors.grey,
  },
});

export default StartSplashScreen;
