import APIPaths from "./APIPaths";
import DeviceInfo from "react-native-device-info";

export default class WalletAPIManager {
  static getUserWallet(APIToken) {
    return fetch(APIPaths.get_user_wallet, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
    })
      .then((resp) => resp.json())
      .catch((error) => {
        console.log(error);
      });
  }
  static withdrawRequest(amount, type, APIToken) {
    return fetch(APIPaths.wallet_request, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
      body: JSON.stringify({ jwt: { amount: amount, type: type } }),
    })
      .then((resp) => resp.json())
      .catch((error) => {
        console.log(error);
      });
  }
  static getDates(APIToken) {
    return fetch(APIPaths.get_date, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
    })
      .then((resp) => resp.json())
      .catch((error) => {
        console.log(error);
      });
  }
  static getFundHistory(APIToken) {
    return fetch(APIPaths.fund_history, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
    })
      .then((resp) => resp.json())
      .catch((error) => {
        console.log(error);
      });
  }
  static getHistory(APIToken, gameId) {
    return fetch(APIPaths.bet_history, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
      body: JSON.stringify({
        jwt: {
          lottery_id: `${gameId}`,
          type: 1,
        },
      }),
    })
      .then((resp) => resp.json())
      .catch((error) => {
        console.log(error);
      });
  }
  static transactionHistory(APIToken) {
    return fetch(APIPaths.transaction_history, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
    })
      .then((resp) => resp.json())
      .catch((error) => {
        console.log(error);
      });
  }
}
