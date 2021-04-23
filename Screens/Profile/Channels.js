import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import constant from '../../Constants/constant';
import Cart from '../../Components/UI/CartItem';
import CartList from '../../Components/UI/Cart';
import {ProfileArray} from '../../Model/ModelData';

const Channels = (props) => {
  // const cartSelectionHandler = (id) => {
  //   var navigationScreen;
  //   var params;
  //   switch (id) {
  //     case 0:
  //       navigationScreen = constant.Navigation.profileDetail;
  //       break;
  //     case 1:
  //       navigationScreen = constant.Navigation.generatempin;
  //       break;
  //     case 2:
  //       navigationScreen = constant.Navigation.profileSetting;
  //       break;
  //     case 3:
  //       navigationScreen = constant.Navigation.notification;
  //       params = {
  //         title: 'How to Play',
  //       };
  //       break;
  //     case 4:
  //       navigationScreen = constant.Navigation.notification;
  //       params = {
  //         title: 'Game Rates',
  //       };
  //       break;
  //     case 5:
  //       navigationScreen = constant.Navigation.notification;
  //       params = {
  //         title: 'Notice Board / Rules',
  //       };
  //       break;
  //     case 6:
  //       navigationScreen = constant.Navigation.accountStatement;
  //       params = {
  //         title: 'Account Statement',
  //       };
  //       break;
  //     case 7:
  //       setLoader(true);
  //       APIResource.logoutUser(fcmToken, APIToken).then((res) => {
  //         if (res.status === 'success') {
  //           setLoader(false);
  //           props.navigation.navigate('Start Splash');
  //           ToastAndroid.show(res.message, 5);
  //           console.log(res);
  //         } else {
  //           setLoader(false);

  //           ToastAndroid.show(res.message, 5);
  //         }
  //       });

  //       break;
  //   }

  //   if (navigationScreen !== undefined) {
  //     props.navigation.navigate(navigationScreen, params);
  //   }
  // };

  // const renderList = (Item) => {
  //   return (

  //   );
  // };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={props.channelList}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => (
          <Pressable
            onPress = {() => {
              props.setChannel(index);
              props.setTab('Radio');
            }}
            style={{
              height: 250,
              backgroundColor: 'white',
              marginVertical: 10,
              borderRadius: 5,
              marginHorizontal: 10,
              borderWidth: 1,
              borderColor: '#ccc'
            }}>
            <View style={{height: '80%', borderRadius: 5}}>
              <Image
                source={{uri: item.image}}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
              />
            </View>

            <View
              style={{
                height: '20%',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
                flex: 1
              }}>
              <Text style={{color: 'black',textAlign:'center'}}>{item.name}</Text>
              <Image
                source={require('../assets/play_button.png')}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                  position: "absolute",
                  right: 12
                }}
                resizeMode="cover"
              />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'CHANNELS',
    headerTintColor: 'black',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 50,
  },
  leftHeaderView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Dimensions.get('window').width / 3,
  },
  contact: {
    color: 'white',
    fontFamily: constant.Fonts.FontFamily.bold,
    fontSize: constant.Fonts.Size.Title,
    marginLeft: 5,
  },
  icon: {
    height: 43,
    width: 43,
  },
  topContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 25,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: constant.Fonts.FontFamily.semiBold,
    color: 'black',
    textAlign: 'left',
    fontWeight: '600',
  },
  style: {
    marginVertical: 12,
    borderRadius: 12,
    backgroundColor: constant.Colors.primary,
  },
});

export default Channels;
