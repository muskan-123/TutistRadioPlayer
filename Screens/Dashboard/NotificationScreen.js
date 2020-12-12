import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import WebviewPaths from "../Common/WebviewPaths";
import { WebView } from "react-native-webview";
import { APIResource } from "../../APIManager";
const NotificationScreen = (props) => {
  const [notificationData, setNotificationData] = useState("");
  const [webUri, setwebUri] = useState("");
  function getNotificationData() {
    console.log(props.route.params.title);
    switch (props.route.params.title) {
      case "NOTIFICATION":
        setwebUri(WebviewPaths.notice_board);
        break;
      case "Game Rates":
        setwebUri(WebviewPaths.game_rates);
        break;
      case "How to Play":
        setwebUri(WebviewPaths.how_to_play);
        break;
      case "Notice Board / Rules":
        setwebUri(WebviewPaths.notice_board);
        break;
    }
  }
  useEffect(() => {
    getNotificationData();
  }, []);
  return <WebView source={{ uri: webUri }} />;
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "space-around",
    padding: 5,
    margin: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    alignSelf: "center",
    borderTopRightRadius: 8,
  },
  firstView: {
    flexDirection: "column",
    alignItems: "center",
    width: "35%",
    justifyContent: "space-between",
  },
  lastText: {
    color: "red",
    fontSize: 10,
  },
  titleText: {
    color: "black",
    fontSize: 12,
    fontStyle: "italic",
  },
  bidsText: {
    fontSize: 10,
    color: "green",
  },
});

export const screenOptions = (navData) => {
  console.log(navData);
  return {
    headerTitle: navData.route.params.title,
    //headerRight: () => <LeftHeader />,
    headerTintColor: "black",
  };
};
export default NotificationScreen;
