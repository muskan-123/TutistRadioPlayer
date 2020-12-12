import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { APIResource } from "../../APIManager";
import TopView from "./TopView";
import CustomButton from "../../Components/UI/Button";
import { RecoveryScreensEnum } from "../../Constants/Enum";
import constant from "../../Constants/constant";
import TextField from "../../Components/UI/TextField";
import Loader from "../../Components/UI/Loader";
const RecoverCredentials = (props) => {
  const prodID = props.route.params?.prodId ?? null;
  const [mobileNum, setMobileNum] = useState("");
  const [showLoader, setLoader] = useState(false);
  let buttonTitle;
  if (prodID === RecoveryScreensEnum.forgotPassword.id) {
    buttonTitle = constant.Strings.getPassword;
  } else if (prodID === RecoveryScreensEnum.forgotUsername.id) {
    buttonTitle = constant.Strings.getUserName;
  } else if (prodID === RecoveryScreensEnum.forgotMPIN.id) {
    buttonTitle = constant.Strings.getMPIN;
  }

  const submitBtnHandler = (id) => {
    const prodID = props.route.params?.prodId ?? null;
    console.log(prodID);
    let error = "";
    if (mobileNum) {
      setLoader(true);
      switch (prodID) {
        case 0:
          APIResource.forgotPassword(mobileNum).then((res) => {
            if (res.status === "success") {
              setLoader(false);
              props.navigation.navigate(constant.Navigation.loginWithMPIN);
            } else {
              setLoader(false);
              ToastAndroid.show(res.message, 5);
            }
          });
        case 1:
          APIResource.forgotUserName(mobileNum).then((res) => {
            if (res.status === "success") {
              setLoader(false);
              props.navigation.navigate(constant.Navigation.loginWithMPIN);
            } else {
              setLoader(false);
              ToastAndroid.show(res.message, 5);
            }
          });
        case 2:
          APIResource.forgotPassword(mobileNum).then((res) => {
            if (res.status === "success") {
              setLoader(false);
              props.navigation.navigate(constant.Navigation.loginWithMPIN);
            } else {
              setLoader(false);
              ToastAndroid.show(res.message, 5);
            }
          });
      }
    } else {
      error = constant.Strings.validation.emptyMobile;
      ToastAndroid.show(error, 5);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <TopView />
          <View style={{ ...styles.TextView, marginTop: 10 }}>
            <TextField
              id="phoneNum"
              placeholder={constant.Strings.mobileNum}
              returnKeyType={constant.ReturnKeyType.done}
              required={true}
              icon={
                <Ionicons
                  name="ios-phone-portrait"
                  size={20}
                  color={constant.Colors.primary}
                />
              }
              keyboardType="number-pad"
              onChangeText={(mobileNum) => setMobileNum(mobileNum)}
              // errorTitle={constant.Strings.emptyUserName}
            />
          </View>
          <View style={styles.TextView}>
            <CustomButton
              title={buttonTitle}
              onPress={() => submitBtnHandler()}
            />
          </View>
        </ScrollView>
        {showLoader && <Loader />}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Recover Credentials",
    headerBackTitleVisible: false,
    //headerRight: () => <LeftHeader />,
    headerTintColor: "black"
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  TextView: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});

export default RecoverCredentials;
