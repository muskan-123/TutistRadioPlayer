import DeviceInfo from "react-native-device-info";
import { APIResource, ProfileAPIManager } from "../../APIManager";
import { ToastAndroid } from "react-native";
export default class ProfileHelper {
  static profileDataHandle(id, value1, value2, value3, fullName, APIToken) {
    switch (id) {
      case 0:
        console.log("tokennnn" + APIToken);
        ProfileAPIManager.updateProfile(
          value1,
          value2,
          value3,
          fullName,
          APIToken
        ).then((res) => {
          if (res.status === "success") {
            ToastAndroid.show(res.message, 5);
            return true;
          } else {
            ToastAndroid.show(res.message, 5);
            return false;
          }
        });
        break;
      case 1:
        ProfileAPIManager.updateAccountNo(
          fullName,
          value1,
          value2,
          value3,
          APIToken
        ).then((res) => {
          if (res.status === "success") {
            ToastAndroid.show(res.message, 5);
            return true;
          } else {
            ToastAndroid.show(res.message, 15);
            return false;
          }
        });

        break;
      case 2:
        ProfileAPIManager.updatePayTmNumber(value1, APIToken).then((res) => {
          if (res.status === "success") {
            ToastAndroid.show(res.message, 5);
            return true;
          } else {
            ToastAndroid.show(res.message, 5);
            return false;
          }
        });
        break;
      case 3:
        ProfileAPIManager.updateGooglePayNumber(value1, APIToken).then(
          (res) => {
            if (res.status === "success") {
              ToastAndroid.show(res.message, 5);
              return true;
            } else {
              ToastAndroid.show(res.message, 5);
              return false;
            }
          }
        );
        break;
      case 4:
        ProfileAPIManager.updatePhonePeNumber(value1, APIToken).then((res) => {
          if (res.status === "success") {
            ToastAndroid.show(res.message, 5);
            return true;
          } else {
            ToastAndroid.show(res.message, 5);
            return false;
          }
        });
    }
  }
  static mpinDataHandle(id, value1, value2, value3, APIToken) {
    switch (id) {
      case 0:
        APIResource.updateMpin(value1, value2, value3, APIToken).then((res) => {
          if (res.status === "success") {
          } else {
            ToastAndroid.show(res.message, 5);
          }
        });
        break;
      case 1:
        APIResource.generateMpin(value1, APIToken).then((res) => {
          if (res.status === "success") {
          } else {
            ToastAndroid.show(res.message, 5);
          }
        });
        break;
    }
  }
}
