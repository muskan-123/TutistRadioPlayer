import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-community/async-storage";
import Navigation from "./Navigation/Navigation";
import firebase from "react-native-firebase";
import RNFetchBlob from "rn-fetch-blob";
import { expo } from "./app.json";
import { APIResource } from "./APIManager";
import AppUpdate from "./Screens/Common/AppUpdate";
import WebviewPaths from "./Screens/Common/WebviewPaths";

const loadFonts = () => {
  return Font.loadAsync({
    opensans_bold: require("./assets/Fonts/OpenSans-Bold.ttf"),
    opensans_light: require("./assets/Fonts/OpenSans-Light.ttf"),
    opensans_regular: require("./assets/Fonts/OpenSans-Regular.ttf"),
    "opensans-semibold": require("./assets/Fonts/OpenSans-Semibold.ttf"),
    SansProRegular: require("./assets/Fonts/SourceSansPro-Regular.ttf"),
    SansProLight: require("./assets/Fonts/SourceSansPro-Light.ttf"),
    SansProSemiBold: require("./assets/Fonts/SourceSansPro-SemiBold.ttf"),
    SansProBold: require("./assets/Fonts/SourceSansPro-Bold.ttf"),
  });
};

export default function App() {
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUpdated, setIsUpdated] = useState(null);
  const [isAppVersionLatest, setIsAppVersionLatest] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    requestUserPermission();
    //registerForNotifications();
    checkAppVersion();
  }, []);

  checkAppVersion = () => {
    APIResource.getAppVersion()
      .then((res) => {
        const { force_update, current_version } = res;
        if (force_update === "true" && expo.version !== current_version) {
          setIsUpdated(false);
          setIsAppVersionLatest(false);
        } else if (
          force_update === "false" &&
          expo.version !== current_version
        ) {
          setIsUpdated(true);
          setIsAppVersionLatest(false);
        } else {
          setIsUpdated(true);
          setIsAppVersionLatest(true);
        }
      })
      .catch((err) => {
        setIsUpdated(true);
        setIsAppVersionLatest(true);
        console.log(err);
      });
  };

  requestUserPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getFcmToken();
    } else {
      requestPermission();
    }
  };
  getFcmToken = async () => {
    console.log("hey");
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      AsyncStorage.setItem("fcmToken", fcmToken);
      console.log("Your Firebase Token is:", fcmToken);
    } else {
      console.log("Failed", "No token received");
    }
  };
  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      getFcmToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  };
  registerForNotifications = async () => {
    const granted = await firebase.messaging().requestPermission();
    if (granted) {
      console.log("User granted messaging permissions!");
    } else {
      console.log("User declined messaging permissions :(");
    }
    await firebase.messaging().registerForRemoteNotifications();
    const unsubscribe = firebase
      .messaging()
      .onMessage(async (remoteMessage) => {
        console.log("FCM Message Data:", remoteMessage.data);
      });

    return unsubscribe;
  };
  AsyncStorage.getItem("isLogin").then((res) => {
    if (res == "true") {
      setLogin(true);
    }
    setIsLoaded(true);
  });

  handleLaterPress = () => {
    setIsAppVersionLatest(true);
  };

  handleUpdatePress = () => {
    // handling the download process
    setIsDownloading(true);
    const dirs = RNFetchBlob.fs.dirs;
    const android = RNFetchBlob.android;
    RNFetchBlob.config({
      appendExt: "apk",
      timeout: 180000,
      addAndroidDownloads: {
        notification: true,
        useDownloadManager: true,
        mime: "application/vnd.android.package-archive",
        mediaScannable: true,
        title: "Matka360.apk",
        description: "Matka App",
        path: dirs.DownloadDir + "/Matka360.apk",
      },
    })
      .fetch("GET", WebviewPaths.apk_url)
      .then((res) => {
        setIsDownloading(false);
        if (res.respInfo.timeout) {
          return;
        }
        android.actionViewIntent(
          res.path(),
          "application/vnd.android.package-archive"
        );
      })
      .catch((error) => {
        setIsDownloading(false);
        console.log(error);
      });
  };

  if (isAppVersionLatest === null && isUpdated === null) {
    return null;
  }

  if (!isAppVersionLatest || !isUpdated) {
    return (
      <AppUpdate
        onLaterPress={handleLaterPress}
        onUpdatePress={handleUpdatePress}
        isForceUpdate={!isUpdated}
        appVersion={expo.version}
        downloading={isDownloading}
      />
    );
  }

  if (!isFontLoaded && !isLoaded) {
    return (
      <AppLoading startAsync={loadFonts} onFinish={() => setFontLoaded(true)} />
    );
  }
  return <Navigation isLogin={isLogin} />;
}
