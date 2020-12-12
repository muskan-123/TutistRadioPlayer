import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { APIResource } from "../../APIManager";
import TopView from "../Auth/TopView";
import CustomButton from "../../Components/UI/Button";
import constant from "../../Constants/constant";

const playScreen = () => {
  const [mobileNum, setMobileNum] = useState("");
  const submitBtnHandler = (id) => {
    let error = "";
    if (mobileNum) {
      APIResource.updateMpin().then((res) => {
        if (res.status === "success") {
        } else {
          ToastAndroid.show(res.message, 5);
        }
      });
    } else {
      error = constant.Strings.validation.emptyMobile;
      ToastAndroid.show(error, 5);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView>
        <ScrollView>
          <TopView />
          <View style={styles.TextView}>
            <CustomButton
              title={constant.Strings.generatempin}
              onPress={() => submitBtnHandler()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Generate MPIN",
    headerBackTitleVisible: false,
    headerTintColor: "black"
  };
};

const styles = StyleSheet.create({
  TextView: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});

export default playScreen;
