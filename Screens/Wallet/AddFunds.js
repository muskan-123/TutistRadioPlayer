import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { WalletAPIManager } from "../../APIManager";
import Loader from "../../Components/UI/Loader";
import TopView from "../Auth/TopView";
import CustomButton from "../../Components/UI/Button";
import constant from "../../Constants/constant";
import TextField from "../../Components/UI/TextField";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const StartSplashScreen = (props) => {
  const [APIToken, setAPIToken] = useState("");
  const [amount, setAmount] = useState();
  const [showLoader, setLoader] = useState(false);

  useEffect(() => {
    getAPIToken();
  }, []);

  getAPIToken = async () => {
    try {
      AsyncStorage.getItem("device_token").then((APIToken) => {
        setAPIToken(APIToken);
      });
    } catch (error) {
      // Error retrieving data
    }
  };

  const submitBtnHandler = () => {
    setLoader(true);
    if (amount >= 100) {
      WalletAPIManager.withdrawRequest(amount, "DEPOSIT", APIToken).then(
        (res) => {
          console.log(res);
          setLoader(false);
          if (res.status) {
            setAmount(" ");
            ToastAndroid.show(res.message, 5);
          } else {
            ToastAndroid.show(res.message, 5);
          }
        }
      );
    } else {
      setLoader(false);
      ToastAndroid.show("Amount should at least be 100", 5);
    }
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
            placeholder={constant.Strings.TextFieldPlaceholder.addfunds}
            returnKeyType={"done"}
            required={true}
            value={amount}
            keyboardType={"numeric"}
            onSubmitEditing={submitBtnHandler}
            icon={
              <MaterialCommunityIcons
                name="wallet-outline"
                size={24}
                color={constant.Colors.primary}
              />
            }
            onChangeText={(amount) => setAmount(amount)}
            errorTitle={constant.Strings.emptyUserName}
          />
        </View>
        <View style={styles.TextView}>
          <CustomButton
            title={constant.Strings.sendAddReq}
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
    headerTintColor: "black",
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

export default StartSplashScreen;
