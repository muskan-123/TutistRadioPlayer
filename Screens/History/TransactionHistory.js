import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import constant from "../../Constants/constant";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";
import RequestHistoryCart from "../Common/RequestHistoryCart";
import { WalletAPIManager } from "../../APIManager";
const TransactionHistory = (props) => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [APIToken, setAPIToken] = useState("");
  useEffect(() => {
    getTransactionHistory();
  }, []);
  getTransactionHistory = async () => {
    const APIToken = await AsyncStorage.getItem("device_token");
    setAPIToken(APIToken);
    WalletAPIManager.transactionHistory(APIToken).then((transactionHistory) => {
      setTransactionHistory(transactionHistory.data.data);
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
          justifyContent: transactionHistory.length != 0 ? null : "center",
          alignItems: transactionHistory.length != 0 ? null : "center",
        },
      ]}
    >
      {transactionHistory.length != 0 ? (
        <FlatList
          style={styles.flatlist}
          data={transactionHistory}
          keyExtractor={(item) => item.id.toString()}
          renderItem={RenderItem}
        />
      ) : (
        <Text style={{ fontSize: 20, color: "white" }}>No Data Available</Text>
      )}
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerTitle: constant.Strings.ScreenTitle.TransactionHistory,
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
});

export default TransactionHistory;
