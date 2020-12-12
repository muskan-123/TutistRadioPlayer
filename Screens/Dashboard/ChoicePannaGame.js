import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  CheckBox,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";
import constant from "../../Constants/constant";
import Constants from "../../Constants/constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomButton, CustomPicker } from "../../Components/UI";
import AsyncStorage from "@react-native-community/async-storage";
import TextField from "../../Components/UI/TextField";
import SectionHeader from "../Common/SectionHeader";
import { WalletAPIManager } from "../../APIManager";
const ChoicePannaGame = (props) => {
  const {
    pickerOne,
    pickerTwo,
    isPannaRequired,
    isEvenCheckbox,
    isOddCheckbox,
    isPointsRequired,
    pannaTitle,
    isSelectedBox,
    digitsInput,
    bidsRequired,
    title,
  } = props.route.params;
  const [APIToken, setAPIToken] = useState("");
  const [isEvenSelected, setEvenSelection] = useState(false);
  const [isOddSelected, setOddSelection] = useState(false);
  const [isSPSelected, setSPSelection] = useState(false);
  const [isDPSelected, setDPSelection] = useState(false);
  const [isTPSelected, setTPSelection] = useState(false);
  const [value, setValue] = useState("");
  const [points, setPoints] = useState("");
  const [leftDigit, setLeftDigit] = useState("");
  const [middleDigit, setMiddleDigit] = useState("");
  const [rightDigit, setRightDigit] = useState("");
  const [dates, setDates] = useState("");
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
  const OddEvenSelection = () => {
    return (
      <View style={styles.topviewContainer}>
        {isEvenCheckbox && (
          <View style={styles.checkboxView}>
            <CheckBox
              value={isEvenSelected}
              onValueChange={setEvenSelection}
              tintColors={{ true: "#F15927", false: "white" }}
            />
            <Text style={styles.evenadd}>{constant.Strings.evendigit}</Text>
          </View>
        )}
        {isOddCheckbox && (
          <View style={styles.checkboxView}>
            <CheckBox
              value={isOddSelected}
              onValueChange={setOddSelection}
              tintColors={{ true: "#F15927", false: "white" }}
            />
            <Text style={styles.evenadd}>{constant.Strings.odddigit}</Text>
          </View>
        )}
      </View>
    );
  };
  const PannaInput = () => {
    return (
      <View
        style={[
          styles.topviewContainer,
          { alignItems: "center", marginTop: 0, paddingHorizontal: 20 },
        ]}
      >
        <Text style={[styles.evenadd, { width: "30%" }]} numberOfLines={1}>
          {pannaTitle.toUpperCase()}
        </Text>
        <TextField
          style={{
            width: "90%",
            marginRight: -20,
            color: constant.Colors.primary,
          }}
          placeholder={""}
          returnKeyType={constant.ReturnKeyType.next}
          required={true}
          onChangeText={(username) => setValue(username)}
          errorTitle={constant.Strings.emptyUserName}
          blurOnSubmitting={false}
          onSubmitEditing={() => textInput.focus()}
        />
      </View>
    );
  };
  const PointsInput = () => {
    return (
      <View
        style={[
          styles.topviewContainer,
          { alignItems: "center", marginTop: 0, paddingHorizontal: 20 },
        ]}
      >
        <Text style={[styles.evenadd, { width: "30%" }]}>{"POINTS"}</Text>
        <TextField
          style={{
            width: "90%",
            marginRight: -20,
            color: constant.Colors.primary,
          }}
          placeholder={""}
          returnKeyType={constant.ReturnKeyType.next}
          required={true}
          onChangeText={(points) => setPoints(points)}
          errorTitle={constant.Strings.emptyUserName}
          blurOnSubmitting={false}
          onSubmitEditing={() => textInput.focus()}
        />
      </View>
    );
  };

  const TopView = () => {
    return (
      <View
        style={[
          styles.topviewContainer,
          {
            justifyContent: pickerTwo
              ? "flex-end"
              : pickerOne
              ? "flex-start"
              : "space-around",
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
          dateArray={[{ title: "OPEN-BAZAAR" }, { title: "CLOSE-BAZAAR" }]}
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

  const digitInput = () => {
    return (
      <View style={styles.topviewContainer}>
        {true && (
          <View
            style={[
              styles.topviewContainer,
              { alignItems: "center", marginTop: 0, flexDirection: "column" },
            ]}
          >
            <Text style={[styles.evenadd, { }]}>{"Left Digit"}</Text>
            <TextField
              style={{ width: 100, color: constant.Colors.primary}}
              returnKeyType={constant.ReturnKeyType.next}
              required={true}
              onChangeText={(leftDigit) => setLeftDigit(leftDigit)}
              errorTitle={constant.Strings.emptyUserName}
              blurOnSubmitting={false}
              onSubmitEditing={() => textInput.focus()}
            />
          </View>
        )}
        {true && (
          <View
            style={[
              styles.topviewContainer,
              { alignItems: "center", marginTop: 0, flexDirection: "column" },
            ]}
          >
            <Text style={[styles.evenadd, {}]}>{"Middle Digit"}</Text>
            <TextField
              style={{ width: 100, color: constant.Colors.primary}}
              returnKeyType={constant.ReturnKeyType.next}
              required={true}
              onChangeText={(middleDigit) => setMiddleDigit(middleDigit)}
              errorTitle={constant.Strings.emptyUserName}
              blurOnSubmitting={false}
              onSubmitEditing={() => textInput.focus()}
            />
          </View>
        )}
        {true && (
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
        )}
      </View>
    );
  };
  const SelectionCheckBox = () => {
    return (
      <View style={styles.topviewContainer}>
        {true && (
          <View style={{ flexDirection: "row" }}>
            <CheckBox
              value={isSPSelected}
              onValueChange={setSPSelection}
              tintColors={{
                false: constant.Colors.primary,
                true: constant.Colors.primary,
              }}
            />
            <Text style={styles.evenadd}>{"SP"}</Text>
          </View>
        )}
        {true && (
          <View style={{ flexDirection: "row" }}>
            <CheckBox
              value={isDPSelected}
              onValueChange={setDPSelection}
              tintColors={{
                false: constant.Colors.primary,
                true: constant.Colors.primary,
              }}
            />
            <Text style={styles.evenadd}>{"DP"}</Text>
          </View>
        )}
        {true && (
          <View style={{ flexDirection: "row" }}>
            <CheckBox
              value={isTPSelected}
              onValueChange={setTPSelection}
              tintColors={{
                false: constant.Colors.primary,
                true: constant.Colors.primary,
              }}
            />
            <Text style={styles.evenadd}>{"TP"}</Text>
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {TopView()}
      {OddEvenSelection()}
      
      {isSelectedBox && SelectionCheckBox()}
      {digitsInput && digitInput()}

      {isPannaRequired && PannaInput()}
      {isPointsRequired && PointsInput()}
      <CustomButton
        title={constant.Strings.add}
        style={{ alignSelf: "center" }}
      />
      <SectionHeader
        firstField={"Digits"}
        secondField={"Points"}
        thirdField={"Game Type"}
      />

      <CustomButton title={"SUBMIT"} style={styles.bottomButton} />
    </View>
  );
};

export const screenOptions = (navData) => {
  console.log(navData.route.params);
  return {
    headerTitle: navData.route.params.title,
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
    width: "100%",
    justifyContent: "space-around",
    padding: 5,
  },

  buttonText: {
    color: "white",
    fontFamily: Constants.Fonts.FontFamily.bold,
    fontStyle: "italic",
  },
  checkboxView: {
    width: "47%",
    flexDirection: "row",
    alignItems: "center",
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

export default ChoicePannaGame;
