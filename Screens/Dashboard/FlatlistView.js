import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import LinearGradient from "react-native-linear-gradient";
function startAnimation() {
  const moveAnim = new Animated.Value(0);
}
function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "am" : "pm"; // Set AM/PM
    time[0] = +time[0] % 12 || 12;
    time[3] = " "; // Adjust hours
  }
  //time = time.splice(3, 1);

  return time.join(""); // return adjusted time or original string
}

const firstView = (props) => {
  const moveAnim = new Animated.Value(0);
  const {
    opening_figure,
    calculated_figure,
    closing_figure,
    opening_bet_time,
    closing_bet_time,
  } = props.data;

  const currentTime = moment().format("HH:mm:ss");
  const isOpeningBetValid = opening_bet_time > currentTime;
  const isClosingBetValid = closing_bet_time > currentTime;

  Animated.loop(
    Animated.sequence([
      Animated.timing(moveAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()
  );

  const rotateInterpolate = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "30deg"],
  });

  return (
    <View style={styles.firstView}>
      <Text style={styles.titleText}>{props.data.lottery_master.title}</Text>
      <Animated.Text
        style={[
          styles.titleText,
          {
            transform: [
              {
                rotate: rotateInterpolate,
              },
            ],
            color: "#FDB732",
          },
        ]}
      >
        {opening_figure + " - " + calculated_figure + " - " + closing_figure}
      </Animated.Text>
      {!isOpeningBetValid && !isClosingBetValid && (
        <Text style={styles.lastText}>Betting is closed for today</Text>
      )}
      {!isOpeningBetValid && isClosingBetValid && (
        <Text style={styles.lastText}>Betting is running for today</Text>
      )}
      {isOpeningBetValid && isClosingBetValid && (
        <Text style={styles.lastText}></Text>
      )}
    </View>
  );
};
const middleView = (props) => {
  const { opening_bet_time, closing_bet_time } = props.data;
  return (
    <View
      style={{ width: "35%", alignItems: "center", justifyContent: "center" }}
    >
      <Text style={styles.bidsText}>
        {"OPEN-BIDS- " + tConvert(opening_bet_time)}
      </Text>
      <Text style={styles.bidsText}>
        {"CLOSE-BIDS- " + tConvert(closing_bet_time)}
      </Text>
    </View>
  );
};
const lastView = (props) => {
  return (
    <View
      style={{
        width: "25%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LinearGradient
        colors={["#f0eaa8", "#e9d060"]}
        style={{
          width: "90%",
          borderRadius: 5,
          height: 40,
          marginRight: 20,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={props.onGamePress}
        >
          <Text style={{ color: "black", fontWeight: "600" }}>Play Game</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};
const FlatListView = (props) => {
  return (
    <LinearGradient colors={["#1B1B1B", "#212121"]} style={styles.container}>
      {firstView(props)}
      {middleView(props)}
      {lastView(props)}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: "row",
    width: "100%",
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
    width: "40%",
    justifyContent: "space-between",
  },
  lastText: {
    color: "#f0eaa8",
    fontSize: 10,
    fontWeight: "bold",
  },
  titleText: {
    color: "#f0eaa8",
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  bidsText: {
    fontSize: 10,
    color: "#f0eaa8",
  },
});

export default FlatListView;
