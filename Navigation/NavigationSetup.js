import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//****** Here We Import All Screen Components ******
import LoginScreen, {
  screenOptions as LoginScreenOptions,
} from '../Screens/Auth/Login.js';
import VerifyOtp, {
  screenOptions as VerifyOtpOptions,
} from '../Screens/Auth/VerifyOtp.js';

import GameDashboard, {
  screenOptions as GameDashboardOptions,
} from '../Screens/Dashboard/GameDashboard';

import WalletScreen, {
  screenOptions as WalletOptions,
} from '../Screens/Wallet/Wallet.js';
import FundRequestScreen, {
  screenOptions as FundRequestOptions,
} from '../Screens/Common/FundRequestHistory.js';
import WinningHistoryScreen, {
  screenOptions as WinningHistoryOptions,
} from '../Screens/Wallet/winnigHistory.js';
import AddFundsScreen, {
  screenOptions as AddFundsOptions,
} from '../Screens/Wallet/AddFunds.js';
import PaymentModal, {
  screenOptions as PaymentModalOptions,
} from '../Screens/Wallet/PaymentModal';
import WithdrawScreen, {
  screenOptions as WithdrawOptions,
} from '../Screens/Wallet/Withdraw.js';

import Channels, {
  screenOptions as ProfileOptions,
} from '../Screens/Profile/Channels.js';

import HistoryScreen, {
  screenOptions as HistoryOptions,
} from '../Screens/History/History.js';
import BidHistoryScreen, {
  screenOptions as BidHistoryOptions,
} from '../Screens/History/BidHistory.js';
import BidAmountScreen, {
  screenOptions as BidAmountOptions,
} from '../Screens/History/BidAmountScreen.js';
import TransactionHistory, {
  screenOptions as TransactionHistoryOptions,
} from '../Screens/History/TransactionHistory.js';
import DashboardScreen, {
  screenOptions as DashboardOptions,
} from '../Screens/Dashboard/Dashboard.js';

import Constants from '../Constants/constant';
import constant from '../Constants/constant';

const defaultNavigationOption = {
  headerStyle: {
    backgroundColor: 'white',
  },
  headerLeftContainerStyle: {
    marginLeft: 10,
  },
  headerRightContainerStyle: {
    marginRight: 10,
  },
  headerBackTitleVisible: false,

  headerTitleStyle: {
    fontFamily: Constants.Fonts.FontFamily.semiBold,
    fontSize: Constants.Fonts.Size.headerTitle,
    textTransform: 'uppercase',
    color: 'black',
  },
  headerBackTitleStyle: {
    fontFamily: Constants.Fonts.FontFamily.regular,
  },
  headerTintColor: 'white',
};

const authNavigatorStack = createStackNavigator();

const SignUpNavigatorStack = createStackNavigator();
export const SignUpNavigator = () => {
  return (
    <SignUpNavigatorStack.Navigator
      screenOptions={defaultNavigationOption}></SignUpNavigatorStack.Navigator>
  );
};

const StartSplashNavigatorStack = createStackNavigator();
const HistoryNavigatorStack = createStackNavigator();
const WalletNavigatorStack = createStackNavigator();
const ProfileNavigatorStack = createStackNavigator();

const DashboardNavigatorStack = createStackNavigator();
export const DashboardNavigator = (props) => {
  return (
    <DashboardNavigatorStack.Navigator
      screenOptions={defaultNavigationOption}
      initialRouteName={
        // props.isLogin
        //   ? constant.Navigation.dashboard
        constant.Navigation.dashboard
      }>
      {/* <StartSplashNavigatorStack.Screen
        name={constant.Navigation.login}
        component={LoginScreen}
        options={LoginScreenOptions}
      /> */}

      <DashboardNavigatorStack.Screen
        name={Constants.Navigation.dashboard}
        component={DashboardScreen}
        options={{headerShown: false}}
      />

      <DashboardNavigatorStack.Screen
        name={Constants.Navigation.GameDashboard}
        component={GameDashboard}
        options={GameDashboardOptions}
      />

      {/* Profile Flow Screens*/}
      <ProfileNavigatorStack.Screen
        name={Constants.Navigation.profile}
        component={Channels}
        options={ProfileOptions}
      />

      {/* Wallet Flow Screens*/}
      <WalletNavigatorStack.Screen
        name={Constants.Navigation.wallet}
        component={WalletScreen}
        options={WalletOptions}
      />
      <WalletNavigatorStack.Screen
        name={Constants.Navigation.fundRequest}
        component={FundRequestScreen}
        options={FundRequestOptions}
      />
      <WalletNavigatorStack.Screen
        name={Constants.Navigation.winningHistory}
        component={WinningHistoryScreen}
        options={WinningHistoryOptions}
      />
      <WalletNavigatorStack.Screen
        name={Constants.Navigation.addFunds}
        component={AddFundsScreen}
        options={AddFundsOptions}
      />
      <WalletNavigatorStack.Screen
        name={'paymentmodal'}
        component={PaymentModal}
        options={PaymentModalOptions}
      />
      <WalletNavigatorStack.Screen
        name={Constants.Navigation.withdraw}
        component={WithdrawScreen}
        options={WithdrawOptions}
      />
      {/* History Flow Screens*/}
      <HistoryNavigatorStack.Screen
        name={Constants.Navigation.history}
        component={HistoryScreen}
        options={HistoryOptions}
      />
      <HistoryNavigatorStack.Screen
        name={Constants.Navigation.bidHistory}
        component={BidHistoryScreen}
        options={BidHistoryOptions}
      />
      <HistoryNavigatorStack.Screen
        name={Constants.Navigation.bidAmount}
        component={BidAmountScreen}
        options={BidAmountOptions}
      />
      <HistoryNavigatorStack.Screen
        name={'TransactionHistory'}
        component={TransactionHistory}
        options={TransactionHistoryOptions}
      />
    </DashboardNavigatorStack.Navigator>
  );
};
