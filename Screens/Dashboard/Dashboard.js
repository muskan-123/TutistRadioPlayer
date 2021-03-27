import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  BackHandler,
  Dimensions,
} from 'react-native';
import Channels from '../Profile/Channels';
import Wallet from '../Wallet/Wallet';
import Radio from './Radio';
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import constant from '../../Constants/constant';

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
  const bottomView = (props) => {
    return (
      <View style={styles.bottomContainer}>
        <TouchableWithoutFeedback onPress={() => setSelectedTab('Channels')}>
          <View style={styles.bottomView}>
            <FontAwesome5 name="user-alt" size={20} color="grey" />
            <Text style={styles.bottomText}>{'Channels'}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setSelectedTab('Radio')}>
          <View style={styles.bottomView}>
            <MaterialCommunityIcons name="history" size={22} color="grey" />
            <Text style={styles.bottomText}>{'Radio'}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setSelectedTab('Wallet')}>
          <View style={styles.bottomView}>
            <MaterialCommunityIcons name="wallet" size={22} color="grey" />
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
