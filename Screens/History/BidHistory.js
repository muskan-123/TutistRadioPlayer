import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { APIResource } from "../../APIManager";
import constant from "../../Constants/constant";
import Cart from "../../Components/UI/Cart";
import AsyncStorage from "@react-native-community/async-storage";

const BidAmountScreen = (props) => {
  const [lotteryData, setLotteryData] = useState("");
  const [APIToken, setAPIToken] = useState("");
  useEffect(() => {
    getLotteryData();
  }, []);

  getLotteryData = async () => {
    const APIToken = await AsyncStorage.getItem("device_token");
    setAPIToken(APIToken);
    APIResource.getLotteryList(APIToken)
      .then((lotteryData) => {
        console.log(lotteryData);
        setLotteryData(lotteryData.data.data);
      })
      .catch((err) => console.log(err));
  };
  function cartSelectionHandler(id) {
    props.navigation.push(constant.Navigation.bidAmount, { id });
  }

  const renderList = (Item) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => cartSelectionHandler(Item.item.mst_lottery_id)}
      >
        <Cart style={styles.cartStyle}>
          <View
            style={{ ...styles.blurView, marginLeft: 10, marginRight: 0 }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.contact}>
              {Item.item.lottery_master.title + " History"}
            </Text>
          </View>
          <View style={styles.blurView} />
        </Cart>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container} forceInset={{ bottom: "always" }}>
        <FlatList
          style={styles.flatlist}
          data={lotteryData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderList}
        />
      </SafeAreaView>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: constant.Strings.ScreenTitle.history,
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
    paddingHorizontal: 20,
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 0,
    backgroundColor: constant.Colors.primary,
  },
  contact: {
    fontFamily: constant.Fonts.FontFamily.bold,
    fontSize: constant.Fonts.Size.Title,
  },
  cartStyle: {
    flexDirection: "row",
    marginVertical: 10,
    borderRadius: 13.5,
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    borderLeftColor: constant.Colors.darkRed,
    borderLeftWidth: 2,
    borderRightColor: constant.Colors.darkRed,
    borderRightWidth: 2,
    backgroundColor: constant.Colors.primary,
  },
  blurView: {
    width: 5,
    height: "100%",
    marginRight: 10,
    backgroundColor: "white",
    opacity: 0.2,
  },
});

export default BidAmountScreen;
