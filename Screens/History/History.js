import React from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";

import constant from "../../Constants/constant";
import Cart from "../../Components/UI/CartItem";
import { HistoryArray } from "../../Model/ModelData";

const HistoryScreen = (props) => {
  const cartSelectionHandler = (id) => {
    let navigationScreen;
    switch (id) {
      case 0:
        navigationScreen = constant.Navigation.bidHistory;
        break;
      case 1:
        navigationScreen = "TransactionHistory";
        break;
      case 2:
        navigationScreen = constant.Navigation.fundRequest;
        break;
    }
    if (navigationScreen != undefined) {
      props.navigation.push(navigationScreen);
    }
  };

  const renderList = (Item) => {
    return (
      <Cart
        icon={Item.item.icon}
        title={Item.item.title}
        iconStyle={styles.icon}
        selectHandler={cartSelectionHandler.bind(this, Item.item.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={HistoryArray}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderList}
        contentContainerStyle={styles.flatlist}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: constant.Strings.ScreenTitle.history,
    headerTintColor: "black"
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  flatlist: {
    flex: 1,
    paddingHorizontal: 20,
  },
  leftHeaderView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: Dimensions.get("window").width / 3,
  },
  contact: {
    color: "white",
    fontFamily: constant.Fonts.FontFamily.bold,
    fontSize: constant.Fonts.Size.Title,
    marginLeft: 5,
  },
});

export default HistoryScreen;
