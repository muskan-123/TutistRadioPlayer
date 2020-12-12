import APIPaths from "./APIPaths";
import DeviceInfo from "react-native-device-info";
import AsyncStorage from "@react-native-community/async-storage";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const device_id = DeviceInfo.getUniqueId();

let token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9uZXcuc2F0dGFtYXRrYS5nbG9iYWxcL2FwaVwvbG9naW4iLCJpYXQiOjE2MDE4MDUyODQsImV4cCI6Mzc2MDE4MDUyODQsIm5iZiI6MTYwMTgwNTI4NCwianRpIjoibGE5TUhyWFJOckpWeVAwZSIsInN1YiI6MzEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.5a0KEtd6AOKWxg5CFtHYTmQidCvNMxplZQ5HvD6fI98";

export default class APIResource {
  static loginUser(username, password, fcmToken) {
    return fetch(APIPaths.login, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        jwt: {
          username: username,
          password: password,
          device_id: device_id,
          device_type: "android",
          device_token: fcmToken,
        },
      }),
    })
      .then((resp) => resp.json())
      .catch((error) => {
        console.log(error);
      });
  }

  static signupUser(username, phone, password, confirm_password, fcmToken) {
    return fetch(APIPaths.signup, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        jwt: {
          username: username,
          phone: phone,
          phone_code: "91",
          password: password,
          confirm_password: confirm_password,
          device_id: device_id,
          device_type: "android",
          device_token: fcmToken,
        },
      }),
    }).then((resp) => resp.json());
  }
  static verifyUser(fcmToken, phone, otp) {
    return fetch(APIPaths.verify_user, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9uZXcuc2F0dGFtYXRrYS5nbG9iYWxcL2FwaVwvbG9naW4iLCJpYXQiOjE2MDQ5MzczNTksImV4cCI6Mzc2MDQ5MzczNTksIm5iZiI6MTYwNDkzNzM1OSwianRpIjoiY2puUlZXY1BBZExrQ2RRdiIsInN1YiI6NTgsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.5rvg-x8feQHpXSuo6ZJ0YOrtB5v0HeZr0CycG2o2OjI",
      },
      body: JSON.stringify({
        jwt: { phone: phone, otp: otp },
      }),
    }).then((resp) => resp.json());
  }

  static loginUserWithMpin(mpin, fcmToken) {
    return fetch(APIPaths.login_mpin, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        jwt: {
          mpin: mpin,
          device_id: device_id,
          device_type: "android",
          device_token: fcmToken,
        },
      }),
    }).then((resp) => resp.json());
  }

  static forgotPassword(mobile) {
    return fetch(APIPaths.forgot_password, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jwt: { phone: mobile },
      }),
    }).then((resp) => resp.json());
  }
  static forgotUserName(mobile) {
    return fetch(APIPaths.forgot_username, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jwt: { phone: mobile },
      }),
    }).then((resp) => resp.json());
  }
  static forgotMpin(mobile) {
    return fetch(APIPaths.forgot_username, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jwt: { phone: mobile },
      }),
    }).then((resp) => resp.json());
  }
  static generateMpin(mpin, APIToken) {
    return fetch(APIPaths.generate_mpin, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
      body: JSON.stringify({
        jwt: {
          mpin: mpin,
          device_id: device_id,
          device_type: "android",
        },
      }),
    }).then((resp) => resp.json());
  }
  static updateMpin(current_mpin, new_mpin, APIToken) {
    return fetch(APIPaths.update_mpin, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
      body: JSON.stringify({
        jwt: {
          current_mpin: current_mpin,
          new_mpin: new_mpin,
          device_id: device_id,
          device_type: "android",
        },
      }),
    }).then((resp) => resp.json());
  }
  static logoutUser(fcmToken, APIToken) {
    return fetch(APIPaths.logout, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
      body: JSON.stringify({
        jwt: {
          device_id: device_id,
          device_type: "a",
          device_token: fcmToken,
        },
      }),
    }).then((resp) => resp.json());
  }
  static getLotteryList(APIToken) {
    return fetch(APIPaths.today_lottery_list, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
      body: JSON.stringify({
        jwt: {
          type: "1",
        },
      }),
    }).then((resp) => resp.json());
  }
  static getGamesList(APIToken) {
    return fetch(APIPaths.games_list, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
    }).then((resp) => resp.json());
  }
  static getNotificationSetting() {
    return fetch(APIPaths.notification_setting, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        jwt: { is_notification: 1, device_id: device_id },
      }),
    }).then((resp) => resp.json());
  }

  static getBets(figureGameData, type, gameId, lottery_id, APIToken) {
    return fetch(APIPaths.bet_game, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
      body: JSON.stringify({
        jwt: {
          bets: figureGameData,
          lottery_id: lottery_id,
          game_id: gameId,
          type: type,
        },
      }),
    }).then((resp) => resp.json());
  }
  static getSangamBets(
    open,
    close,
    amount,
    type,
    gameId,
    lottery_id,
    APIToken
  ) {
    console.log(open + close + amount);
    return fetch(APIPaths.bet_game, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
      body: JSON.stringify({
        jwt: {
          user_id: 31,
          open: open,
          close: close,
          amount: amount,
          lottery_id: lottery_id,
          game_id: gameId,
          type: type,
        },
      }),
    }).then((resp) => resp.json());
  }

  static getAppVersion() {
    return fetch(APIPaths.version_check, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((resp) => resp.json());
  }
}
