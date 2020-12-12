import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import constant from "../../Constants/constant";
import Constants from "../../Constants/constant";
import GamePopup from "../Common/GamePopup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomButton, CustomPicker } from "../../Components/UI";
import AsyncStorage from "@react-native-community/async-storage";
import TextField from "../../Components/UI/TextField";
import { APIResource, WalletAPIManager } from "../../APIManager";
import moment from "moment";
const FigureGame = (props) => {
  const initialState = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  };
  const initialArray = [
    { bet: "0", point: "" },
    { bet: "1", point: "" },
    { bet: "2", point: "" },
    { bet: "3", point: "" },
    { bet: "4", point: "" },
    { bet: "5", point: "" },
    { bet: "6", point: "" },
    { bet: "7", point: "" },
    { bet: "8", point: "" },
    { bet: "9", point: "" },
  ];
  const [updatedCellData, setUpdateCellData] = useState(initialState);
  const [figureGameData, setfigureGameData] = useState({});
  const [total, setTotal] = useState(0);
  const [APIToken, setAPIToken] = useState("");
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBazaar, setSelectedBazaar] = useState(true);
  const [walletBalance, setWalletBalance] = useState();
  const [popup, isPopup] = useState(false);
  const [popupArray, setPopupArray] = useState(initialArray);
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Figure Game",
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

  useEffect(() => {
    getDate();
  }, []);

  useEffect(() => {
    let total = 0;
    for (const cellProperty in updatedCellData) {
      total += parseInt(updatedCellData[cellProperty] || 0);
    }
    setTotal(total);
  }, [updatedCellData]);

  getDate = async () => {
    const APIToken = await AsyncStorage.getItem("device_token");
    setAPIToken(APIToken);
    WalletAPIManager.getDates(APIToken).then((res) => {
      setDates(res.data);
      setSelectedDate(moment(res.data[0].date).format("DD/MM/YYYY - dddd"));
    });
  };
  function ConfirmBet() {
    const type = selectedBazaar == "OPEN-BAZAAR" ? "open" : "close";
    APIResource.getBets(
      figureGameData,
      type,
      props.route.params.id,
      props.route.params.lottery_id,
      APIToken
    ).then((res) => {
      if (res.status === 'success') {
        setPannaCount({
          panna0: "",
          panna1: "",
          panna2: "",
          panna3: "",
          panna4: "",
          panna5: "",
          panna6: "",
          panna7: "",
          panna8: "",
          panna9: "",
        });
        setDigit("");
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
    if (total) {
      console.log(popupArray);
      // console.log(figureGameData);
      isPopup(true);
    } else {
      ToastAndroid.show("Please fill all the details", 5);
    }
  }

  function handleChange(item, text, index) {
    let newArr = { ...updatedCellData };
    let bet = "bet" + index;
    let newFigureArr = { ...newFigureArr, [bet]: text };
    newArr[index] = text;
    setfigureGameData(newFigureArr);
    setUpdateCellData(newArr);
    newArray = popupArray ? [...popupArray] : [];
    newArray[index].point = text;
    setPopupArray(newArray);
  }
  const TopView = () => {
    const lotteryData = dates.find(
      (date) => date.id === props.route.params.lottery_id
    );
    const currentTime = moment().format("HH:mm:ss");
    const isOpeningBetValid = lotteryData?.opening_bet_time > currentTime;
    const isClosingBetValid = lotteryData?.closing_bet_time > currentTime;
    const bazarArray = isOpeningBetValid
      ? isClosingBetValid
        ? [{ title: "OPEN-BAZAAR" }, { title: "CLOSE-BAZAAR" }]
        : [{ title: "OPEN-BAZAAR" }]
      : [];
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
            setSelectedDate(e);
          }}
        />
        <CustomPicker
          dateArray={bazarArray}
          bazaar
          selectedBazaarValue={selectedBazaar}
          onChange={(e) => {
            setSelectedBazaar(e);
          }}
        />
      </View>
    );
  };

  const FlatListView = () => {
    return (
      <View>
        <FlatList
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 2,
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ color: "white" }}>{item}</Text>
                <TextField
                  style={{
                    color: constant.Colors.primary,
                    width: "80%",
                  }}
                  placeholder={""}
                  value={updatedCellData[index]}
                  returnKeyType={constant.ReturnKeyType.next}
                  required={true}
                  keyboardType="numeric"
                  onChangeText={(text) => handleChange(item, text, index)}
                />
              </View>
            );
          }}
        />
        <Text style={styles.totalStyle}>{"Total: " + total}</Text>
      </View>
    );
  };
  const bottomView = () => {
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setUpdateCellData(initialState);
            setTotal(0);
          }}
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
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.container]}>
        {TopView()}
        <GamePopup
          data={popupArray}
          title={"Ank"}
          isVisible={popup}
          onPress={() => ConfirmBet()}
          onPressCancel={() => isPopup(false)}
        />
        {FlatListView()}
      </View>
      {bottomView()}
    </View>
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
    padding: 15,
  },
  buttonText: {
    color: "white",
    fontFamily: Constants.Fonts.FontFamily.bold,
    fontStyle: "italic",
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
  bottomViewContainer: {
    flexDirection: "row",
    height: 80,
    marginTop: 40,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 5,
  },
  radioText: { color: "white", fontSize: 18, marginHorizontal: 20 },
  totalStyle: {
    color: "white",
    marginTop: 0,
    alignSelf: "flex-end",
    marginTop: 20,
    fontSize: 24,
    fontStyle: "italic",
    marginRight: 30,
  },
  radioButtonStyle: {
    height: 28,
    width: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e9d060",
  },
  radioSubContainer: {
    flexDirection: "row",
    flex: 2,
    alignItems: "center",
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
  },
  text: {
    fontSize: constant.Fonts.Size.headerTitle,
    textAlign: "center",
    color: "black",
    fontFamily: Constants.Fonts.FontFamily.semiBold,
    fontWeight: "bold",
  },
});

export default FigureGame;
