import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  SafeAreaView,
} from "react-native";
import constant from "../../Constants/constant";
import Cart from "../../Components/UI/CartItem";
import { ProfileDetailArray } from "../../Model/ModelData";
import PopUp from "../../Components/UI/PopUp";

const ProfileDetailScreen = (props) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popUpDataArr, setPopDataArr] = useState([]);
  const [buttonTitle, setButtonTitle] = useState("");
  const [popUpIcon, setIcon] = useState();
  const [id, setId] = useState();

  const cartSelectionHandler = (id) => {
    var dataArray;
    switch (id) {
      case 0:
        setId(0);
        setPopDataArr([
          {
            title: "Address",
            keyType: "default",
            key: "paytm",
            name: "location-outline",
          },
          {
            title: "City",
            keyType: "default",
            key: "paytm",
            name: "location-outline",
          },
          {
            title: "Pin Code",
            keyType: "numeric",
            key: "paytm",
            name: "location-outline",
          },
        ]);
        setIcon(ProfileDetailArray[0].icon);
        setButtonTitle("Add Address");
        break;
      case 1:
        setId(1);
        setPopDataArr([
          { title: "Account No", keyType: "numeric" },
          { title: "Bank Name", keyType: "default" },
          { title: "IFSC Code", keyType: "default" },
          { title: "Account Holder Name", keyType: "default" },
        ]);
        setButtonTitle("Add Bank Details");
        setIcon(ProfileDetailArray[1].icon);
        break;
      case 2:
        setId(2);
        setPopDataArr([
          { title: "PAYTM No", keyType: "numeric", key: "paytm" },
        ]);
        setButtonTitle("Add Paytm");
        setIcon(ProfileDetailArray[2].icon);
        break;
      case 3:
        setId(3);
        setPopDataArr([
          { title: "Google-Pay No", keyType: "numeric", key: "googlepay" },
        ]);
        setButtonTitle("Add Google Pay");
        setIcon(ProfileDetailArray[3].icon);
        break;
      case 4:
        setId(4);
        setButtonTitle("Add Phonepe");
        setPopDataArr([{ title: "Phonepe", keyType: "numeric" }]);
        setIcon(ProfileDetailArray[4].icon);
        break;
    }

    setPopupVisible(true);
  };

  const renderList = (Item) => {
    return (
      <Cart
        icon={Item.item.icon}
        title={Item.item.title}
        iconStyle={styles.icon}
        selectHandler={cartSelectionHandler.bind(this, Item.item.id)}
        imageStyle={styles.style}
        name={Item.item.name}
      />
    );
  };

  const renderPopup = useCallback(() => {
    return (
      <PopUp
        dataArray={popUpDataArr}
        isVisible={isPopupVisible}
        icon={popUpIcon}
        id={id}
        btnTitle={buttonTitle}
        handlePopupVisibility={setPopupVisible}
      />
    );
  }, [isPopupVisible, popUpIcon, popUpDataArr]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container} forceInset={{ bottom: "always" }}>
        <FlatList
          bounces={false}
          style={styles.flatlist}
          data={ProfileDetailArray}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderList}
          ListFooterComponent={() => (
            <Text style={{ ...styles.text, fontSize: 14 }}>
              {constant.Strings.warning}
            </Text>
          )}
        />
        {renderPopup()}
      </SafeAreaView>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: constant.Strings.profile,
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
  leftHeaderView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: Dimensions.get("window").width / 3,
  },
  contact: {
    color: "white",
    fontFamily: constant.Fonts.FontFamily.bold,
    fontSize: constant.Fonts.Size.Title,
    marginLeft: 5,
  },
  icon: {
    height: 50,
    width: 50,
  },
  topContainer: {
    flexDirection: "row",
  },
  iconContainer: {
    width: 25,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: constant.Fonts.FontFamily.semiBold,
    color: constant.Colors.primary,
    textAlign: "left",
  },
  style: {
    marginLeft: 10,
    marginRight: 10,
  },
});

export default ProfileDetailScreen;
