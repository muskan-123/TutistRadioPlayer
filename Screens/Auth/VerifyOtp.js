import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
} from "react-native";
import { APIResource } from "../../APIManager";
import Loader from "../../Components/UI/Loader";
import TopView from "../Auth/TopView";
import CustomButton from "../../Components/UI/Button";
import constant from "../../Constants/constant";
import TextField from "../../Components/UI/TextField";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
const VerifyOtp = (props) => {
  const [fcmToken, setFcmToken] = useState("");
  const [otp, setOtp] = useState();
  const [showLoader, setLoader] = useState(false);
  const [mobile, setMobile] = useState("");
  function getToken() {
    AsyncStorage.getItem("fcmToken").then((fcmToken) => {
      setFcmToken(fcmToken);
    });
    AsyncStorage.getItem("mobileNumber").then((res) => {
      if (res) setMobile(res);
      else setMobile("");
    });
  }
  useEffect(() => {
    getToken();
  }, []);
  const submitBtnHandler = () => {
    setLoader(true);
    console.log(fcmToken);
    APIResource.verifyUser(fcmToken, "9001234456", otp).then((res) => {
      console.log(res);
      setLoader(false);

      if (res.status === "success") {
        setOtp("");
        props.navigation.push(constant.Navigation.dashboard);
        ToastAndroid.show(res.message, 5);
      } else {
        ToastAndroid.show(res.message, 5);
      }
    });
  };

  const createView = () => {
    return (
      <View>
        <TopView
          isTextRequired={false}
          Container={{ padding: Dimensions.get("window").height / 5.5 }}
          logoStyle={{
            width: Dimensions.get("window").height / 4.5,
            position: "absolute",
            bottom: 55,
          }}
        />
        <View style={styles.customBtnContainer}>
          <TextField
            id="username"
            placeholder={"Enter OTP"}
            returnKeyType={"done"}
            required={true}
            keyboardType={"numeric"}
            icon={
              <MaterialCommunityIcons
                name="wallet-outline"
                size={24}
                color="grey"
              />
            }
            onChangeText={(otp) => setOtp(otp)}
            onSubmitEditing={submitBtnHandler}
            errorTitle={constant.Strings.emptyUserName}
          />
        </View>
        <View style={styles.TextView}>
          <CustomButton
            title={constant.Strings.verifyOtp}
            onPress={submitBtnHandler}
          />
        </View>
      </View>
    );
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <ScrollView>{createView()}</ScrollView>
        {showLoader && <Loader />}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "ADD FUNDS",
    headerBackTitleVisible: false,
  };
};

const styles = StyleSheet.create({
  customBtnContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  btmButtonText: {
    textAlign: "center",
    fontFamily: constant.Fonts.FontFamily.regular,
    fontSize: constant.Fonts.Size.Title,
  },
  contact: {
    color: "white",
    fontFamily: constant.Fonts.FontFamily.bold,
    fontSize: constant.Fonts.Size.Title,
    marginLeft: 5,
  },
  TextView: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});

export default VerifyOtp;
