import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Constants from "../../Constants/constant";
import { APIResource, WalletAPIManager } from "../../APIManager";
import constant from "../../Constants/constant";

const GameDashboard = (props) => {
  const [gameData, setGameData] = useState("");
  const [APIToken, setAPIToken] = useState("");
  const [balance, setBalance] = useState("");
  useEffect(() => {
    getGameData();
  }, []);
  getGameData = async () => {
    const APIToken = await AsyncStorage.getItem("device_token");
    setAPIToken(APIToken);
    const allGamesObj = {
      created_at: "",
      created_by: null,
      deleted_at: null,
      deleted_by: null,
      description: "no",
      game_image: "",
      game_url: "jodi-digit",
      id: 10,
      name: "All Games",
      rate: "",
      status: "",
      updated_at: "",
      updated_by: null,
    };
    APIResource.getGamesList(APIToken).then((gameData) => {
      setGameData([allGamesObj, ...gameData.data.data]);
      console.log(gameData.data.data);

      WalletAPIManager.getUserWallet(APIToken).then((res) => {
        setBalance(res.data.balance);
      });
    });
  };

  gameScreen = (screenName, id) => {
    console.log("hey" + props.route.params.lottery_id);
    switch (screenName) {
      case "Figure Game":
        props.navigation.navigate("FigureGame", {
          balance: balance,
          id: id,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "Jodi Game":
        props.navigation.navigate("JodiGame", {
          balance: balance,
          id: id,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "Single Pana":
        props.navigation.navigate("SinglePanna", {
          balance: balance,
          id: id,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "Double Pana":
        props.navigation.navigate("DoublePanna", {
          balance: balance,
          id: id,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "Triple Pana":
        props.navigation.navigate("TriplePanna", {
          balance: balance,
          id: id,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "SP Motor":
        props.navigation.navigate("SPMotor", {
          balance: balance,
          id: id,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "DP Motor":
        props.navigation.navigate("DPMotor", {
          balance: balance,
          id: id,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "Panel Group":
        props.navigation.navigate("PanelGroup", {
          balance: balance,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "Half Sangam Digits":
        props.navigation.navigate("HalfSangam", {
          balance: balance,
          id: id,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "Full Sangam Digits":
        props.navigation.navigate("FullSangam", {
          balance: balance,
          id: id,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "Choice Pana":
        props.navigation.navigate("ChoicePana", {
          balance: balance,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "Group Jodi":
        props.navigation.navigate("GroupJodi", {
          balance: balance,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "Odd Even":
        props.navigation.navigate(constant.Navigation.evenoddgame, {
          title: "Odd Even",
          isPointsRequired: true,
          pickerOne: true,
          pickerTwo: true,
          balance: balance,
          isEvenCheckbox: true,
          isOddCheckbox: true,
        });
        break;
      case "Red Bracket":
        props.navigation.navigate("RedBracket", {
          balance: balance,
          id: id,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "Group Jodi":
        props.navigation.navigate(constant.Navigation.evenoddgame, {
          title: "Group Jodi",
          pannaTitle: "Group Digit",
          isPannaRequired: true,
          isPointsRequired: true,
          pickerOne: true,
          pickerTwo: true,
          balance: balance,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "Single Digits":
        props.navigation.navigate(constant.Navigation.evenoddgame, {
          title: "Single Digits",
          pannaTitle: "Single Digit",
          isPannaRequired: true,
          isPointsRequired: true,
          pickerOne: true,
          pickerTwo: true,
          balance: balance,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "Jodi Digits":
        props.navigation.navigate(constant.Navigation.evenoddgame, {
          title: "Jodi Digits",
          pannaTitle: "Jodi Digits",
          isPannaRequired: true,
          isPointsRequired: true,
          pickerOne: true,
          pickerTwo: true,
          balance: balance,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "All Games":
        props.navigation.navigate(constant.Navigation.AllGamesDashboard, {
          isPointsRequired: true,
          pickerOne: true,
          pickerTwo: true,
          balance: balance,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "Digit Based Jodi":
        props.navigation.navigate(constant.Navigation.digitBasedGame, {
          title: "Digit Based Jodi",
          pannaTitle: "Digit Jodi",
          isPannaRequired: true,
          isPointsRequired: true,
          pickerOne: true,
          pickerTwo: false,
          balance: balance,
          digitsInput: true,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "Choice Pana":
        props.navigation.navigate(constant.Navigation.choicePannaGame, {
          title: "Choice Pana",
          pannaTitle: "Choice Pana",
          isPannaRequired: false,
          isPointsRequired: true,
          pickerOne: true,
          pickerTwo: true,
          balance: balance,
          digitsInput: true,
          isSelectedBox: true,
          lottery_id: props.route.params.lottery_id,
        });
        break;
      case "Two Digit Panel":
        props.navigation.navigate(
          constant.Navigation.twoDigitPanelGameOptions,
          {
            title: "Two Digit Panel",
            pannaTitle: "Enter Two Digits",
            isPannaRequired: true,
            isPointsRequired: true,
            pickerOne: true,
            pickerTwo: true,
            balance: balance,
            lottery_id: props.route.params.lottery_id,
          }
        );
        break;
      case "SP, DP, TP":
        props.navigation.navigate(constant.Navigation.SPDPTPGame, {
          title: "SP, DP, TP",
          pannaTitle: "Enter Two Digits",
          isPannaRequired: false,
          isPointsRequired: true,
          pickerOne: true,
          pickerTwo: true,
          balance: balance,
          lottery_id: props.route.params.lottery_id,
        });
        break;
    }
  };
  // const topView = (props) => {
  //   return (
  //     <TouchableOpacity
  //       style={[styles.diamond, { alignSelf: "center" }]}
  //       onPress={() =>
  //         props.navigation.navigate(constant.Navigation.AllGamesDashboard, {
  //           isPointsRequired: true,
  //           pickerOne: true,
  //           pickerTwo: true,
  //           balance: balance,
  //         })
  //       }
  //     >
  //       <Text
  //         style={{
  //           color: "white",
  //           fontSize: 12,
  //           fontFamily: Constants.Fonts.FontFamily.bold,
  //           transform: [{ rotate: "-45deg" }],
  //         }}
  //       >
  //         {"All Games"}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // };
  const flatlistView = (props) => {
    return (
      <View style={styles.flatlistContainer}>
        <FlatList
          data={gameData}
          keyExtractor={(item) => item.email}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
          style={{ marginHorizontal: 5, alignSelf: "center" }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.diamond}
              onPress={() => gameScreen(item.name, item.id)}
            >
              <Image
                style={styles.allGamesImage}
                source={require("../../assets/game1.png")}
              />
              <Text
                style={{
                  color: constant.Colors.primary,
                  fontSize: 14,
                  marginTop: 10,
                  fontFamily: Constants.Fonts.FontFamily.bold,
                  width: 80,
                  textAlign: "center",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  const bottomView = (props) => {
    return <View style={styles.bottomContainer}></View>;
  };
  const topView = (props) => {
    return (
      <TouchableOpacity
        style={[styles.diamond, { alignSelf: "center" }]}
        onPress={() =>
          props.navigation.navigate(constant.Navigation.AllGamesDashboard, {
            isPointsRequired: true,
            pickerOne: true,
            pickerTwo: true,
          })
        }
      >
        <Image
          style={styles.allGamesImage}
          source={require("../../assets/game1.png")}
        />
        <Text
          style={{
            color: constant.Colors.primary,
            fontSize: 14,
            marginTop: 10,
            fontFamily: Constants.Fonts.FontFamily.semiBold,
          }}
        >
          {"All Games"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* {topView(props)} */}
      {flatlistView(props)}
      {bottomView(props)}
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.title,
    headerBackTitleVisible: false,
    //headerRight: () => <LeftHeader />,
    headerTintColor: "black",
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  flatlistContainer: {
    alignItems: "center",
    paddingVertical: 20,
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
  },
  diamond: {
    borderRadius: 5,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  allGamesImage: {
    width: 80,
    height: "auto",
    aspectRatio: 1.5 / 1.5,
    alignSelf: "center",
  },
});

export default GameDashboard;
