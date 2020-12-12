import React from "react";
import { View, StyleSheet, Text, Modal, FlatList } from "react-native";
import constant from "../../Constants/constant";
import CustomButton from "../../Components/UI/Button";

const GamePopup = (props) => {
  const { onPress, isVisible } = props;
  const FlatListView = () => {
    return (
      <FlatList
        data={props.data}
        renderItem={({ item }) =>
          item.point != "" && (
            <View
              style={{
                flexDirection: "row",
                width: "80%",
                justifyContent: "space-around",
                alignSelf: "center",
              }}
            >
              <Text style={styles.textTitle}>{item.bet}</Text>

              <Text style={styles.textTitle}>{item.point}</Text>
            </View>
          )
        }
      />
    );
  };
  return (
    <Modal animationType={"fade"} transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              width: "80%",
              justifyContent: "space-around",
              alignSelf: "center",
            }}
          >
            <Text style={styles.textTitle}>{props.title}</Text>
            <Text style={styles.textTitle}>{"POINT"}</Text>
          </View>
          {FlatListView()}
          <View style={styles.buttonContainer}>
            <View style={{ width: "40%" }}>
              <CustomButton title={"Cancel"} onPress={props.onPressCancel} />
            </View>
            <View style={{ width: "40%" }}>
              <CustomButton title={"Confirm"} onPress={onPress} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "black",
    marginTop: 20,
    borderRadius: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.7,
    borderColor: constant.Colors.primary,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
  },
  keyText: {
    color: "black",
    fontSize: 16,
    fontFamily: constant.Fonts.FontFamily.regular,
  },
  modelBackground: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    height: 140,
  },

  textTitle: {
    color: constant.Colors.primary,
    fontSize: 18,
  },
});

export default GamePopup;
