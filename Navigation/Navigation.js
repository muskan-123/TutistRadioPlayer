import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  DashboardNavigator,
  StartSplashNavigator,
} from "../Navigation/NavigationSetup";

const Navigation = (props) => {
  //console.log(props);
  return (
    <NavigationContainer>
      {<DashboardNavigator isLogin={props.isLogin} />}
    </NavigationContainer>
  );
};
export default Navigation;
