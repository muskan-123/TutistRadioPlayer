import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import constant from "../../Constants/constant";
import { WalletAPIManager } from "../../APIManager";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
const DashboardHeader = (props) => {
  const [balance, setBalance] = useState("");
  const [APIToken, setAPIToken] = useState("");

  const navigation = props.navigation;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getWalletBalance();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  getWalletBalance = async () => {
    const APIToken = await AsyncStorage.getItem("device_token");
    setAPIToken(APIToken);
    WalletAPIManager.getUserWallet(APIToken).then((res) => {
      setBalance(res.data.balance);
      console.log(res);
      AsyncStorage.setItem("balance", JSON.stringify(res.data.balance));
    });
  };

  return (
    <View
      style={{
        height: 100,
        flexDirection: "row",
        width: "100%",
        backgroundColor: constant.Colors.primary,
        justifyContent: "space-around",
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}
    >
      <LinearGradient
        colors={["#1B1B1B", "#212121"]}
        style={styles.leftHeaderViewContainer}
      >
        <TouchableOpacity
          onPress={props.onNotificationPress}
          style={styles.leftHeaderView}
        >
          <MaterialCommunityIcons
            name="bell"
            size={22}
            color={constant.Colors.primary}
          />
          <Text style={styles.contact}>{"Notification"}</Text>
        </TouchableOpacity>
      </LinearGradient>
      <View
        style={{ width: "30%", justifyContent: "center", alignItems: "center" }}
      >
        <Image style={styles.logo} source={{ uri: constant.matka360 }} />
      </View>
      <LinearGradient
        colors={["#1B1B1B", "#212121"]}
        style={styles.leftHeaderViewContainer}
      >
        <TouchableOpacity
          style={styles.leftHeaderView}
          onPress={props.onWalletPress}
        >
          <MaterialCommunityIcons
            name="wallet"
            size={22}
            color={constant.Colors.primary}
          />
          <Text style={styles.contact}>{balance}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  leftHeaderViewContainer: {
    width: "35%",
    height: 55,
    borderRadius: 40,
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
  logo: {
    width: 60,
    height: 60,
  },
});

export default DashboardHeader;
