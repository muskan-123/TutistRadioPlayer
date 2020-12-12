import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Constants from "../../Constants/constant";
import { WalletAPIManager } from "../../APIManager";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const SectionHeader = (props) => {
  return (
    <>
      <LinearGradient
        colors={["#f0eaa8", "#e9d060"]}
        style={[
          {
            height: 46,
            flexDirection: "row",
            width: "95%",
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 25,
            alignSelf: "center",
            padding: 5,
            marginTop: 15,
          },
          props.style,
        ]}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flex: props.crossIcon ? 2 : 3,
          }}
        >
          <Text
            style={[
              styles.contact,
              { color: props.dashboard ? "black" : "black" },
            ]}
            onPress={() => {}}
          >
            {props.firstField}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flex: props.crossIcon ? 2 : 3,
          }}
        >
          <Text
            style={[
              styles.contact,
              { color: props.dashboard ? "black" : "black" },
            ]}
            onPress={() => {}}
          >
            {props.secondField}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flex: props.crossIcon ? 4 : 3,
          }}
        >
          <Text
            style={[
              styles.contact,
              { color: props.dashboard ? "black" : "black" },
            ]}
            onPress={() => {}}
          >
            {props.thirdField}
          </Text>
          {props.crossIcon && props.onCrossPress && (
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={props.onCrossPress}
            >
              <FontAwesome5 size={18} name={"trash-alt"} color={"red"} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  leftHeaderView: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",

    borderColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 10,
    padding: 2,
  },
  contact: {
    fontSize: 16,
    fontFamily: Constants.Fonts.FontFamily.bold,
  },
});

export default SectionHeader;
