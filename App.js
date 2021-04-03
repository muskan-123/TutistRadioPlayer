import React, {useState, useEffect, Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-community/async-storage';
import Navigation from './Navigation/Navigation';
export default class App extends Component {
  render() {
    return <Navigation />;
  }
}
