import React from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';

import constant from '../../Constants/constant';
import Cart from '../../Components/UI/CartItem';
import {walletArray} from '../../Model/ModelData';

const WalletScreen = (props) => {
  const cartSelectionHandler = (id) => {
    let navigationScreen;
    switch (id) {
      case 0:
        navigationScreen = constant.Navigation.withdraw;
        break;
      case 1:
        navigationScreen = constant.Navigation.addFunds;
        break;
      case 2:
        navigationScreen = constant.Navigation.fundRequest;
        break;
      case 3:
        navigationScreen = constant.Navigation.winningHistory;
        break;
    }
    console.log('Hello i am here***************', navigationScreen, id);
    props.navigation.navigate(navigationScreen);
  };

  const renderList = (Item) => {
    console.log('Item is', Item);
    return (
      <Cart
        icon={Item.item.icon}
        title={Item.item.title}
        selectHandler={cartSelectionHandler.bind(this, Item.item.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={walletArray}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderList}
        contentContainerStyle={styles.flatlist}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'SETTINGS',
    headerTintColor: 'black',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatlist: {
    flex: 1,

    marginTop: 10,
  },
  leftHeaderView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Dimensions.get('window').width / 3,
  },
  contact: {
    color: 'orange',
    fontFamily: constant.Fonts.FontFamily.bold,
    fontSize: constant.Fonts.Size.Title,
    marginLeft: 5,
  },
});

export default WalletScreen;
