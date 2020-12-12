import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { WalletAPIManager } from "../../APIManager";
import constant from "../../Constants/constant";
import RequestHistoryCart from "../Common/RequestHistoryCart";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
const WinningHistoryScreen = (props) => {
  const [winningData, setWinningData] = useState("");
  const [APIToken, setAPIToken] = useState("");

  useEffect(() => {
    getWinningData();
  }, []);
  getWinningData = async () => {
    const APIToken = await AsyncStorage.getItem("device_token");
    console.log("api" + APIToken);
    setAPIToken(APIToken);
    WalletAPIManager.getHistory("2", APIToken).then((winningData) => {
      setWinningData(winningData.data.data);
    });
  };
  const RenderItem = (Item) => {
    let correctDate = moment(Item.item.updated_at).format("DD/MM/YYYY - dddd");
    var fund_amount = Item.item.amount.slice(0, -3);
    var status = Item.item.status == 0 ? "Pending" : "Approved";
    const dataArray = [
      { key: "Fund Id", value: Item.item.id },
      { key: "Fund Amount", value: fund_amount },
      { key: "Description", value: Item.item.type },
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
          justifyContent: winningData.length != 0 ? null : "center",
          alignItems: winningData.length != 0 ? null : "center",
        },
      ]}
    >
      {winningData.length != 0 ? (
        <FlatList
          style={{ padding: 10 }}
          data={winningData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={RenderItem}
        />
      ) : (
        <Text style={{ fontSize: 20, color: "white" }}>No Data Available</Text>
      )}
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: constant.Strings.ScreenTitle.winningHistory,
    headerTintColor: "black",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default WinningHistoryScreen;
