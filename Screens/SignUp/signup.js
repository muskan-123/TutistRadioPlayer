import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  CheckBox,
  ToastAndroid,
  Linking,
} from "react-native";
import { AntDesign, Fontisto, Ionicons } from "@expo/vector-icons";
import { APIResource } from "../../APIManager";
import constant from "../../Constants/constant";
import TextField from "../../Components/UI/TextField";
import CustomButton from "../../Components/UI/Button";
import Loader from "../../Components/UI/Loader";
import LeftHeader from "../../Screens/Auth/LeftHeader";
import Validation from "../Auth/Validation";
import AsyncStorage from "@react-native-community/async-storage";
const LoginScreen = (props) => {
  const textFieldRef = useRef();
  const [isSelected, setSelection] = useState(false);
  const [showLoader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [mobileError, setMobileError] = useState(true);
  const [usernameError, setUsernameError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [fcmToken, setFcmToken] = useState("");
  function getUsername() {
    AsyncStorage.getItem("fcmToken").then((fcmToken) => {
      setFcmToken(fcmToken);
    });
  }
  useEffect(() => {
    getUsername();
  }, []);
  function submitBtnHandler() {
    setLoader(true);
    let error = "";

    if (
      name &&
      email &&
      mobile &&
      username &&
      password &&
      confirmpassword &&
      isSelected
    ) {
      APIResource.signupUser(
        username,
        mobile,
        password,
        confirmpassword,
        fcmToken
      ).then((res) => {
        setLoader(false);
        console.log(res);
        if (res.status === "suceess") {
          ToastAndroid.show(res.message, 5);
          AsyncStorage.setItem("isLogin", "true");
          AsyncStorage.setItem("username", username);
          AsyncStorage.setItem("mobileNumber", mobile);
          AsyncStorage.setItem("fullName", name);
          AsyncStorage.setItem("device_token", res.token);
          props.navigation.push(constant.Navigation.verifyOtp);
        } else {
          ToastAndroid.show(res.message, 10);
        }
      });
    } else {
      if (name == "") {
        error = constant.Strings.validation.emptyName;
      } else if (email == "") {
        error = constant.Strings.validation.emptyEmail;
      } else if (mobile == "") {
        error = constant.Strings.validation.emptyMobile;
      } else if (password == "") {
        error = constant.Strings.validation.emptyPassword;
      } else if (username == "") {
        error = constant.Strings.validation.emptyUserName;
      } else if (confirmpassword == "") {
        error = constant.Strings.validation.emptyPassword;
      } else if (!isSelected) {
        error = "Please select terms and conditions";
      }
      ToastAndroid.show(error, 5);
      setLoader(false);
    }
  }

  const CreateTextField = () => {
    return (
      <View style={{ ...styles.TextView, marginTop: 10 }}>
        <Text style={styles.text}>*Note: All Fields Are Mandatory*</Text>
        <TextField
          id="name"
          placeholder={constant.Strings.TextFieldPlaceholder.name}
          returnKeyType={constant.ReturnKeyType.next}
          required={true}
          icon={
            <AntDesign name="user" size={20} color={constant.Colors.primary} />
          }
          onChangeText={(text) => {
            setName(text);
          }}
          errorTitle={constant.Strings.emptyUserName}
          blurOnSubmitting={false}
        />
        <TextField
          id="email"
          placeholder={constant.Strings.TextFieldPlaceholder.email}
          returnKeyType={constant.ReturnKeyType.done}
          keyboardType={"email-address"}
          required={true}
          icon={
            <Fontisto name="email" size={18} color={constant.Colors.primary} />
          }
          onChangeText={(text) => {
            setEmail(text);
            Validation.validateEmail(text)
              ? setEmailError(true)
              : setEmailError(false);
          }}
          showError={!emailError}
          errorTitle={constant.Strings.validEmail}
          reference={textFieldRef}
        />
        <TextField
          id="mobile"
          placeholder={constant.Strings.TextFieldPlaceholder.mobileNum}
          returnKeyType={constant.ReturnKeyType.done}
          required={true}
          keyboardType={"numeric"}
          icon={
            <Ionicons
              name="ios-phone-portrait"
              size={22}
              color={constant.Colors.primary}
            />
          }
          onChangeText={(text) => {
            setMobile(text);
            Validation.validateMobileNum(text)
              ? setMobileError(true)
              : setMobileError(false);
          }}
          showError={!mobileError}
          errorTitle={constant.Strings.validPhone}
          reference={textFieldRef}
        />
        <TextField
          id="username"
          placeholder={constant.Strings.TextFieldPlaceholder.userName}
          returnKeyType={constant.ReturnKeyType.done}
          required={true}
          icon={
            <AntDesign name="user" size={20} color={constant.Colors.primary} />
          }
          onChangeText={(text) => {
            setUsername(text);
            Validation.validateUsername(text)
              ? setUsernameError(true)
              : setUsernameError(false);
          }}
          showError={!usernameError}
          errorTitle={constant.Strings.validUsername}
          reference={textFieldRef}
        />
        <TextField
          id="password"
          placeholder={constant.Strings.TextFieldPlaceholder.password}
          returnKeyType={constant.ReturnKeyType.done}
          required={true}
          icon={
            <AntDesign name="lock" size={20} color={constant.Colors.primary} />
          }
          onChangeText={(text) => {
            setPassword(text);
            Validation.validateUsername(text)
              ? setPasswordError(true)
              : setPasswordError(false);
          }}
          showError={!passwordError}
          errorTitle={constant.Strings.validPassword}
          reference={textFieldRef}
          password
        />
        <TextField
          id="password"
          placeholder={constant.Strings.TextFieldPlaceholder.retypePassword}
          returnKeyType={constant.ReturnKeyType.done}
          required={true}
          icon={
            <AntDesign name="lock" size={20} color={constant.Colors.primary} />
          }
          onChangeText={(text) => setConfirmpassword(text)}
          errorTitle={constant.Strings.validPassword}
          reference={textFieldRef}
          password
        />
      </View>
    );
  };

  const createTermCondView = () => {
    return (
      <View style={styles.termsContainer}>
        <TouchableWithoutFeedback>
          <View>
            <CheckBox
              tintColors={{
                false: constant.Colors.primary,
                true: constant.Colors.primary,
              }}
              value={isSelected}
              onValueChange={setSelection}
            />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.termsText}>
          I Accept{" "}
          <Text
            onPress={() =>
              Linking.openURL("http://new.sattamatka.global/#about")
            }
            style={{
              ...styles.termsText,
              color: constant.Colors.primary,
              fontFamily: constant.Fonts.FontFamily.bold,
            }}
          >
            Terms And Condition
          </Text>
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView bounces={false} style={styles.container}>
        {CreateTextField()}
        {createTermCondView()}
        <View style={styles.TextView}>
          <CustomButton
            title={constant.Strings.register}
            onPress={() => submitBtnHandler()}
          />
        </View>
        <View style={{ alignItems: "center", marginVertical: 3 }} />
      </ScrollView>
      {showLoader && <Loader />}
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: null,
    headerBackTitleVisible: false,
    headerRight: () => <LeftHeader />,
    headerLeft: null,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  TextView: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0,
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    width: "85%",
    height: 45,
  },
  bottomButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: constant.Colors.gray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 3,
  },
  contact: {
    color: "white",
    fontFamily: constant.Fonts.FontFamily.bold,
    fontSize: constant.Fonts.Size.Title,
    marginLeft: 5,
  },
  text: {
    fontFamily: constant.Fonts.FontFamily.regular,
    color: constant.Colors.primary,
    fontSize: 18,
    marginVertical: 8,
  },
  termsText: {
    fontFamily: constant.Fonts.FontFamily.regular,
    fontSize: 18,
    marginLeft: 5,
    color: constant.Colors.primary,
  },
  termsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
});
export default LoginScreen;
