import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//****** Here We Import All Screen Components ******
import LoginScreen, {
  screenOptions as LoginScreenOptions,
} from "../Screens/Auth/Login.js";
import VerifyOtp, {
  screenOptions as VerifyOtpOptions,
} from "../Screens/Auth/VerifyOtp.js";
import NotificationScreen, {
  screenOptions as NotificationScreenOptions,
} from "../Screens/Dashboard/NotificationScreen";
import RecoverCredentials, {
  screenOptions as RecoverCredentialsOptions,
} from "../Screens/Auth/RecoverCredenttials.js";
import GameDashboard, {
  screenOptions as GameDashboardOptions,
} from "../Screens/Dashboard/GameDashboard";
import AllGamesDashboard, {
  screenOptions as AllGamesDashboardOptions,
} from "../Screens/Dashboard/AllGamesDashboard";
import LoginWithMPIN, {
  screenOptions as LoginWithMPINOptions,
} from "../Screens/Auth/LoginWithMPIN.js";
import GenerateMpin, {
  screenOptions as GenerateMpinOptions,
} from "../Screens/Profile/GenerateMpin";
import playScreen, {
  screenOptions as UpdateMpinOptions,
} from "../Screens/Profile/playScreen";
import WalletScreen, {
  screenOptions as WalletOptions,
} from "../Screens/Wallet/Wallet.js";
import FundRequestScreen, {
  screenOptions as FundRequestOptions,
} from "../Screens/Common/FundRequestHistory.js";
import WinningHistoryScreen, {
  screenOptions as WinningHistoryOptions,
} from "../Screens/Wallet/winnigHistory.js";
import AddFundsScreen, {
  screenOptions as AddFundsOptions,
} from "../Screens/Wallet/AddFunds.js";
import WithdrawScreen, {
  screenOptions as WithdrawOptions,
} from "../Screens/Wallet/Withdraw.js";
import EvenOddGame, {
  screenOptions as EvenOddGameOptions,
} from "../Screens/Dashboard/EvenOddGame";
import FigureGame, {
  screenOptions as FigureGameOptions,
} from "../Screens/Dashboard/FigureGame";
import JodiGame, {
  screenOptions as JodiGameOptions,
} from "../Screens/Dashboard/JodiGame";
import DoublePanna, {
  screenOptions as DoublePannaOptions,
} from "../Screens/Dashboard/DoublePanna";
import TriplePanna, {
  screenOptions as TriplePannaOptions,
} from "../Screens/Dashboard/TriplePanna";
import ChoicePanna, {
  screenOptions as ChoicePannaOptions,
} from "../Screens/Dashboard/ChoicePanna";
import SinglePanna, {
  screenOptions as SinglePannaOptions,
} from "../Screens/Dashboard/SinglePanna";
import SPMotor, {
  screenOptions as SPMotorOptions,
} from "../Screens/Dashboard/SPMotor";
import DPMotor, {
  screenOptions as DPMotorOptions,
} from "../Screens/Dashboard/DPMotor";
import HalfSangam, {
  screenOptions as HalfSangamOptions,
} from "../Screens/Dashboard/HalfSangam";
import GroupJodi, {
  screenOptions as GroupJodiOptions,
} from "../Screens/Dashboard/GroupJodi";
import RedBracket, {
  screenOptions as RedBracketOptions,
} from "../Screens/Dashboard/RedBracket";
import PanelGroup, {
  screenOptions as PanelGroupOptions,
} from "../Screens/Dashboard/PanelGroup";
import FullSangam, {
  screenOptions as FullSangamOptions,
} from "../Screens/Dashboard/FullSangam";
import DigitBasedGame, {
  screenOptions as DigitBasedGameOptions,
} from "../Screens/Dashboard/DigitBasedGame";
import ChoicePannaGame, {
  screenOptions as ChoicePannaGameOptions,
} from "../Screens/Dashboard/ChoicePannaGame";
import TwoDigitPanelGame, {
  screenOptions as TwoDigitPanelGameOptions,
} from "../Screens/Dashboard/TwoDigitPanelGame";
import SPDPTPGame, {
  screenOptions as SPDPTPGameOptions,
} from "../Screens/Dashboard/SPDPTPGame";
import ProfileScreen, {
  screenOptions as ProfileOptions,
} from "../Screens/Profile/Profile.js";
import ProfileSettingScreen, {
  screenOptions as ProfileSettingOptions,
} from "../Screens/Profile/ProfileSetting.js";
import AccountStatement, {
  screenOptions as AccountStatementOptions,
} from "../Screens/Profile/AccountStatement.js";
import HistoryScreen, {
  screenOptions as HistoryOptions,
} from "../Screens/History/History.js";
import BidHistoryScreen, {
  screenOptions as BidHistoryOptions,
} from "../Screens/History/BidHistory.js";
import BidAmountScreen, {
  screenOptions as BidAmountOptions,
} from "../Screens/History/BidAmountScreen.js";
import TransactionHistory, {
  screenOptions as TransactionHistoryOptions,
} from "../Screens/History/TransactionHistory.js";
import DashboardScreen, {
  screenOptions as DashboardOptions,
} from "../Screens/Dashboard/Dashboard.js";
import ProfileDetailScreen, {
  screenOptions as ProfileDetailOptions,
} from "../Screens/Profile/ProfileDetail.js";
import StartSplashScreen, {
  screenOptions as StartSplashOptions,
} from "../Screens/StartSplash/startSplash.js";
import SignupScreen, {
  screenOptions as SignupOptions,
} from "../Screens/SignUp/signup.js";
import Constants from "../Constants/constant";
import constant from "../Constants/constant";

const defaultNavigationOption = {
  headerStyle: {
    backgroundColor: Constants.Colors.primary,
  },
  headerLeftContainerStyle: {
    marginLeft: 10,
  },
  headerRightContainerStyle: {
    marginRight: 10,
  },
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: Constants.Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: Constants.Fonts.FontFamily.semiBold,
    fontSize: Constants.Fonts.Size.headerTitle,
    textTransform: "uppercase",
  },
  headerBackTitleStyle: {
    fontFamily: Constants.Fonts.FontFamily.regular,
  },
  headerTintColor: "white",
};

const authNavigatorStack = createStackNavigator();

const SignUpNavigatorStack = createStackNavigator();
export const SignUpNavigator = () => {
  return (
    <SignUpNavigatorStack.Navigator
      screenOptions={defaultNavigationOption}
    ></SignUpNavigatorStack.Navigator>
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
        props.isLogin
          ? constant.Navigation.dashboard
          : constant.Navigation.startSplash
      }
    >
      <StartSplashNavigatorStack.Screen
        name={constant.Navigation.startSplash}
        component={StartSplashScreen}
        options={StartSplashOptions}
      />
      <StartSplashNavigatorStack.Screen
        name={constant.Navigation.login}
        component={LoginScreen}
        options={LoginScreenOptions}
      />
      <StartSplashNavigatorStack.Screen
        name={constant.Navigation.verifyOtp}
        component={VerifyOtp}
        options={VerifyOtpOptions}
      />
      <StartSplashNavigatorStack.Screen
        name={Constants.Navigation.loginWithMPIN}
        component={LoginWithMPIN}
        options={LoginWithMPINOptions}
      />
      <authNavigatorStack.Screen
        name={Constants.Navigation.recoverCredentials}
        component={RecoverCredentials}
        options={RecoverCredentialsOptions}
      />
      <SignUpNavigatorStack.Screen
        name={Constants.Navigation.signUp}
        component={SignupScreen}
        options={SignupOptions}
      />
      <DashboardNavigatorStack.Screen
        name={Constants.Navigation.dashboard}
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <DashboardNavigatorStack.Screen
        name={Constants.Navigation.AllGamesDashboard}
        component={AllGamesDashboard}
        options={AllGamesDashboardOptions}
      />
      <DashboardNavigatorStack.Screen
        name={Constants.Navigation.GameDashboard}
        component={GameDashboard}
        options={GameDashboardOptions}
      />
      <DashboardNavigatorStack.Screen
        name={Constants.Navigation.figureGame}
        component={FigureGame}
        options={FigureGameOptions}
      />
      <DashboardNavigatorStack.Screen
        name={"JodiGame"}
        component={JodiGame}
        options={JodiGameOptions}
      />
      <DashboardNavigatorStack.Screen
        name={"SinglePanna"}
        component={SinglePanna}
        options={SinglePannaOptions}
      />
      <DashboardNavigatorStack.Screen
        name={"DoublePanna"}
        component={DoublePanna}
        options={DoublePannaOptions}
      />
      <DashboardNavigatorStack.Screen
        name={"TriplePanna"}
        component={TriplePanna}
        options={TriplePannaOptions}
      />
      <DashboardNavigatorStack.Screen
        name={"ChoicePana"}
        component={ChoicePanna}
        options={ChoicePannaOptions}
      />
      <DashboardNavigatorStack.Screen
        name={"SPMotor"}
        component={SPMotor}
        options={SPMotorOptions}
      />
      <DashboardNavigatorStack.Screen
        name={"DPMotor"}
        component={DPMotor}
        options={DPMotorOptions}
      />
      <DashboardNavigatorStack.Screen
        name={"RedBracket"}
        component={RedBracket}
        options={RedBracketOptions}
      />
      <DashboardNavigatorStack.Screen
        name={"PanelGroup"}
        component={PanelGroup}
        options={PanelGroupOptions}
      />
      <DashboardNavigatorStack.Screen
        name={"HalfSangam"}
        component={HalfSangam}
        options={HalfSangamOptions}
      />
      <DashboardNavigatorStack.Screen
        name={"FullSangam"}
        component={FullSangam}
        options={FullSangamOptions}
      />
      <DashboardNavigatorStack.Screen
        name={"GroupJodi"}
        component={GroupJodi}
        options={GroupJodiOptions}
      />
      <DashboardNavigatorStack.Screen
        name={Constants.Navigation.evenoddgame}
        component={EvenOddGame}
        options={EvenOddGameOptions}
      />
      <DashboardNavigatorStack.Screen
        name={Constants.Navigation.digitBasedGame}
        component={DigitBasedGame}
        options={DigitBasedGameOptions}
      />
      <DashboardNavigatorStack.Screen
        name={Constants.Navigation.choicePannaGame}
        component={ChoicePannaGame}
        options={ChoicePannaGameOptions}
      />
      <DashboardNavigatorStack.Screen
        name={Constants.Navigation.twoDigitPanelGameOptions}
        component={TwoDigitPanelGame}
        options={TwoDigitPanelGameOptions}
      />
      <DashboardNavigatorStack.Screen
        name={Constants.Navigation.SPDPTPGame}
        component={SPDPTPGame}
        options={SPDPTPGameOptions}
      />
      <DashboardNavigatorStack.Screen
        name={Constants.Navigation.notification}
        component={NotificationScreen}
        options={NotificationScreenOptions}
      />
      {/* Profile Flow Screens*/}
      <ProfileNavigatorStack.Screen
        name={Constants.Navigation.profile}
        component={ProfileScreen}
        options={ProfileOptions}
      />
      <ProfileNavigatorStack.Screen
        name={Constants.Navigation.profileDetail}
        component={ProfileDetailScreen}
        options={ProfileDetailOptions}
      />
      <ProfileNavigatorStack.Screen
        name={Constants.Navigation.profileSetting}
        component={ProfileSettingScreen}
        options={ProfileSettingOptions}
      />
      <ProfileNavigatorStack.Screen
        name={Constants.Navigation.generatempin}
        component={GenerateMpin}
        options={GenerateMpinOptions}
      />
      <ProfileNavigatorStack.Screen
        name={Constants.Navigation.howtoplay}
        component={playScreen}
        options={UpdateMpinOptions}
      />
      <ProfileNavigatorStack.Screen
        name={Constants.Navigation.accountStatement}
        component={AccountStatement}
        options={AccountStatementOptions}
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
        name={"TransactionHistory"}
        component={TransactionHistory}
        options={TransactionHistoryOptions}
      />
    </DashboardNavigatorStack.Navigator>
  );
};
