import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Text } from "react-native";
import { WalletAPIManager } from "../../APIManager";
import constant from "../../Constants/constant";
import moment from "moment";
import RequestHistoryCart from "../Common/RequestHistoryCart";
import AsyncStorage from "@react-native-community/async-storage";
const BidAmountScreen = (props) => {
  const [bidHistory, setBidHistory] = useState([]);
  const [APIToken, setAPIToken] = useState("");
  useEffect(() => {
    getBidHistory();
  }, []);
  getBidHistory = async () => {
    const APIToken = await AsyncStorage.getItem("device_token");
    setAPIToken(APIToken);
    WalletAPIManager.getHistory(APIToken, props.route.params.id).then((res) => {
      setBidHistory(res.data.data);
    });
  };

  const RenderItem = (Item) => {
    let correctDate = moment(Item.item.created_at).format("DD/MM/YYYY - dddd");
    var fund_amount = Item.item.amount.slice(0, -3);
    var status = Item.item.status == 1 ? "Pending" : "Approved";
    const dataArray = [
      { key: "Market Id", value: Item.item.id },
      { key: "Fund Amount", value: fund_amount },
      { key: "Figure", value: Item.item.figure },
      { key: "Status", value: status },
      { key: "Date", value: correctDate },
    ];
    return <RequestHistoryCart dataArray={dataArray} />;
  };

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: bidHistory.length != 0 ? null : "center",
          alignItems: bidHistory.length != 0 ? null : "center",
        },
      ]}
    >
      <SafeAreaView style={styles.container} forceInset={{ bottom: "always" }}>
        {bidHistory.length != 0 ? (
          <FlatList
            style={styles.flatlist}
            data={bidHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={RenderItem}
          />
        ) : (
          <Text style={{ fontSize: 20, color: "white" }}>
            No Data Available
          </Text>
        )}
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
    backgroundColor: "white",
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
