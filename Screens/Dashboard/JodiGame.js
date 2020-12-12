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
import constant from "../../Constants/constant";
import Constants from "../../Constants/constant";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { CustomButton, CustomPicker } from "../../Components/UI";
import AsyncStorage from "@react-native-community/async-storage";
import TextField from "../../Components/UI/TextField";
import GamePopup from "../Common/GamePopup";
import { APIResource, WalletAPIManager } from "../../APIManager";
import moment from "moment";
const jodiGameInput = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  62,
  63,
  64,
  65,
  66,
  67,
  68,
  69,
  70,
  71,
  72,
  73,
  74,
  75,
  76,
  77,
  78,
  79,
  80,
  81,
  82,
  83,
  84,
  85,
  86,
  87,
  88,
  89,
  90,
  91,
  92,
  93,
  94,
  95,
  96,
  97,
  98,
  99,
];
const JodiGame = (props) => {
  const [APIToken, setAPIToken] = useState("");
  const [amount, setDigit] = useState("");
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBazaar, setSelectedBazaar] = useState("OPEN-BAZAAR");
  const [pannaAdded, setPannaAdded] = useState([]);
  const [showPannaSelection, setShowPannaSelection] = useState(false);
  const [figureGameData, setfigureGameData] = useState({});
  const [popup, isPopup] = useState(false);
  const [popupArray, setPopupArray] = useState([]);
  const [walletBalance, setWalletBalance] = useState();
  useEffect(() => {
    getDate();
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Jodi Game",
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
  };

  const handleDigitRemove = (amount) => {
    const updatedAddedPanna = pannaAdded.filter((panna) => panna !== amount);
    setPannaAdded(updatedAddedPanna);
  };

  const handlePannaSelection = (index) => {
    setShowPannaSelection((pannaSelection) => !pannaSelection);
  };
  function ConfirmBet() {
    console.log("hey" + figureGameData);
    const type = selectedBazaar == "OPEN-BAZAAR" ? "open" : "close";
    APIResource.getBets(
      figureGameData,
      type,
      props.route.params.id,
      props.route.params.lottery_id,
      APIToken
    ).then((res) => {
      if (res.status === 'success') {
        console.log(res);
        setPannaAdded([]);
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
  function checkValidationAdd() {
    if (amount) {
      let newFigureArr = {};
      let newArray = [];
      pannaAdded.map((item) => {
        let bet = "bet" + item;
        newFigureArr = { ...newFigureArr, [bet]: amount };
        setfigureGameData(newFigureArr);
        let obj = { bet: item, point: amount };
        newArray = [...newArray, obj];
        setPopupArray(newArray);
      });

      isPopup(true);
    } else {
      ToastAndroid.show("Please fill all the details", 5);
    }
  }
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

  const pannaAddedView = () => {
    return (
      <View
        style={[
          styles.pannaItemsContainer,
          {
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: constant.Colors.primary,
          },
        ]}
      >
        {pannaAdded.map((item) => {
          return (
            <TouchableOpacity onPress={() => handleDigitRemove(item)}>
              <View
                style={[
                  styles.pannaItem,
                  { flexDirection: "row", alignItems: "center" },
                ]}
              >
                <Text style={styles.text}>{item}</Text>
                <AntDesign
                  name="closecircle"
                  size={20}
                  color="black"
                  style={{ left: 5 }}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const PannaInput = () => {
    const totalAmount = parseInt(amount) * pannaAdded.length;
    return (
      <View style={{ paddingVertical: 20, paddingLeft: 10 }}>
        {totalAmount !== 0 && !isNaN(totalAmount) && (
          <View
            style={{
              alignItems: "center",
              width: "100%",
              paddingHorizontal: 19,
              flexDirection: "row",
            }}
          >
            <Text style={styles.evenadd}>Total Amount:</Text>
            <Text style={[styles.evenadd, { marginLeft: 20 }]}>
              ₹ {totalAmount}
            </Text>
          </View>
        )}
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
            maxLength={3}
            value={amount}
            keyboardType="numeric"
            onChangeText={(amount) => setDigit(amount)}
          />
        </View>
      </View>
    );
  };

  const pannaSectionItem = (title, index) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handlePannaSelection(index)}
      >
        {
          <LinearGradient
            colors={["#f0eaa8", "#e9d060"]}
            style={{ ...styles.buttonGradient }}
          >
            <View />
            <Text textBreakStrategy={"simple"} style={{ ...styles.text }}>
              {title}
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color="black"
            />
          </LinearGradient>
        }
      </TouchableOpacity>
    );
  };

  const pannaItems = (digitsArr) => {
    return (
      <View style={styles.pannaItemsContainer}>
        {digitsArr.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setPannaAdded((alreadyAdded) => [...alreadyAdded, item]);
              }}
            >
              <View style={styles.pannaItem}>
                <Text style={styles.text}>{item}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const pannaSectionView = () => {
    const updatedSinglePanna = jodiGameInput.filter(
      (panna) => !pannaAdded.includes(panna)
    );
    return (
      <>
        {pannaSectionItem("Select Jodi", 0)}
        {showPannaSelection && pannaItems(updatedSinglePanna)}
      </>
    );
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.container]}>
        <View style={[styles.container]}>
          {TopView()}
          {pannaAddedView()}
          {pannaSectionView()}
          {PannaInput()}
        </View>
        <GamePopup
          data={popupArray}
          title={"Jodi Game"}
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

export default JodiGame;
