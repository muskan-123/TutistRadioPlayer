import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import constant from "../../Constants/constant";
import Constants from "../../Constants/constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomButton, CustomPicker } from "../../Components/UI";
import AsyncStorage from "@react-native-community/async-storage";
import TextField from "../../Components/UI/TextField";
import SectionHeader from "../Common/SectionHeader";
import { WalletAPIManager, APIResource } from "../../APIManager";
import moment from "moment";
import GamePopup from "../Common/GamePopup";
const HalfSangam = (props) => {
  const [APIToken, setAPIToken] = useState("");
  const [value, setValue] = useState([]);
  const [points, setPoints] = useState("");
  const [digit, setDigit] = useState("");
  const [dates, setDates] = useState("");
  const [openDigit, setOpendigit] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [popup, isPopup] = useState(false);
  const [popupArray, setPopupArray] = useState([]);
  useEffect(() => {
    getDate();
  }, []);
  getDate = async () => {
    const APIToken = await AsyncStorage.getItem("device_token");
    setAPIToken(APIToken);
    WalletAPIManager.getDates(APIToken).then((res) => {
      setDates(res.data);
      setSelectedDate(moment(res.data[0].date).format("DD/MM/YYYY - dddd"));
    });
  };
  function ConfirmBet() {
    APIResource.getSangamBets(
      openDigit,
      digit,
      points,
      "3",
      props.route.params.id,
      props.route.params.lottery_id,
      APIToken
    ).then((res) => {
      if (res.status === 'success') {
        setPoints("");
        setOpendigit("");
        setDigit("");
        console.log(res);
        isPopup(false);
        ToastAndroid.show(res.message, 5);
      } else {
        isPopup(false);
        ToastAndroid.show(res.message, 5);
      }
    });
  }
  function checkValidationAdd() {
    if (digit != "" && openDigit != "" && points != "") {
      setPopupArray([{ bet: `${openDigit} - ${digit}`, point: points }]);
      isPopup(true);
    } else {
      ToastAndroid.show("Please fill all the details", 5);
    }
  }

  function deleteItemById(i) {
    const filteredData = value.filter((_, index) => index != i);
    setValue([...filteredData]);
  }
  const FlatListView = () => {
    return (
      <FlatList
        data={value}
        renderItem={({ item, index }) => {
          return (
            <SectionHeader
              style={{ borderColor: "transparent", height: 30 }}
              firstField={item.digit}
              secondField={item.point}
              thirdField={item.type}
              crossIcon
              onCrossPress={() => deleteItemById(index)}
            />
          );
        }}
      />
    );
  };
  const TopView = () => {
    return (
      <View
        style={[
          styles.topviewContainer,
          {
            justifyContent: "flex-start",
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
      </View>
    );
  };
  const OpenDigit = () => {
    console.log(value);
    return (
      <View
        style={[
          styles.topviewContainer,
          { alignItems: "center", marginTop: 0 },
        ]}
      >
        <Text style={[styles.evenadd, { width: "40%", paddingLeft: 10 }]}>
          {"OPEN DIGIT"}
        </Text>
        <TextField
          style={{ width: "80%", color: constant.Colors.primary }}
          placeholder={""}
          value={openDigit}
          returnKeyType={constant.ReturnKeyType.next}
          keyboardType="numeric"
          onChangeText={(openDigit) => setOpendigit(openDigit)}
        />
      </View>
    );
  };
  const PannaInput = () => {
    return (
      <View
        style={[
          styles.topviewContainer,
          {
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 5,
          },
        ]}
      >
        <Text
          style={[styles.evenadd, { width: "40%", paddingLeft: 10 }]}
          numberOfLines={1}
        >
          {"CLOSE PANNA"}
        </Text>
        <TextField
          style={{ width: "80%", color: constant.Colors.primary }}
          placeholder={""}
          returnKeyType={constant.ReturnKeyType.next}
          maxLength={3}
          value={digit}
          keyboardType="numeric"
          onChangeText={(username) => setDigit(username)}
        />
      </View>
    );
  };
  const PointsInput = () => {
    console.log(value);
    return (
      <View
        style={[
          styles.topviewContainer,
          { alignItems: "center", marginTop: 0 },
        ]}
      >
        <Text style={[styles.evenadd, { width: "40%", paddingLeft: 10 }]}>
          {"POINTS"}
        </Text>
        <TextField
          style={{ width: "80%", color: constant.Colors.primary }}
          placeholder={""}
          value={points}
          returnKeyType={constant.ReturnKeyType.next}
          keyboardType="numeric"
          onChangeText={(points) => setPoints(points)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {TopView()}
      {OpenDigit()}
      {PannaInput()}
      {PointsInput()}
      <GamePopup
        data={popupArray}
        title={"Half Sangam"}
        isVisible={popup}
        onPress={() => ConfirmBet()}
        onPressCancel={() => isPopup(false)}
      />
      {FlatListView()}
      <CustomButton
        title={"SUBMIT"}
        style={styles.bottomButton}
        onPress={() => {
          checkValidationAdd();
        }}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Half Sangam",
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
          <Text style={styles.contact}>{navData.route.params.balance}</Text>
        </TouchableOpacity>
      </LinearGradient>
    ),
    headerTintColor: "black",
  };
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
});

export default HalfSangam;
