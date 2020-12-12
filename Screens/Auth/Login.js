import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { APIResource } from "../../APIManager";
import constant from "../../Constants/constant";
import TextField from "../../Components/UI/TextField";
import CustomButton from "../../Components/UI/Button";
import TopView from "./TopView";
import { RecoveryScreensEnum } from "../../Constants/Enum";
import LeftHeader from "./LeftHeader";
import Loader from "../../Components/UI/Loader";
import AsyncStorage from "@react-native-community/async-storage";

const LoginScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setLoader] = useState(false);
  const [fcmToken, setFcmToken] = useState("");
  const navigateToRecoveryScreenHandler = (id) => {
    props.navigation.navigate(constant.Navigation.recoverCredentials, {
      prodId: id,
    });
  };

  useEffect(() => {
    getUsername();
  }, []);
  getUsername = async () => {
    try {
      AsyncStorage.getItem("isLogin").then((res) => {
        if (res == "true") {
          AsyncStorage.getItem("username").then((res) => {
            console.log(res);
            setUsername(res);
            AsyncStorage.getItem("fcmToken").then((fcmToken) => {
              setFcmToken(fcmToken);
            });
          });
        } else {
          AsyncStorage.getItem("fcmToken").then((fcmToken) => {
            setFcmToken(fcmToken);
            console.log("hey");
          });
        }
      });
    } catch (error) {
      // Error retrieving data
    }
  };
  const submitBtnHandler = (id) => {
    let error = "";
    switch (id) {
      case 0:
        setLoader(true);
        //props.navigation.push(constant.Navigation.dashboard);
        if (username && password) {
          APIResource.loginUser(username, password, fcmToken).then((res) => {
            setLoader(false);
            if (res.status === "success") {
              console.log("hey" + res);
              AsyncStorage.setItem("isLogin", "true");
              AsyncStorage.setItem("username", username);
              AsyncStorage.setItem("device_token", res.token);
              props.navigation.push(constant.Navigation.dashboard);
            } else {
              ToastAndroid.show(res.message, 5);
            }
          });
        } else {
          if (username == "") {
            error = constant.Strings.validation.emptyEmail;
          } else if (password == "") {
            error = constant.Strings.validation.emptyPassword;
          }
          ToastAndroid.show(error, 5);
          setLoader(false);
        }
        break;
      case 1:
        props.navigation.push(constant.Navigation.loginWithMPIN);
    }
  };
  let textInput = null;
  const BottomButtons = () => {
    return (
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.bottomButton}
          onPress={navigateToRecoveryScreenHandler.bind(
            this,
            RecoveryScreensEnum.forgotPassword.id
          )}
        >
          <Text style={styles.btmButtonText}>
            {constant.Strings.forgotPassword}?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.bottomButton}
          onPress={navigateToRecoveryScreenHandler.bind(
            this,
            RecoveryScreensEnum.forgotUsername.id
          )}
        >
          <Text style={styles.btmButtonText}>
            {constant.Strings.forgotUsername}?
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        {<TopView />}
        <View style={{ ...styles.TextView, marginTop: 10 }}>
          <TextField
            id="username"
            placeholder={constant.Strings.userNamePlaceholder}
            returnKeyType={constant.ReturnKeyType.next}
            value={username}
            required={true}
            icon={
              <AntDesign
                name="user"
                size={20}
                color={constant.Colors.primary}
              />
            }
            onChangeText={(text) => setUsername(text)}
            errorTitle={constant.Strings.validUsername}
            blurOnSubmitting={false}
            onSubmitEditing={() => textInput.focus()}
          />
          <TextField
            id="password"
            textRef={(ref) => {
              textInput = ref;
            }}
            placeholder={constant.Strings.passwordPlaceholder}
            returnKeyType={constant.ReturnKeyType.done}
            required={true}
            password={true}
            icon={
              <AntDesign
                name="lock"
                size={20}
                color={constant.Colors.primary}
              />
            }
            onChangeText={(text) => setPassword(text)}
            errorTitle={constant.Strings.validPassword}
            onSubmitEditing={() => submitBtnHandler(0)}
          />
        </View>
        <View style={styles.TextView}>
          <CustomButton
            title={constant.Strings.login}
            onPress={() => submitBtnHandler(0)}
          />
          <CustomButton
            title={constant.Strings.loginWithMPN}
            onPress={() => submitBtnHandler(1)}
          />
        </View>
        <View style={{ alignItems: "center" }}>{BottomButtons()}</View>
      </ScrollView>
      {showLoader && <Loader />}
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: null,
    headerRight: () => <LeftHeader />,
    headerBackTitleVisible: false,
    headerLeft: null,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height,
    backgroundColor: "black",
  },
  leftHeaderView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
  btmButtonText: {
    textAlign: "center",
    fontFamily: constant.Fonts.FontFamily.regular,
    fontSize: constant.Fonts.Size.Title,
    color: constant.Colors.primary,
    fontWeight: "bold",
  },
  TextView: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0,
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    width: "85%",
    marginTop: 5,
  },
  bottomButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: constant.Colors.grey,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 3,
    height: 45,
  },
  contact: {
    color: "white",
    fontFamily: constant.Fonts.FontFamily.bold,
    fontSize: constant.Fonts.Size.Title,
    marginLeft: 5,
  },
});
export default LoginScreen;
