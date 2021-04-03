import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  BackHandler,
  Dimensions,
  Image,
} from 'react-native';
import Channels from '../Profile/Channels';
import Wallet from '../Wallet/Wallet';
import Radio from './Radio';
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import constant from '../../Constants/constant';
import {Header} from 'react-native/Libraries/NewAppScreen';

const DashboardScreen = (props) => {
  const [selectedTab, setSelectedTab] = useState('Radio');
  const flatlistView = (props) => {
    return (
      <View style={styles.flatlistContainer}>
        {selectedTab == 'Radio' ? (
          <Radio />
        ) : selectedTab == 'Channels' ? (
          <Channels />
        ) : (
          <Wallet />
        )}
      </View>
    );
  };
  const Header = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',

          shadowColor: 'grey',
          shadowOpacity: 2,
          shadowOpacity: 0.7,
          elevation: 4,
        }}>
        <Text style={{fontSize: 20, color: constant.Colors.primary}}>
          {selectedTab == 'Radio'
            ? 'RADIO'
            : selectedTab == 'Channels'
            ? 'CHANNELS'
            : 'SETTINGS'}
        </Text>
      </View>
    );
  };
  const bottomView = (props) => {
    return (
      <View style={styles.bottomContainer}>
        <TouchableWithoutFeedback onPress={() => setSelectedTab('Channels')}>
          <View style={styles.bottomView}>
            <Image
              source={require('../assets/channel.png')}
              style={[
                styles.imageStyle,
                {
                  tintColor:
                    selectedTab == 'Channels'
                      ? constant.Colors.primary
                      : 'black',
                },
              ]}
            />
            <Text style={styles.bottomText}>{'Channels'}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setSelectedTab('Radio')}>
          <View style={styles.bottomView}>
            <Image
              source={require('../assets/radio.png')}
              style={[
                styles.imageStyle,
                {
                  tintColor:
                    selectedTab == 'Radio' ? constant.Colors.primary : 'black',
                },
              ]}
            />
            <Text style={styles.bottomText}>{'Radio'}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setSelectedTab('Wallet')}>
          <View style={styles.bottomView}>
            <Image
              source={require('../assets/settings.png')}
              style={[
                styles.imageStyle,
                {
                  tintColor:
                    selectedTab == 'Wallet' ? constant.Colors.primary : 'black',
                },
              ]}
            />
            <Text style={styles.bottomText}>{'Settings'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);
  return (
    <View style={styles.container}>
      {Header(props)}
      {flatlistView(props)}
      {bottomView(props)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistContainer: {
    flex: 1,

    height: Dimensions.get('screen').height,
    backgroundColor: 'white',
  },
  imageStyle: {height: 20, width: 20},
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    elevation: 30,
    borderColor: 'lightgrey',
    borderWidth: 0.5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bottomView: {
    alignItems: 'center',
  },
  bottomText: {
    marginTop: 3,
    color: 'black',
    fontSize: 14,
    fontFamily: constant.Fonts.FontFamily.bold,
    marginLeft: 5,
  },
});

export default DashboardScreen;
