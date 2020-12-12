import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  BackHandler,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import SectionHeader from "../Common/SectionHeader";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import DashboardHeader from "./DashboardHeader";
import constant from "../../Constants/constant";
import FlatlistView from "./FlatlistView";
import { APIResource } from "../../APIManager";

const flatlistView = (props) => {
  const [lotteryData, setLotteryData] = useState("");
  const [refreshing, setRefresh] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [APIToken, setAPIToken] = useState("");

  const navigation = props.navigation;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getLotteryData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  getLotteryData = async () => {
    const APIToken = await AsyncStorage.getItem("device_token");
    console.log("api" + APIToken);
    setAPIToken(APIToken);
    APIResource.getLotteryList(APIToken)
      .then((lotteryData) => {
        console.log(lotteryData);
        setLoader(false);
        setRefresh(false);
        setLotteryData(lotteryData.data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.flatlistContainer}>
      {isLoader && <ActivityIndicator color={"black"} />}
      {lotteryData.length > 0 ? (
        <FlatList
          data={lotteryData}
          keyExtractor={(item) => item.email}
          onRefresh={() => {
            setRefresh(true);
            //getLotteryData();
            // setLoader(true);
          }}
          extraData={true}
          refreshing={refreshing}
          style={{ marginHorizontal: 5, alignSelf: "center" }}
          renderItem={({ item }) => (
            <FlatlistView
              data={item}
              onGamePress={() =>
                props.navigation.navigate(constant.Navigation.GameDashboard, {
                  title: item.lottery_master.title,
                  lottery_id: item.id,
                })
              }
            />
          )}
        />
      ) : (
        <View>
          <TouchableOpacity
            onPress={() => {
              //setLoader(true);
              getLotteryData();
            }}
          >
            <Text>{isLoader ? "" : " Press to reload"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const bottomView = (props) => {
  return (
    <LinearGradient
      colors={["#f0eaa8", "#e9d060"]}
      style={styles.bottomContainer}
    >
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate(constant.Navigation.profile)}
      >
        <View style={styles.bottomView}>
          <FontAwesome5 name="user-alt" size={20} color="black" />
          <Text style={styles.bottomText}>
            {constant.Strings.ScreenTitle.profile}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate(constant.Navigation.history)}
      >
        <View style={styles.bottomView}>
          <MaterialCommunityIcons name="history" size={22} color="black" />
          <Text style={styles.bottomText}>
            {constant.Strings.ScreenTitle.history}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate(constant.Navigation.wallet)}
      >
        <View style={styles.bottomView}>
          <MaterialCommunityIcons name="wallet" size={22} color="black" />
          <Text style={styles.bottomText}>
            {constant.Strings.ScreenTitle.wallet}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

const DashboardScreen = (props) => {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);
  return (
    <View style={styles.container}>
      <DashboardHeader
        onWalletPress={() =>
          props.navigation.navigate(constant.Navigation.wallet)
        }
        onNotificationPress={() =>
          props.navigation.navigate(constant.Navigation.notification, {
            title: "NOTIFICATION",
          })
        }
        navigation={props.navigation}
      />
      <SectionHeader
        firstField={"  Game  "}
        secondField={"  Time  "}
        thirdField={"  Play  "}
        dashboard={true}
        style={{
          backgroundColor: constant.Colors.primary,
          borderRadius: 3,
          borderColor: "transparent",
          marginTop: 0,
          width: "100%",
        }}
      />
      {flatlistView(props)}
      {bottomView(props)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistContainer: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    height: Dimensions.get("screen").height,
    backgroundColor: "black",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: 60,
    position: "absolute",
    bottom: 0,
  },
  bottomView: {
    alignItems: "center",
    flexDirection: "row",
  },
  bottomText: {
    marginTop: 3,
    color: "black",
    fontSize: 16,
    fontFamily: constant.Fonts.FontFamily.bold,
    marginLeft: 5,
  },
});

export default DashboardScreen;
