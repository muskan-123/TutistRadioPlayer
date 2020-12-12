import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import LinearGradient from "react-native-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import moment from "moment";
import DatePicker from "react-native-datepicker";
import { ProfileAPIManager } from "../../APIManager";
import constant from "../../Constants/constant";

const AccountStatement = (props) => {
  const [accountStatementData, setAccountStatementData] = useState();
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedType, setSelectedtype] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    getAccountStatement();
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setFilterModalVisible(!isFilterModalVisible)}
          style={styles.leftHeaderView}
        >
          <MaterialCommunityIcons name="filter" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation, isFilterModalVisible, setFilterModalVisible]);

  getAccountStatement = async () => {
    const APIToken = await AsyncStorage.getItem("device_token");
    const updatedStartDate =
      startDate || moment().subtract(1, "months").format("YYYY-MM-DD");
    const updatedEndDate = endDate || moment().format("YYYY-MM-DD");
    const userStatements = await ProfileAPIManager.getuserStatement(
      APIToken,
      updatedStartDate,
      updatedEndDate
    );
    if (userStatements.data) {
      setAccountStatementData(userStatements.data.data);
    }
  };

  const RenderItem = (Item) => {
    const data = Item.item;
    const date = moment(data.created_at).format("MMM Do YYYY | h:mm a");
    return (
      <LinearGradient colors={["#f0eaa8", "#e9d060"]} style={styles.cartView}>
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.text}>{data.description}</Text>
            <Text style={styles.textDate}>{date}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text
              style={[
                styles.text,
                {
                  color: data.type === 1 ? "red" : "green",
                  fontSize: 22,
                },
              ]}
            >
              {data.type === 1 ? "- ₹" : "+ ₹"}
              {data.amount}
            </Text>
          </View>
          {/* <Text style={styles.text}>-</Text>
          <Text style={styles.text}>{data.balance}</Text> */}
        </View>
      </LinearGradient>
    );
  };

  const handleTypeChange = (type) => {
    if (type === selectedType) {
      setSelectedtype();
    } else {
      setSelectedtype(type);
    }
  };

  const handleSubmitPress = async () => {
    setFilterModalVisible(false);
    getAccountStatement();
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          style={{ padding: 10 }}
          data={accountStatementData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={RenderItem}
        />
      </View>
      {isFilterModalVisible && (
        <Modal
          style={styles.modalContainer}
          isVisible={isFilterModalVisible}
          onBackdropPress={() => setFilterModalVisible(false)}
          animationIn="slideInRight"
        >
          <View style={styles.modalViewContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.text}>Filters</Text>
            </View>

            <View
              style={[
                styles.rowContainer,
                { justifyContent: "space-around", marginTop: 20 },
              ]}
            >
              <DatePicker
                style={{ width: 150 }}
                date={startDate}
                mode="date"
                placeholder="Start date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                maxDate={endDate || moment().format("YYYY-MM-DD")}
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                    color: constant.Colors.primary,
                  },
                  dateText: {
                    color: constant.Colors.primary,
                  },
                }}
                onDateChange={(date) => {
                  setStartDate(date);
                }}
              />

              <DatePicker
                style={{ width: 150 }}
                date={endDate}
                mode="date"
                placeholder="End date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                minDate={
                  startDate ||
                  moment().subtract(1, "months").format("YYYY-MM-DD")
                }
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                  dateText: {
                    color: constant.Colors.primary,
                  },
                }}
                onDateChange={(date) => {
                  setEndDate(date);
                }}
              />
            </View>

            <View
              style={[
                styles.rowContainer,
                { justifyContent: "space-around", marginTop: 40 },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.debitCreditContainer,
                  selectedType === 1 && {
                    backgroundColor: constant.Colors.primary,
                  },
                ]}
                onPress={() => {
                  handleTypeChange(1);
                }}
              >
                <Text style={styles.text}>Debits</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.debitCreditContainer,
                  selectedType === 2 && {
                    backgroundColor: constant.Colors.primary,
                  },
                ]}
                onPress={() => {
                  handleTypeChange(2);
                }}
              >
                <Text style={styles.text}>Credits</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={1}
              style={{ flex: 1, justifyContent: "flex-end" }}
              onPress={handleSubmitPress}
              disabled={startDate === "" || endDate === ""}
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
        </Modal>
      )}
    </>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: constant.Strings.ScreenTitle.accountStatement,
    headerTintColor: "black",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  extraStyle: {
    marginBottom: 20,
  },
  cart: {
    flexDirection: "row",
    height: 55,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  cartContainer: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: constant.Fonts.FontFamily.semiBold,
    textAlign: "left",
    color: "black",
  },
  textDate: {
    fontSize: 14,
    fontFamily: constant.Fonts.FontFamily.regular,
    textAlign: "left",
    color: "black",
  },
  cartView: {
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    marginBottom: 15,
    borderRadius: 5,
    padding: 10,
  },
  rowContainer: {
    flexDirection: "row",
  },
  amountContainer: {
    flex: 1,
    alignItems: "flex-end",
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
  modalContainer: {
    flex: 1,
    margin: 0,
  },
  modalViewContainer: {
    flex: 1,
    marginLeft: 50,
    backgroundColor: "black",
  },
  modalHeader: {
    backgroundColor: constant.Colors.primary,
    alignSelf: "stretch",
    paddingVertical: 18,
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
  debitCreditContainer: {
    flex: 1,
    backgroundColor: "grey",
    borderRadius: 10,
    height: 40,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AccountStatement;
