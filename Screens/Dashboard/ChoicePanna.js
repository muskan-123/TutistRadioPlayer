import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
  CheckBox,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import constant from "../../Constants/constant";
import Constants from "../../Constants/constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomButton, CustomPicker } from "../../Components/UI";
import AsyncStorage from "@react-native-community/async-storage";
import TextField from "../../Components/UI/TextField";
import SectionHeader from "../Common/SectionHeader";
import { WalletAPIManager } from "../../APIManager";
import moment from "moment";
const ChoicePanna = (props) => {
  const [APIToken, setAPIToken] = useState("");
  const [value, setValue] = useState([]);
  const [points, setPoints] = useState("");
  const [digit, setDigit] = useState("");
  const [isSPSelected, setSPSelection] = useState(false);
  const [isDPSelected, setDPSelection] = useState(false);
  const [isTPSelected, setTPSelection] = useState(false);
  const [leftDigit, setLeftDigit] = useState("");
  const [middleDigit, setMiddleDigit] = useState("");
  const [rightDigit, setRightDigit] = useState("");
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBazaar, setSelectedBazaar] = useState("OPEN-BAZAAR");
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
  function checkValidationAdd() {
    if (digit != "" && points != "") {
      if (DoublePannaInput.some((item) => item == digit)) {
        setValue([...value, { digit: digit, point: points, type: "open" }]);
        setPoints("");
        setDigit("");
      } else {
        ToastAndroid.show("Please enter valid input", 5);
      }
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
            console.log(e);
            setSelectedBazaar(e);
          }}
        />
      </View>
    );
  };
  const PannaInput = () => {
    return (
      <View
        style={[
          styles.topviewContainer,
          { width: "100%", justifyContent: "space-around" },
        ]}
      >
        <View
          style={[
            styles.topviewContainer,
            { alignItems: "center", marginTop: 0, flexDirection: "column" },
          ]}
        >
          <Text style={[styles.evenadd, {}]}>{"Left Digit"}</Text>
          <TextField
            style={{}}
            returnKeyType={constant.ReturnKeyType.next}
            required={true}
            onChangeText={(leftDigit) => setLeftDigit(leftDigit)}
            errorTitle={constant.Strings.emptyUserName}
            blurOnSubmitting={false}
            onSubmitEditing={() => textInput.focus()}
          />
        </View>
        <View
          style={[
            styles.topviewContainer,
            { alignItems: "center", marginTop: 0, flexDirection: "column" },
          ]}
        >
          <Text style={[styles.evenadd, {}]}>{"Middle Digit"}</Text>
          <TextField
            style={{}}
            returnKeyType={constant.ReturnKeyType.next}
            required={true}
            onChangeText={(middleDigit) => setMiddleDigit(middleDigit)}
            errorTitle={constant.Strings.emptyUserName}
            blurOnSubmitting={false}
            onSubmitEditing={() => textInput.focus()}
          />
        </View>

        <View
          style={[
            styles.topviewContainer,
            { alignItems: "center", marginTop: 0, flexDirection: "column" },
          ]}
        >
          <Text style={[styles.evenadd, {}]}>{"Right Digit"}</Text>
          <TextField
            style={{ width: 100, color: constant.Colors.primary }}
            returnKeyType={constant.ReturnKeyType.next}
            required={true}
            onChangeText={(rightDigit) => setRightDigit(rightDigit)}
            errorTitle={constant.Strings.emptyUserName}
            blurOnSubmitting={false}
            onSubmitEditing={() => {
              checkValidationAdd();
            }}
          />
        </View>
      </View>
    );
  };
  const PointsInput = () => {
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
          required={true}
          onChangeText={(points) => setPoints(points)}
          errorTitle={constant.Strings.emptyUserName}
          blurOnSubmitting={false}
          onSubmitEditing={() => {
            checkValidationAdd();
          }}
          keyboardType="numeric"
        />
      </View>
    );
  };
  const SelectionCheckBox = () => {
    return (
      <View
        style={[
          styles.topviewContainer,
          { width: "100%", justifyContent: "space-around" },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSPSelected}
            onValueChange={setSPSelection}
            tintColors={{ true: "#F15927", false: "white" }}
          />
          <Text style={styles.evenadd}>{"SP"}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isDPSelected}
            onValueChange={setDPSelection}
            tintColors={{ true: "#F15927", false: "white" }}
          />
          <Text style={styles.evenadd}>{"DP"}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isTPSelected}
            onValueChange={setTPSelection}
            tintColors={{ true: "#F15927", false: "white" }}
          />
          <Text style={styles.evenadd}>{"TP"}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {TopView()}
      {SelectionCheckBox()}
      {PannaInput()}
      {PointsInput()}
      <CustomButton
        onPress={() => {
          checkValidationAdd();
        }}
        title={constant.Strings.add}
        style={{ alignSelf: "center" }}
      />
      <SectionHeader
        firstField={"Digits"}
        secondField={"Points"}
        thirdField={"Game Type"}
        crossIcon
      />
      {FlatListView()}
      <CustomButton title={"SUBMIT"} style={styles.bottomButton} />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "CHOICE PANNA",
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

export default ChoicePanna;
