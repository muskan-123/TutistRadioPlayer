import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import LinearGradient from "react-native-linear-gradient";
import { WalletAPIManager } from "../../APIManager";
import TopView from "../Auth/TopView";
import CustomButton from "../../Components/UI/Button";
import constant from "../../Constants/constant";
import TextField from "../../Components/UI/TextField";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loader from "../../Components/UI/Loader";
import AsyncStorage from "@react-native-community/async-storage";
function setTextColor(id) {
  let color;
  if (id === 0 || id === 1) {
    color = constant.Colors.primary;
  } else if (id === 2) {
    color = "black";
  } else {
    color = constant.Colors.darkRed;
  }
  return color;
}

function whatsAppImage() {
  return (
    <View style={styles.leftHeaderView}>
      <Image
        style={{ width: 13, height: 13, marginRight: 5 }}
        source={require("../../assets/whatsapp.png")}
      />
      <Text style={styles.topStr} onPress={() => {}}>
        {constant.ServiceProvider.contact}
      </Text>
    </View>
  );
}

const WithdrawScreen = (props, dispatch) => {
  const [amount, setAmount] = useState();
  const [showLoader, setLoader] = useState(false);
  const [balance, setBalance] = useState("");
  const [APIToken, setAPIToken] = useState("");
  function getBalance() {
    AsyncStorage.getItem("balance").then((res) => {
      setBalance(res);
      AsyncStorage.getItem("device_token").then((APIToken) => {
        setAPIToken(APIToken);
      });
    });
  }
  useEffect(() => {
    getBalance();
  }, []);

  const submitBtnHandler = () => {
    setLoader(true);

    if (amount >= 100) {
      WalletAPIManager.withdrawRequest(amount, "WITHDRAW", APIToken).then(
        (res) => {
          setLoader(false);
          if (res.status != false) {
            setAmount("");
            ToastAndroid.show(res.message, 5);
          } else {
            setAmount("");
            ToastAndroid.show(res.message, 5);
          }
          console.log(res);
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
          Container={{ padding: Dimensions.get("window").height / 6.8 }}
          logoStyle={{
            width: Dimensions.get("window").height / 3.7,
            position: "absolute",
            bottom: Dimensions.get("window").height / 13,
          }}
        />
      </View>
    );
  };

  const createTopStrings = () => {
    const createText = (text, id) => {
      const color = setTextColor(id);
      return <Text style={{ ...styles.topStr, color: color }}>{text}</Text>;
    };
    return (
      <View style={{ alignItems: "center" }}>
        {createView()}
        {createText(constant.Strings.Withdraw.firstStr, 0)}
        {whatsAppImage()}
        {createText(constant.Strings.Withdraw.secondStr, 2)}
        {createText(constant.Strings.Withdraw.thirdStr, 3)}
      </View>
    );
  };

  const createWalletView = () => {
    //const userBalance = balance.slice(0, -3);

    return (
      <View style={{ ...styles.wallet }}>
        <Entypo name="wallet" size={30} color="black" />
        <Text style={{ color: "black", fontSize: 17 }}>
          {":" + balance ? balance : " "}
        </Text>
      </View>
    );
  };

  const createCustomButton = () => {
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1, paddingHorizontal: 5 }}
        >
          {
            <LinearGradient
              colors={["#f0eaa8", "#e9d060"]}
              style={[
                styles.buttonGradient,
                { borderRadius: 30, justifyContent: "center" },
              ]}
            >
              <Text textBreakStrategy={"simple"} style={styles.TextStyle}>
                {constant.Strings.wacthwithdrawVideo}
              </Text>
            </LinearGradient>
          }
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1 }}
          onPress={() => {
            props.navigation.navigate(constant.Navigation.fundRequest);
          }}
        >
          {
            <LinearGradient
              colors={["#f0eaa8", "#e9d060"]}
              style={[
                styles.buttonGradient,
                { borderRadius: 30, justifyContent: "center" },
              ]}
            >
              <Text textBreakStrategy={"simple"} style={styles.TextStyle}>
                {constant.Strings.viewTransaction}
              </Text>
            </LinearGradient>
          }
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior={"height"}>
          <ScrollView style={styles.container}>
            {createTopStrings()}
            {createWalletView()}
            {createCustomButton()}
            <View style={{ alignItems: "center" }}>
              <TextField
                id="username"
                value={amount}
                placeholder={constant.Strings.TextFieldPlaceholder.addfunds}
                returnKeyType={"done"}
                required={true}
                keyboardType={"numeric"}
                value={amount}
                onSubmitEditing={submitBtnHandler}
                icon={
                  <MaterialCommunityIcons
                    name="wallet-outline"
                    size={18}
                    color="grey"
                  />
                }
                onChangeText={(amount) => setAmount(amount)}
                errorTitle={constant.Strings.emptyUserName}
              />
            </View>
            <View style={styles.withdrawReqBtn}>
              <CustomButton
                title={constant.Strings.sendWithdrawReq}
                onPress={submitBtnHandler}
                style={{ height: 60, width: "60%" }}
                textStyle={{ fontSize: 13 }}
              />
            </View>
          </ScrollView>
          {showLoader && <Loader />}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: constant.Strings.ScreenTitle.withdrawFunds,
    headerBackTitleVisible: false,
    headerTintColor: "black",
  };
};

const styles = StyleSheet.create({
  customBtnContainer: {
    flex: 1,
    marginHorizontal: 5,
    height: 37,
    borderRadius: 18.5,
    backgroundColor: constant.Colors.creame,
    borderWidth: 2,
    borderColor: constant.Colors.grey,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  TextView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 0,
  },
  topStr: {
    fontFamily: constant.Fonts.FontFamily.regular,
    fontSize: 12,
    textAlign: "center",
    marginVertical: 1,
    color: constant.Colors.primary,
  },
  leftHeaderView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
  withdrawReqBtn: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  TextStyle: {
    color: constant.Colors.darkRed,
    fontSize: 10,
    fontWeight: "bold",
  },
  wallet: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: constant.Colors.primary,
    padding: 5,
    marginTop: 2,
    borderWidth: 2,
    borderColor: "black",
  },
  buttonGradient: {
    height: 40,
    marginVertical: 10,
    width: "95%",
    borderRadius: 5,
    elevation: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  rowContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
});

export default WithdrawScreen;
