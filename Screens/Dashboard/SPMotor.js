import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";
import constant from "../../Constants/constant";
import Constants from "../../Constants/constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomButton, CustomPicker } from "../../Components/UI";
import AsyncStorage from "@react-native-community/async-storage";
import TextField from "../../Components/UI/TextField";
import { WalletAPIManager, APIResource } from "../../APIManager";
import GamePopup from "../Common/GamePopup";
import {
  singlePanna0,
  singlePanna1,
  singlePanna2,
  singlePanna3,
  singlePanna4,
  singlePanna5,
  singlePanna6,
  singlePanna7,
  singlePanna8,
  singlePanna9,
} from "./SinglePanna";

const SPMotor = (props) => {
  const [APIToken, setAPIToken] = useState("");
  const [digit, setDigit] = useState("");
  const [amount, setAmount] = useState("");
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBazaar, setSelectedBazaar] = useState("OPEN-BAZAAR");
  const [pannaAdded, setPannaAdded] = useState([]);
  const [walletBalance, setWalletBalance] = useState();
  const [popup, isPopup] = useState(false);
  const [popupArray, setPopupArray] = useState([]);
  useEffect(() => {
    getDate();
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "SP Motor",
      headerRight: () => (
        <LinearGradient
          colors={["#1B1B1B", "#212121"]}
          style={styles.leftHeaderViewContainer}
        >
          <TouchableOpacity style={styles.leftHeaderView}>
            <MaterialCommunityIcons
              name="wallet"
              size={22}
              color={constant.Colors.primary}
            />
            <Text style={styles.contact}>
              {walletBalance || props.route.params.balance}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      ),
      headerTintColor: "black",
    });
  }, [props.navigation, walletBalance]);

  const updatedPannaAdded = (singlePannaArray) => {
    let pannaArray = [];
    singlePannaArray.forEach((panna) => {
      let foundDigit = 0;
      for (let i = 0; i < digit.length; i++) {
        if (`${panna}`.includes(digit.charAt(i))) {
          foundDigit += 1;
        }
      }
      if (foundDigit > 2) {
        pannaArray.push(panna);
      }
    });
    setPannaAdded((addedPannas) => [...addedPannas, ...pannaArray]);
  };
  function ConfirmBet() {
    const type = selectedBazaar == "OPEN-BAZAAR" ? "open" : "close";
    const item = "bet" + digit;
    APIResource.getBets(
      { [item]: amount },
      type,
      props.route.params.id,
      props.route.params.lottery_id,
      APIToken
    ).then((res) => {
      if (res.status === 'success') {
        setDigit("");
        setAmount("");
        setWalletBalance(res.data.balance);
        ToastAndroid.show(res.message, 5);
        isPopup(false);
      } else {
        ToastAndroid.show(res.message, 5);
        isPopup(false);
      }
    });
  }

  // }
  function checkValidationAdd() {
    if (digit && amount) {
      const updatedPopupArray = pannaAdded.map((panna) => {
        return {
          bet: panna,
          point: amount,
        };
      });
      setPopupArray(updatedPopupArray);
      isPopup(true);
    } else {
      ToastAndroid.show("Please fill all the details", 5);
    }
  }
  useEffect(() => {
    if (digit.length < 4) {
      setPannaAdded([]);
    } else {
      updatedPannaAdded(singlePanna0);
      updatedPannaAdded(singlePanna1);
      updatedPannaAdded(singlePanna2);
      updatedPannaAdded(singlePanna3);
      updatedPannaAdded(singlePanna4);
      updatedPannaAdded(singlePanna5);
      updatedPannaAdded(singlePanna6);
      updatedPannaAdded(singlePanna7);
      updatedPannaAdded(singlePanna8);
      updatedPannaAdded(singlePanna9);
    }
  }, [digit]);

  getDate = async () => {
    const APIToken = await AsyncStorage.getItem("device_token");
    setAPIToken(APIToken);
    WalletAPIManager.getDates(APIToken).then((res) => {
      setDates(res.data);
      setSelectedDate(moment(res.data[0].date).format("DD/MM/YYYY - dddd"));
    });
  };

  const handleResetPress = () => {
    setPannaAdded([]);
    setDigit("");
    setAmount("");
  };

  const handleDigitInput = (text) => {
    if (text.length === 1) {
      setDigit(text);
      return;
    }
    const isNumberValid =
      parseInt(text.charAt(text.length - 1)) >
      parseInt(text.charAt(text.length - 2));
    if (isNumberValid) {
      setDigit(text);
    } else {
      setDigit("");
    }
  };

  const TopView = () => {
    const lotteryData = dates.find(
      (date) => date.id === props.route.params.lottery_id
    );
    const currentTime = moment().format("HH:mm:ss");
    const isOpeningBetValid = lotteryData?.opening_bet_time > currentTime;
    const isClosingBetValid = lotteryData?.closing_bet_time > currentTime;
    const bazarArray = [{ title: "OPEN-BAZAAR" }, { title: "CLOSE-BAZAAR" }];
    // isOpeningBetValid
    //   ? isClosingBetValid
    //     ? [{ title: "OPEN-BAZAAR" }, { title: "CLOSE-BAZAAR" }]
    //     : [{ title: "OPEN-BAZAAR" }]
    //   : [];
    return (
      <View
        style={[
          styles.topviewContainer,
          {
            justifyContent: "space-around",
            paddingHorizontal: 5,
          },
        ]}
      >
        <CustomPicker
          dateArray={dates}
          selectedValue={selectedDate}
          onChange={(e) => {
            console.log(e);
            setSelectedDate(e);
          }}
        />
        <CustomPicker
          dateArray={bazarArray}
          bazaar
          selectedBazaarValue={selectedBazaar}
          onChange={(e) => {
            console.log(e);
            setSelectedBazaar(e);
          }}
        />
      </View>
    );
  };

  const DigitsInput = () => {
    return (
      <View style={{ paddingLeft: 10, paddingTop: 20 }}>
        <View
          style={[
            styles.topviewContainer,
            {
              alignItems: "center",
              paddingBottom: 15,
            },
          ]}
        >
          <TextField
            style={{
              width: "95%",
              color: constant.Colors.primary,
              alignSelf: "center",
            }}
            placeholder={"Enter 4 Digit Number in Ascending Order"}
            returnKeyType={constant.ReturnKeyType.next}
            required={true}
            maxLength={4}
            value={digit}
            keyboardType="numeric"
            onChangeText={(text) => handleDigitInput(text)}
          />
        </View>
      </View>
    );
  };

  const PannaInput = () => {
    const totalAmount = parseInt(amount) * pannaAdded.length;
    return (
      <View style={{ paddingVertical: 20, paddingLeft: 10 }}>
        <View
          style={[
            styles.topviewContainer,
            {
              alignItems: "center",
              paddingBottom: 15,
            },
          ]}
        >
          <TextField
            style={{
              width: "95%",
              color: constant.Colors.primary,
              alignSelf: "center",
            }}
            placeholder={"Enter Amount"}
            returnKeyType={constant.ReturnKeyType.next}
            required={true}
            value={amount}
            keyboardType="numeric"
            onChangeText={(username) => setAmount(username)}
          />
        </View>

        {pannaAdded && pannaAdded.length > 0 && (
          <View
            style={{
              paddingHorizontal: 19,
            }}
          >
            <Text style={styles.evenadd}>Possibilities are:</Text>
            <View
              style={[styles.rowContainer, { marginTop: 10, flexWrap: "wrap" }]}
            >
              {pannaAdded.map((panna) => {
                return (
                  <View style={styles.pannaItem}>
                    <Text style={styles.text}>{panna}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {totalAmount !== 0 && !isNaN(totalAmount) && (
          <View
            style={{
              alignItems: "center",
              width: "100%",
              paddingHorizontal: 19,
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Text style={styles.evenadd}>Total Amount </Text>
            <Text style={[styles.evenadd, { marginLeft: 5 }]}>
              {`${amount} * ${pannaAdded.length} = `}
            </Text>
            <Text style={styles.evenadd}>{totalAmount}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={[styles.container]}>
          {TopView()}
          {DigitsInput()}
          {PannaInput()}
        </View>
        <GamePopup
          data={popupArray}
          title={"Panna"}
          isVisible={popup}
          onPress={() => ConfirmBet()}
          onPressCancel={() => isPopup(false)}
        />
        <View style={styles.rowContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleResetPress}
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
                <Text textBreakStrategy={"simple"} style={styles.text}>
                  RESET
                </Text>
              </LinearGradient>
            }
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1 }}
            onPress={() => {
              checkValidationAdd();
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
                <Text textBreakStrategy={"simple"} style={styles.text}>
                  SUBMIT
                </Text>
              </LinearGradient>
            }
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  flatlist: {
    flex: 1,
    padding: 10,
  },
  topviewContainer: {
    flexDirection: "row",
    padding: 5,
  },

  buttonText: {
    color: "white",
    fontFamily: Constants.Fonts.FontFamily.bold,
    fontStyle: "italic",
  },
  evenadd: {
    fontStyle: "italic",
    fontSize: 16,
    color: constant.Colors.primary,
    fontFamily: Constants.Fonts.FontFamily.bold,
    fontWeight: "600",
    marginTop: 4,
  },
  bottomButton: {
    alignSelf: "center",
    bottom: 0,
    position: "absolute",
    width: "100%",
  },
  leftHeaderViewContainer: {
    height: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "center",
  },
  leftHeaderView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    padding: 2,
  },
  contact: {
    color: constant.Colors.primary,
    fontSize: 14,
    marginLeft: 5,
  },
  button: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    height: 44,
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
  pannaItemsContainer: {
    flexDirection: "row",
    marginVertical: 5,
    flexWrap: "wrap",
  },
  pannaItem: {
    backgroundColor: constant.Colors.primary,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  rowContainer: {
    flexDirection: "row",
  },
});

export default SPMotor;
