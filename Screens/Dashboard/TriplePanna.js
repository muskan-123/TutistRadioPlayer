import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import constant from "../../Constants/constant";
import Constants from "../../Constants/constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomButton, CustomPicker } from "../../Components/UI";
import AsyncStorage from "@react-native-community/async-storage";
import TextField from "../../Components/UI/TextField";
import { WalletAPIManager, APIResource } from "../../APIManager";
import moment from "moment";
import GamePopup from "../Common/GamePopup";
const TriplePanna = (props) => {
  const initialArray = [
    { bet: "000", point: "" },
    { bet: "111", point: "" },
    { bet: "222", point: "" },
    { bet: "333", point: "" },
    { bet: "444", point: "" },
    { bet: "555", point: "" },
    { bet: "666", point: "" },
    { bet: "777", point: "" },
    { bet: "888", point: "" },
    { bet: "999", point: "" },
  ];
  const [APIToken, setAPIToken] = useState("");
  const [digit, setDigit] = useState("");
  const [dates, setDates] = useState([]);
  const [figureGameData, setfigureGameData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBazaar, setSelectedBazaar] = useState("OPEN-BAZAAR");
  const [totalCount, setTotalCount] = useState("0");
  const [walletBalance, setWalletBalance] = useState();
  const [popup, isPopup] = useState(false);
  const [popupArray, setPopupArray] = useState(initialArray);
  const [pannaCount, setPannaCount] = useState({
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

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Triple Panna",
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
            <Text style={styles.contact}>{walletBalance || props.route.params.balance}</Text>
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
    const updatedTotalCount = `${sum(pannaCount)}`;
    setTotalCount(updatedTotalCount);
  }, [pannaCount]);

  getDate = async () => {
    const APIToken = await AsyncStorage.getItem("device_token");
    setAPIToken(APIToken);
    WalletAPIManager.getDates(APIToken).then((res) => {
      setDates(res.data);
      setSelectedDate(moment(res.data[0].date).format("DD/MM/YYYY - dddd"));
    });
  };

  const handleResetPress = () => {
    setTotalCount("0.0");
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
  };

  const sum = (obj) => {
    var sum = 0;
    for (var el in obj) {
      if (obj.hasOwnProperty(el) && obj[el] !== "") {
        sum += parseFloat(obj[el]);
      }
    }
    return sum;
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
    if (totalCount) {
      console.log(popupArray);
      // console.log(figureGameData);
      isPopup(true);
    } else {
      ToastAndroid.show("Please fill all the details", 5);
    }
  }
  const handlePannaCountInput = (text, index) => {
    let newFigureArr = {};
    let newArray = [];
    switch (index) {
      case 0:
        setPannaCount({ ...pannaCount, panna0: text });
        newFigureArr = { ...figureGameData, bet000: text };
        setfigureGameData(newFigureArr);
        newArray = popupArray ? [...popupArray] : [];
        newArray[0].point = text;
        setPopupArray(newArray);
        break;
      case 1:
        setPannaCount({ ...pannaCount, panna1: text });
        newFigureArr = { ...figureGameData, bet111: text };
        setfigureGameData(newFigureArr);
        newArray = popupArray ? [...popupArray] : [];
        newArray[1].point = text;
        setPopupArray(newArray);
        break;
      case 2:
        setPannaCount({ ...pannaCount, panna2: text });
        newFigureArr = { ...figureGameData, bet222: text };
        setfigureGameData(newFigureArr);
        newArray = popupArray ? [...popupArray] : [];
        newArray[2].point = text;
        setPopupArray(newArray);
        break;
      case 3:
        setPannaCount({ ...pannaCount, panna3: text });
        newFigureArr = { ...figureGameData, bet333: text };
        setfigureGameData(newFigureArr);
        newArray = popupArray ? [...popupArray] : [];
        newArray[3].point = text;
        setPopupArray(newArray);
        break;
      case 4:
        setPannaCount({ ...pannaCount, panna4: text });
        newFigureArr = { ...figureGameData, bet444: text };
        setfigureGameData(newFigureArr);
        newArray = popupArray ? [...popupArray] : [];
        newArray[4].point = text;
        setPopupArray(newArray);
        break;
      case 5:
        setPannaCount({ ...pannaCount, panna5: text });
        newFigureArr = { ...figureGameData, bet555: text };
        setfigureGameData(newFigureArr);
        newArray = popupArray ? [...popupArray] : [];
        newArray[5].point = text;
        setPopupArray(newArray);
        break;
      case 6:
        setPannaCount({ ...pannaCount, panna6: text });
        newFigureArr = { ...figureGameData, bet666: text };
        setfigureGameData(newFigureArr);
        newArray = popupArray ? [...popupArray] : [];
        newArray[6].point = text;
        setPopupArray(newArray);
        break;
      case 7:
        setPannaCount({ ...pannaCount, panna7: text });
        newFigureArr = { ...figureGameData, bet777: text };
        setfigureGameData(newFigureArr);
        newArray = popupArray ? [...popupArray] : [];
        newArray[7].point = text;
        setPopupArray(newArray);
        break;
      case 8:
        setPannaCount({ ...pannaCount, panna8: text });
        newFigureArr = { ...figureGameData, bet888: text };
        setfigureGameData(newFigureArr);
        newArray = popupArray ? [...popupArray] : [];
        newArray[8].point = text;
        setPopupArray(newArray);
        break;
      case 9:
        setPannaCount({ ...pannaCount, panna9: text });
        newFigureArr = { ...figureGameData, bet999: text };
        setfigureGameData(newFigureArr);
        newArray = popupArray ? [...popupArray] : [];
        newArray[9].point = text;
        setPopupArray(newArray);
        break;
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

  const pannaInputView = () => {
    return (
      <View style={styles.flatlist}>
        <View style={styles.pannaInputContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.rowColumnContainer}>
              <Text style={styles.contact}>000</Text>
              <TextField
                style={{
                  color: constant.Colors.primary,
                  alignSelf: "center",
                  borderRadius: 5,
                  marginLeft: 10,
                  width: "70%",
                }}
                placeholder={""}
                returnKeyType={constant.ReturnKeyType.next}
                maxLength={5}
                value={pannaCount.panna0}
                keyboardType="numeric"
                onChangeText={(username) => handlePannaCountInput(username, 0)}
              />
            </View>
            <View style={styles.rowColumnContainer}>
              <Text style={styles.contact}>111</Text>
              <TextField
                style={{
                  color: constant.Colors.primary,
                  alignSelf: "center",
                  borderRadius: 5,
                  marginLeft: 10,
                  width: "70%",
                }}
                placeholder={""}
                returnKeyType={constant.ReturnKeyType.next}
                maxLength={5}
                value={pannaCount.panna1}
                keyboardType="numeric"
                onChangeText={(username) => handlePannaCountInput(username, 1)}
              />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.rowColumnContainer}>
              <Text style={styles.contact}>222</Text>
              <TextField
                style={{
                  color: constant.Colors.primary,
                  alignSelf: "center",
                  borderRadius: 5,
                  marginLeft: 10,
                  width: "70%",
                }}
                placeholder={""}
                returnKeyType={constant.ReturnKeyType.next}
                maxLength={5}
                value={pannaCount.panna2}
                keyboardType="numeric"
                onChangeText={(username) => handlePannaCountInput(username, 2)}
              />
            </View>
            <View style={styles.rowColumnContainer}>
              <Text style={styles.contact}>333</Text>
              <TextField
                style={{
                  color: constant.Colors.primary,
                  alignSelf: "center",
                  borderRadius: 5,
                  marginLeft: 10,
                  width: "70%",
                }}
                placeholder={""}
                returnKeyType={constant.ReturnKeyType.next}
                maxLength={5}
                value={pannaCount.panna3}
                keyboardType="numeric"
                onChangeText={(username) => handlePannaCountInput(username, 3)}
                errorTitle={constant.Strings.emptyUserName}
                blurOnSubmitting={false}
              />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.rowColumnContainer}>
              <Text style={styles.contact}>444</Text>
              <TextField
                style={{
                  color: constant.Colors.primary,
                  alignSelf: "center",
                  borderRadius: 5,
                  marginLeft: 10,
                  width: "70%",
                }}
                placeholder={""}
                returnKeyType={constant.ReturnKeyType.next}
                maxLength={3}
                value={pannaCount.panna4}
                keyboardType="numeric"
                onChangeText={(username) => handlePannaCountInput(username, 4)}
              />
            </View>
            <View style={styles.rowColumnContainer}>
              <Text style={styles.contact}>555</Text>
              <TextField
                style={{
                  color: constant.Colors.primary,
                  alignSelf: "center",
                  borderRadius: 5,
                  marginLeft: 10,
                  width: "70%",
                }}
                placeholder={""}
                returnKeyType={constant.ReturnKeyType.next}
                maxLength={5}
                value={pannaCount.panna5}
                keyboardType="numeric"
                onChangeText={(username) => handlePannaCountInput(username, 5)}
              />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.rowColumnContainer}>
              <Text style={styles.contact}>666</Text>
              <TextField
                style={{
                  color: constant.Colors.primary,
                  alignSelf: "center",
                  borderRadius: 5,
                  marginLeft: 10,
                  width: "70%",
                }}
                placeholder={""}
                returnKeyType={constant.ReturnKeyType.next}
                maxLength={5}
                value={pannaCount.panna6}
                keyboardType="numeric"
                onChangeText={(username) => handlePannaCountInput(username, 6)}
              />
            </View>
            <View style={styles.rowColumnContainer}>
              <Text style={styles.contact}>777</Text>
              <TextField
                style={{
                  color: constant.Colors.primary,
                  alignSelf: "center",
                  borderRadius: 5,
                  marginLeft: 10,
                  width: "70%",
                }}
                placeholder={""}
                returnKeyType={constant.ReturnKeyType.next}
                maxLength={5}
                value={pannaCount.panna7}
                keyboardType="numeric"
                onChangeText={(username) => handlePannaCountInput(username, 7)}
              />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.rowColumnContainer}>
              <Text style={styles.contact}>888</Text>
              <TextField
                style={{
                  color: constant.Colors.primary,
                  alignSelf: "center",
                  borderRadius: 5,
                  marginLeft: 10,
                  width: "70%",
                }}
                placeholder={""}
                returnKeyType={constant.ReturnKeyType.next}
                maxLength={5}
                value={pannaCount.panna8}
                keyboardType="numeric"
                onChangeText={(username) => handlePannaCountInput(username, 8)}
              />
            </View>
            <View style={styles.rowColumnContainer}>
              <Text style={styles.contact}>999</Text>
              <TextField
                style={{
                  color: constant.Colors.primary,
                  alignSelf: "center",
                  borderRadius: 5,
                  marginLeft: 10,
                  width: "70%",
                }}
                placeholder={""}
                returnKeyType={constant.ReturnKeyType.next}
                maxLength={5}
                value={pannaCount.panna9}
                keyboardType="numeric"
                onChangeText={(username) => handlePannaCountInput(username, 9)}
              />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View
              style={[
                styles.rowColumnContainer,
                { justifyContent: "flex-end", marginTop: 10 },
              ]}
            >
              <Text style={styles.contact}>Total</Text>
              <TextField
                style={{
                  color: constant.Colors.primary,
                  alignSelf: "center",
                  borderRadius: 5,
                  marginLeft: 10,
                  width: "70%",
                }}
                placeholder={""}
                returnKeyType={constant.ReturnKeyType.next}
                value={totalCount}
                keyboardType="numeric"
                onChangeText={(username) => setDigit(username)}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        {TopView()}
        {pannaInputView()}
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
  pannaInputContainer: {
    borderWidth: 1,
    backgroundColor: "black",
    borderColor: constant.Colors.primary,
    margin: 15,
    padding: 10,
    marginBottom: 30,
  },
  rowContainer: {
    flexDirection: "row",
  },
  rowColumnContainer: {
    flexDirection: "row",
    flex: 1,
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
  text: {
    fontSize: constant.Fonts.Size.headerTitle,
    textAlign: "center",
    color: "black",
    fontFamily: Constants.Fonts.FontFamily.semiBold,
    fontWeight: "bold",
  },
});

export default TriplePanna;
