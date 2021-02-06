import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import constant from '../../Constants/constant';
import CustomButton from '../../Components/UI/Button';
import RazorpayCheckout from 'react-native-razorpay';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
const PaymentModal = (props) => {
  const [APIToken, setAPIToken] = useState('');

  return (
    <View style={styles.modelBackground}>
      <TouchableOpacity
        onPress={() => {
          // fetch('https://api.razorpay.com/v1/orders', {
          //   method: 'POST',
          //   headers: {
          //     Accept: 'application/json',
          //     'Content-Type': 'application/json',
          //     Authorization:
          //       'Basic rzp_test_thmt08pcfahm3fpsXnvOn3JNRiiYezOGnAVXdW',
          //   },
          //   body: JSON.stringify({
          //     amount: 10000,
          //     currency: 'INR',
          //     receipt: 'Receipt no. 1',
          //     payment_capture: 1,
          //     notes: {
          //       notes_key_1: 'Tea, Earl Grey, Hot',
          //       notes_key_2: 'Tea, Earl Grey… decaf.',
          //     },
          //   }),
          // })
          //   .then((resp) => resp.json())
          //   .then((res) => console.log(res));
          var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_thmt08pcfahm3f',
            amount: '5000',
            name: 'Matka 360',
            order_id: 'order_GK5nBDoTGxquP5', //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
            prefill: {
              email: 'gaurav.kumar@example.com',
              contact: '9191919191',
              name: 'Gaurav Kumar',
            },
            theme: {color: '#53a20e'},
          };
          RazorpayCheckout.open(options)
            .then((data) => {
              console.log(data);
              alert(`Success: ${data.razorpay_payment_id}`);
            })
            .catch((error) => {
              // handle failure
              alert(`Error: ${error.code} | ${error.description}`);
            });
        }}>
        <View style={styles.buttonView}>
          <Text style={styles.keyText}>Razor Pay</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color="black"
            style={{position: 'absolute', right: 20}}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonView}>
        <Text style={styles.keyText}>Net Banking</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color="black"
          style={{position: 'absolute', right: 20}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log('hey')}
        style={styles.buttonView}>
        <Text style={styles.keyText}>Paytm & Wallets</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color="black"
          style={{position: 'absolute', right: 20}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{marginVertical: 20}}>
        <Text style={{fontSize: 18, color: 'red'}}>Cancel Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customButton: {
    height: 50,
    width: '90%',
    marginTop: 20,
  },
  buttonView: {
    height: 60,
    width: Dimensions.get('screen').width,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  keyText: {
    color: 'black',
    fontSize: 18,
    fontFamily: constant.Fonts.FontFamily.regular,
    marginHorizontal: 30,
  },
  modelBackground: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  iconStyle: {
    width: 60,
    height: 60,
    marginVertical: 5,
    marginBottom: 0,
  },
});
export const screenOptions = (navData) => {
  return {
    headerTitle: 'PAYMENT',
    headerBackTitleVisible: false,
    headerTintColor: 'black',
  };
};
export default PaymentModal;
