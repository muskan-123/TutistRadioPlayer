import React, { useEffect, useState } from "react";

import { StyleSheet, TouchableOpacity } from "react-native";
import Constants from "../../Constants/constant";
import constant from "../../Constants/constant";
import moment from "moment";
import { Picker } from "@react-native-community/picker";
const CustomPicker = (props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: constant.Colors.primary,
        width: "45%",
        height: 44,
        borderRadius: 4,
        borderTopWidth: 1,
        borderTopColor: "black",
        borderBottomWidth: 1,
        borderBottomColor: "black",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 5,
        margin: 10,
      }}
    >
      <Picker
        selectedValue={
          props.bazaar ? props.selectedBazaarValue : props.selectedValue
        }
        style={{
          width: "100%",
          height: 42,
          color: "black",
          fontStyle: "italic",
          backgroundColor: constant.Colors.primary,
        }}
        itemStyle={{ fontSize: 18 }}
        onValueChange={props.onChange}
      >
        {props.dateArray != "" &&
          props.dateArray.map((item) => (
            <Picker.Item
              label={
                props.bazaar
                  ? item.title
                  : moment(item.date).format("DD/MM/YYYY - dddd")
              }
              value={
                props.bazaar
                  ? item.title
                  : moment(item.date).format("DD/MM/YYYY - dddd")
              }
            />
          ))}

        {props.nonDateArrayRequired &&
          props.nonDateArray.map((item) => (
            <Picker.Item label={item.title} value={item} />
          ))}
      </Picker>
    </TouchableOpacity>
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
    color: "black",
    fontSize: 14,
    fontFamily: Constants.Fonts.FontFamily.semiBold,
  },
});

export default CustomPicker;
