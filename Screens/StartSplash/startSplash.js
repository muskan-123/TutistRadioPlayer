import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import TopView from '../Auth/TopView';
import CustomButton from '../../Components/UI/Button';
import constant from '../../Constants/constant';
import RazorpayCheckout from 'react-native-razorpay';
const StartSplashScreen = (props) => {
  function onPress() {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_thmt08pcfahm3f',
      amount: '5000',
      name: 'Acme Corp',
      order_id: 'order_DslnoIgkIDL8Zt', //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar',
      },
      theme: {color: '#53a20e'},
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  }
  const createView = () => {
    return (
      <View>
        <TopView
          isTextRequired={false}
          Container={{padding: Dimensions.get('window').height / 9}}
          logoStyle={{width: Dimensions.get('window').height / 3}}
        />
        <View style={styles.customBtnContainer}>
          <CustomButton
            title={constant.Strings.login + ' '}
            onPress={() => {
              props.navigation.push(constant.Navigation.login);
            }}
          />
          {/* props.navigation.push(constant.Navigation.login) */}
          {/* <CustomButton
            title={"   CREATE A NEW ACCOUNT    "}
            onPress={() => props.navigation.push(constant.Navigation.signUp)}
            textStyle={{ color: "black" }}
          /> */}
        </View>
      </View>
    );
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <ScrollView>{createView()}</ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: null,
    headerBackTitleVisible: false,
    headerLeft: () => (
      <View style={styles.leftHeaderView}>
        <Image
          style={{width: 17, height: 17}}
          source={require('../../assets/whatsapp.png')}
        />
        <Text style={styles.contact} onPress={() => {}}>
          {constant.ServiceProvider.contact}
        </Text>
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  customBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  TextView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  btmButtonText: {
    textAlign: 'center',
    fontFamily: constant.Fonts.FontFamily.regular,
    fontSize: constant.Fonts.Size.Title,
  },
  contact: {
    color: 'black',
    fontFamily: constant.Fonts.FontFamily.bold,
    fontSize: constant.Fonts.Size.Title,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  leftHeaderView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  customBtnStyle: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: constant.Colors.grey,
  },
});

export default StartSplashScreen;
