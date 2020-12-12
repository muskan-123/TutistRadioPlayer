import React, { useState, useCallback } from "react";
import { View, StyleSheet, ToastAndroid, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PopUp from "../../Components/UI/PopUp";
import Cart from "../../Components/UI/CartItem";
import constant from "../../Constants/constant";
import { generateMpin } from "../../Model/ModelData";
import { APIResource } from "../../APIManager";
const GenerateMpin = (props) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popUpDataArr, setPopDataArr] = useState([]);
  const [buttonTitle, setButtonTitle] = useState("");
  const [popUpIcon, setIcon] = useState();
  const [id, setId] = useState();
  const cartSelectionHandler = (id) => {
    switch (id) {
      case 0:
        setId(0);
        setPopDataArr([
          { title: "Old ", keyType: "numeric" },
          { title: "New 4-digit MPIN", keyType: "numeric" },
          { title: "ReEnter New MPIN", keyType: "numeric" },
        ]);
        setButtonTitle("Change MPIN");
        break;
      case 1:
        setId(1);
        setPopDataArr([
          { title: "4-digit MPIN", keyType: "numeric" },
          { title: "ReEnter New MPIN", keyType: "numeric" },
        ]);
        setButtonTitle("Generate MPIN");
        break;
    }
    setPopupVisible(true);
  };

  const renderPopup = useCallback(() => {
    return (
      <PopUp
        dataArray={popUpDataArr}
        isVisible={isPopupVisible}
        icon={popUpIcon}
        mpinData={true}
        id={id}
        btnTitle={buttonTitle}
        handlePopupVisibility={setPopupVisible}
      />
    );
  }, [isPopupVisible, popUpIcon, popUpDataArr]);
  const renderList = (Item) => {
    return (
      <Cart
        icon={Item.item.icon}
        title={Item.item.title}
        iconStyle={styles.icon}
        selectHandler={cartSelectionHandler.bind(this, Item.item.id)}
        imageStyle={styles.style}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        bounces={false}
        style={styles.flatlist}
        data={generateMpin}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderList}
      />
      {renderPopup()}
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Generate MPIN",
    headerBackTitleVisible: false,
    //headerRight: () => <LeftHeader />,
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
    marginTop: 10,
  },
});

export default GenerateMpin;
