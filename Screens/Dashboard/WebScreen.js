import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  BackHandler,
  Dimensions,
  Image,
  SafeAreaView,
  Pressable,
} from 'react-native';
import Channels from '../Profile/Channels';
import Wallet from '../Wallet/Wallet';
import Radio from './Radio';
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import constant from '../../Constants/constant';
import {Header} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {WebView} from 'react-native-webview';

export default WebScreen = ({navigation, route}) => {
  console.log(route);
  return (
    <>
      <SafeAreaView
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
          // shadowColor: 'grey',
          // shadowOpacity: 2,
          // shadowOpacity: 0.7,
          // elevation: 4,
        }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            left: 5,
          }}>
          <Icon color="black" name="arrow-back" size={25} />
        </Pressable>
        <Text
          style={{
            fontSize: 20,
            color: constant.Colors.primary,
            alignSelf: 'center',
          }}>
          {route.params.title}
        </Text>
      </SafeAreaView>
      <WebView source={{ uri: route.params.url}} />
    </>
  );
};
