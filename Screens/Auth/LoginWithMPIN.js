import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { APIResource } from "../../APIManager";
import TopView from "./TopView";
import Loader from "../../Components/UI/Loader";
import { RecoveryScreensEnum } from "../../Constants/Enum";
import constant from "../../Constants/constant";
import TextField from "../../Components/UI/TextField";
import AsyncStorage from "@react-native-community/async-storage";
import { color } from "react-native-reanimated";
const LoginWithMPIN = (props) => {
  const [mpin, setMpin] = useState("");
  const [showLoader, setLoader] = useState(false);
  const [fcmToken, setFcmToken] = useState("");
  function getUsername() {
    AsyncStorage.getItem("fcmToken").then((fcmToken) => {
      setFcmToken(fcmToken);
    });
  }
  useEffect(() => {
    getUsername();
  }, []);
  const navigateToRecoveryScreenHandler = (id) => {
    props.navigation.navigate(constant.Navigation.recoverCredentials, {
      prodId: id,
    });
  };
  const submitBtnHandler = () => {
    let error = "";
    if (mpin) {
      setLoader(true);
      APIResource.loginUserWithMpin(mpin, fcmToken).then((res) => {
        if (res.status === "success") {
          setLoader(false);
          props.navigation.push(constant.Navigation.dashboard);
        } else {
          setLoader(false);
          ToastAndroid.show(res.message, 5);
        }
      });
    } else {
      error = constant.Strings.validation.emptyMpin;
      ToastAndroid.show(error, 5);
    }
  };
  const BottomButtons = () => {
    return (
      <View style={styles.bottomButtonsContainer}>
        <Text
          style={styles.btmButtonText}
          onPress={navigateToRecoveryScreenHandler.bind(
            this,
            RecoveryScreensEnum.forgotMPIN.id
          )}
        >
          {constant.Strings.forgotMpin}
        </Text>
      </View>
    );
  };

  const createView = () => {
    return (
      <View>
        <TopView />
        <View style={{ ...styles.TextView, marginTop: 10 }}>
          <TextField
            id="mpin"
            placeholder={constant.Strings.mpin}
            returnKeyType={constant.ReturnKeyType.done}
            required={true}
            onSubmitEditing={() => submitBtnHandler()}
            icon={<Ionicons name="ios-phone-portrait" size={20} color={constant.Colors.primary} />}
            keyboardType="numeric"
            onChangeText={(mpin) => setMpin(mpin)}
          />
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}></View>
        {BottomButtons()}
        {showLoader && <Loader />}
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
    headerTitle: "LOGIN WITH MPIN",
    headerTintColor: "black"
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
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
    color: constant.Colors.primary,
    fontWeight: "bold"
  },
});

export default LoginWithMPIN;
