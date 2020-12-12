import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import constant from "../../Constants/constant";
import CustomButton from "../../Components/UI/Button";
import TextField from "../../Components/UI/TextField";
import ProfileHelper from "../../Screens/Profile/ProfileHelper";
const PopUp = (props) => {
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [thirdInput, setThirdInput] = useState("");
  const [FullName, setFullName] = useState("");
  const [APIToken, setAPIToken] = useState("");
  const { dataArray, icon, btnTitle, isVisible, handlePopupVisibility } = props;
  useEffect(() => {
    getFullName();
  }, []);

  getFullName = async () => {
    try {
      AsyncStorage.getItem("fullName")
        .then((value) => {
          setFullName(value);
          AsyncStorage.getItem("device_token").then((APIToken) => {
            setAPIToken(APIToken);
          });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      // Error retrieving data
    }
  };
  function handlePress() {
    props.mpinData
      ? (value = ProfileHelper.mpinDataHandle(
          props.id,
          firstInput,
          secondInput,
          thirdInput,
          APIToken
        ))
      : (value = ProfileHelper.profileDataHandle(
          props.id,
          firstInput,
          secondInput,
          thirdInput,
          FullName,
          APIToken
        ));
    handlePopupVisibility(!isVisible);
  }
  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={isVisible}
      style={{ backgroundColor: "red" }}
    >
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => {
          handlePopupVisibility(!isVisible);
        }}
      >
        <View style={styles.modelBackground}>
          {dataArray.length > 0 && (
            <View style={styles.container}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: constant.Fonts.FontFamily.bold,
                  marginTop: 10,
                }}
              >
                {btnTitle}
              </Text>
              <View style={{ ...styles.cartView }}>
                <TextField
                  id="username"
                  placeholder={dataArray && dataArray[0].title}
                  returnKeyType={constant.ReturnKeyType.next}
                  required={true}
                  onChangeText={(firstInput) => setFirstInput(firstInput)}
                  errorTitle={constant.Strings.emptyUserName}
                  blurOnSubmitting={false}
                  onSubmitEditing={props.onSubmitEditingFirst}
                  keyboardType={dataArray[0].keyType}
                  style={{ width: "100%", paddingHorizontal: 0 }}
                />
              </View>
              {dataArray[1] && (
                <View style={{ ...styles.cartView }}>
                  <TextField
                    id="username"
                    placeholder={dataArray[1].title}
                    returnKeyType={constant.ReturnKeyType.next}
                    required={true}
                    onChangeText={(text) => setSecondInput(text)}
                    errorTitle={constant.Strings.emptyUserName}
                    blurOnSubmitting={false}
                    onSubmitEditing={props.onSubmitEditing}
                    keyboardType={dataArray[1].keyType}
                    style={{ width: "100%", paddingHorizontal: 0 }}
                  />
                </View>
              )}
              {dataArray[2] && (
                <View style={{ ...styles.cartView }}>
                  <TextField
                    id="username"
                    placeholder={dataArray[2].title}
                    returnKeyType={constant.ReturnKeyType.next}
                    required={true}
                    onChangeText={(text) => setThirdInput(text)}
                    errorTitle={constant.Strings.emptyUserName}
                    blurOnSubmitting={false}
                    keyboardType={dataArray[2].keyType}
                    onSubmitEditing={props.onSubmitEditing}
                    style={{ width: "100%", paddingHorizontal: 0 }}
                  />
                </View>
              )}
              <CustomButton
                title={btnTitle}
                style={styles.customButton}
                onPress={() => handlePress()}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
  },
  customButton: {
    height: 50,
    width: "90%",
    marginTop: 20,
  },
  cartView: {
    height: 40,
    width: "90%",
    alignItems: "center",
    marginVertical: 10,
  },
  keyText: {
    color: "black",
    fontSize: 16,
    fontFamily: constant.Fonts.FontFamily.regular,
  },
  modelBackground: {
    flex: 1,
    backgroundColor: "#00000060",
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    width: 60,
    height: 60,
    marginVertical: 5,
    marginBottom: 0,
  },
});

export default PopUp;
