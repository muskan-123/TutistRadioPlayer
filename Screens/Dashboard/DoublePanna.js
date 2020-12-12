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
import moment from "moment";
import constant from "../../Constants/constant";
import Constants from "../../Constants/constant";
import GamePopup from "../Common/GamePopup";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { CustomPicker } from "../../Components/UI";
import AsyncStorage from "@react-native-community/async-storage";
import TextField from "../../Components/UI/TextField";
import { WalletAPIManager, APIResource } from "../../APIManager";

export const doublePanna0 = [226, 668, 488, 118, 334, 299, 550, 244, 677];
export const doublePanna1 = [100, 335, 344, 119, 399, 155, 588, 227, 669];
export const doublePanna2 = [200, 336, 499, 110, 660, 228, 688, 255, 778];
export const doublePanna3 = [300, 355, 445, 166, 599, 229, 779, 337, 788];
export const doublePanna4 = [400, 338, 446, 112, 455, 220, 699, 266, 770];
export const doublePanna5 = [500, 339, 366, 113, 447, 122, 799, 177, 889];
export const doublePanna6 = [600, 448, 466, 114, 556, 277, 880, 330, 899];
export const doublePanna7 = [700, 223, 377, 115, 449, 133, 557, 188, 566];
export const doublePanna8 = [800, 288, 440, 116, 477, 224, 558, 233, 990];
export const doublePanna9 = [900, 225, 388, 117, 559, 144, 577, 199, 667];

const DoublePanna = (props) => {
  const [APIToken, setAPIToken] = useState("");
  const [digit, setDigit] = useState("");
  const [dates, setDates] = useState([]);
  const [figureGameData, setfigureGameData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBazaar, setSelectedBazaar] = useState("OPEN-BAZAAR");
  const [pannaAdded, setPannaAdded] = useState([]);
  const [walletBalance, setWalletBalance] = useState();
  const [popup, isPopup] = useState(false);
  const [popupArray, setPopupArray] = useState([]);
  const [showPannaSelection, setShowPannaSelection] = useState({
    pannaSelection0: false,
    pannaSelection1: false,
    pannaSelection2: false,
    pannaSelection3: false,
    pannaSelection4: false,
    pannaSelection5: false,
    pannaSelection6: false,
    pannaSelection7: false,
    pannaSelection8: false,
    pannaSelection9: false,
  });
  useEffect(() => {
    getDate();
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "DOUBLE PANNA",
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
    if (digit) {
      let newFigureArr = {};
      let newArray = [];
      pannaAdded.map((item) => {
        let bet = "bet" + item;
        newFigureArr = { ...newFigureArr, [bet]: digit };
        setfigureGameData(newFigureArr);
        let obj = { bet: item, point: digit };
        newArray = [...newArray, obj];
        setPopupArray(newArray);
      });

      isPopup(true);
    } else {
      isPopupText();
      ToastAndroid.show("Please fill all the details", 5);
    }
  }
  const handleResetPress = () => {
    setPannaAdded([]);
    setDigit("");
  };

  const handleDigitRemove = (digit) => {
    const updatedAddedPanna = pannaAdded.filter((panna) => panna !== digit);
    setPannaAdded(updatedAddedPanna);
  };

  const handlePannaSelection = (index) => {
    switch (index) {
      case 0:
        setShowPannaSelection({
          ...showPannaSelection,
          pannaSelection0: !showPannaSelection.pannaSelection0,
        });
        break;
      case 1:
        setShowPannaSelection({
          ...showPannaSelection,
          pannaSelection1: !showPannaSelection.pannaSelection1,
        });
        break;
      case 2:
        setShowPannaSelection({
          ...showPannaSelection,
          pannaSelection2: !showPannaSelection.pannaSelection2,
        });
        break;
      case 3:
        setShowPannaSelection({
          ...showPannaSelection,
          pannaSelection3: !showPannaSelection.pannaSelection3,
        });
        break;
      case 4:
        setShowPannaSelection({
          ...showPannaSelection,
          pannaSelection4: !showPannaSelection.pannaSelection4,
        });
        break;
      case 5:
        setShowPannaSelection({
          ...showPannaSelection,
          pannaSelection5: !showPannaSelection.pannaSelection5,
        });
        break;
      case 6:
        setShowPannaSelection({
          ...showPannaSelection,
          pannaSelection6: !showPannaSelection.pannaSelection6,
        });
        break;
      case 7:
        setShowPannaSelection({
          ...showPannaSelection,
          pannaSelection7: !showPannaSelection.pannaSelection7,
        });
        break;
      case 8:
        setShowPannaSelection({
          ...showPannaSelection,
          pannaSelection8: !showPannaSelection.pannaSelection8,
        });
        break;
      case 9:
        setShowPannaSelection({
          ...showPannaSelection,
          pannaSelection9: !showPannaSelection.pannaSelection9,
        });
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

  const PannaInput = () => {
    const totalAmount = parseInt(digit) * pannaAdded.length;
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
            value={digit}
            keyboardType="numeric"
            onChangeText={(username) => setDigit(username)}
            errorTitle={constant.Strings.emptyUserName}
            blurOnSubmitting={false}
          />
        </View>
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
        {pannaAdded.map((digit) => {
          return (
            <TouchableOpacity onPress={() => handleDigitRemove(digit)}>
              <View
                style={[
                  styles.pannaItem,
                  { flexDirection: "row", alignItems: "center" },
                ]}
              >
                <Text style={styles.text}>{digit}</Text>
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
        {digitsArr.map((digit) => {
          return (
            <TouchableOpacity
              onPress={() =>
                setPannaAdded((alreadyAdded) => [...alreadyAdded, digit])
              }
            >
              <View style={styles.pannaItem}>
                <Text style={styles.text}>{digit}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const pannaSectionView = () => {
    const updateddoublePanna0 = doublePanna0.filter(
      (panna) => !pannaAdded.includes(panna)
    );
    const updateddoublePanna1 = doublePanna1.filter(
      (panna) => !pannaAdded.includes(panna)
    );
    const updateddoublePanna2 = doublePanna2.filter(
      (panna) => !pannaAdded.includes(panna)
    );
    const updateddoublePanna3 = doublePanna3.filter(
      (panna) => !pannaAdded.includes(panna)
    );
    const updateddoublePanna4 = doublePanna4.filter(
      (panna) => !pannaAdded.includes(panna)
    );
    const updateddoublePanna5 = doublePanna5.filter(
      (panna) => !pannaAdded.includes(panna)
    );
    const updateddoublePanna6 = doublePanna6.filter(
      (panna) => !pannaAdded.includes(panna)
    );
    const updateddoublePanna7 = doublePanna7.filter(
      (panna) => !pannaAdded.includes(panna)
    );
    const updateddoublePanna8 = doublePanna8.filter(
      (panna) => !pannaAdded.includes(panna)
    );
    const updateddoublePanna9 = doublePanna9.filter(
      (panna) => !pannaAdded.includes(panna)
    );
    return (
      <>
        {pannaSectionItem("Select Panna - 0", 0)}
        {showPannaSelection.pannaSelection0 && pannaItems(updateddoublePanna0)}

        {pannaSectionItem("Select Panna - 1", 1)}
        {showPannaSelection.pannaSelection1 && pannaItems(updateddoublePanna1)}

        {pannaSectionItem("Select Panna - 2", 2)}
        {showPannaSelection.pannaSelection2 && pannaItems(updateddoublePanna2)}

        {pannaSectionItem("Select Panna - 3", 3)}
        {showPannaSelection.pannaSelection3 && pannaItems(updateddoublePanna3)}

        {pannaSectionItem("Select Panna - 4", 4)}
        {showPannaSelection.pannaSelection4 && pannaItems(updateddoublePanna4)}

        {pannaSectionItem("Select Panna - 5", 5)}
        {showPannaSelection.pannaSelection5 && pannaItems(updateddoublePanna5)}

        {pannaSectionItem("Select Panna - 6", 6)}
        {showPannaSelection.pannaSelection6 && pannaItems(updateddoublePanna6)}

        {pannaSectionItem("Select Panna - 7", 7)}
        {showPannaSelection.pannaSelection7 && pannaItems(updateddoublePanna7)}

        {pannaSectionItem("Select Panna - 8", 8)}
        {showPannaSelection.pannaSelection8 && pannaItems(updateddoublePanna8)}

        {pannaSectionItem("Select Panna - 9", 9)}
        {showPannaSelection.pannaSelection9 && pannaItems(updateddoublePanna9)}
      </>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {TopView()}
        {pannaAddedView()}
        {pannaSectionView()}
        {PannaInput()}
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

export default DoublePanna;
