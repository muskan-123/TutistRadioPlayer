import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Components/UI/Loader';
import TopView from '../Auth/TopView';
import CustomButton from '../../Components/UI/Button';
import constant from '../../Constants/constant';
import TextField from '../../Components/UI/TextField';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PaymentModal from './PaymentModal';
const amounts = [1000, 2000, 3000, 4000];
const StartSplashScreen = (props) => {
  const [APIToken, setAPIToken] = useState('');
  const [amount, setAmount] = useState();
  const [showLoader, setLoader] = useState(false);
  const [addAmount, setAddAmount] = useState(false);
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    getAPIToken();
  }, []);

  getAPIToken = async () => {
    try {
      AsyncStorage.getItem('device_token').then((APIToken) => {
        setAPIToken(APIToken);
      });
    } catch (error) {}
  };
  const submitAmount = (item, index) => {
    setAmount(item);
  };
  const submitBtnHandler = () => {
    setVisible(true);
    // if (amount >= 100) {
    //   WalletAPIManager.withdrawRequest(amount, 'DEPOSIT', APIToken).then(
    //     (res) => {
    //       console.log(res);
    //       setLoader(false);
    //       if (res.status) {
    //         setAmount(' ');
    //         ToastAndroid.show(res.message, 5);
    //       } else {
    //         ToastAndroid.show(res.message, 5);
    //       }
    //     },
    //   );
    // } else {
    //   setLoader(false);
    //   ToastAndroid.show('Amount should at least be 100', 5);
    // }
  };
  const walletview = () => {
    return (
      <View style={styles.walletview}>
        <View style={styles.subWalletview}>
          <Text style={styles.textStyle}>Wallet Balance</Text>
          <Text style={[styles.textStyle, {fontSize: 18}]}>{'₹509'}</Text>
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: constant.Colors.primary,
            marginVertical: 10,
          }}></View>
        <View style={styles.subWalletview}>
          <Text style={styles.textStyle}>Reserved Balance</Text>
          <Text style={[styles.textStyle, {fontSize: 18}]}>{'₹'}</Text>
        </View>
      </View>
    );
  };
  const flatlistView = () => {
    return (
      <View
        style={[
          styles.walletview,
          {
            justifyContent: 'center',
            alignItems: 'center',
            height: null,
            borderWidth: 0,
          },
        ]}>
        {amounts.map((item, index) => (
          <TouchableOpacity
            style={styles.capsuleView}
            onPress={() => submitAmount(item, index)}>
            <Text style={[styles.textStyle, {fontSize: 18}]}>{'+' + item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const createView = () => {
    return (
      <View>
        <TopView
          isTextRequired={false}
          Container={{padding: Dimensions.get('window').height / 5.5}}
          logoStyle={{
            width: Dimensions.get('window').height / 4.5,
            position: 'absolute',
            bottom: 55,
          }}
        />
        {walletview()}

        <View style={styles.customBtnContainer}>
          <TextField
            id="username"
            placeholder={constant.Strings.TextFieldPlaceholder.addfunds}
            returnKeyType={'done'}
            required={true}
            value={amount ? String(amount) : ''}
            defaultValue={amount}
            keyboardType={'numeric'}
            onSubmitEditing={submitBtnHandler}
            icon={
              <MaterialCommunityIcons
                name="wallet-outline"
                size={24}
                color={constant.Colors.primary}
              />
            }
            onChangeText={(amount) => setAmount(amount)}
            errorTitle={constant.Strings.emptyUserName}
          />
        </View>
        {flatlistView()}
        <View style={styles.TextView}>
          <CustomButton
            title={constant.Strings.sendAddReq}
            onPress={() => props.navigation.push('paymentmodal')}
          />
        </View>
      </View>
    );
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <ScrollView>{createView()}</ScrollView>
        {showLoader && <Loader />}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'ADD FUNDS',
    headerBackTitleVisible: false,
    headerTintColor: 'black',
  };
};

const styles = StyleSheet.create({
  customBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  btmButtonText: {
    textAlign: 'center',
    fontFamily: constant.Fonts.FontFamily.regular,
    fontSize: constant.Fonts.Size.Title,
  },
  contact: {
    color: 'white',
    fontFamily: constant.Fonts.FontFamily.bold,
    fontSize: constant.Fonts.Size.Title,
    marginLeft: 5,
  },
  TextView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  walletview: {
    flex: 1,
    height: 80,
    backgroundColor: 'black',
    margin: 20,
    flexDirection: 'row',
    borderColor: constant.Colors.primary,
    borderWidth: 0.4,
  },
  subWalletview: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {color: constant.Colors.primary, fontSize: 20},
  capsuleView: {
    borderColor: constant.Colors.primary,
    borderWidth: 0.7,
    borderRadius: 15,
    width: 80,
    height: 30,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});

export default StartSplashScreen;
