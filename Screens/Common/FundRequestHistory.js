import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import constant from "../../Constants/constant";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";
import RequestHistoryCart from "./RequestHistoryCart";
import { WalletAPIManager } from "../../APIManager";
const FudRequestScreen = (props) => {
  const [fundHistory, setFundHistory] = useState([]);
  const [APIToken, setAPIToken] = useState("");
  useEffect(() => {
    getFundHistory();
  }, []);
  getFundHistory = async () => {
    const APIToken = await AsyncStorage.getItem("device_token");

    setAPIToken(APIToken);
    WalletAPIManager.getFundHistory(APIToken).then((res) => {
      setFundHistory(res.data.data);
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
          justifyContent: fundHistory.length != 0 ? null : "center",
          alignItems: fundHistory.length != 0 ? null : "center",
        },
      ]}
    >
      {fundHistory.length != 0 ? (
        <FlatList
          style={styles.flatlist}
          data={fundHistory}
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
    headerTitle: constant.Strings.ScreenTitle.fundRequest,
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

export default FudRequestScreen;
