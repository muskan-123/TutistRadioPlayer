import React, {useEffect} from 'react';
import {Image, Dimensions, ImageBackground, StatusBar} from 'react-native';
import constant from '../../Constants/constant';
const {width, height} = Dimensions.get('window');

export default SplashScreen = ({navigation}) => {
  useEffect(() =>
    setTimeout(() => {
      navigation.navigate(constant.Navigation.dashboard);
    }, 10000),
  );
  return (
    <ImageBackground
      source={require('../assets/splash_bg.jpeg')}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* <View style = {{flex: 1}}></View> */}
      <StatusBar hidden />
      <Image 
            source={require('../assets/splash.png')} 
            style = {{height: 300, width: 300, resizeMode: 'contain'}} 
        />
      {/* <View style = {{flex: 1}}></View> */}
    </ImageBackground>
  );
};
