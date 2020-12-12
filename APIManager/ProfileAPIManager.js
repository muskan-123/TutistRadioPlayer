import APIPaths from "./APIPaths";
import DeviceInfo from "react-native-device-info";

export default class ProfileAPIManager {
  static updateGooglePayNumber(number, APIToken) {
    return fetch(APIPaths.add_payment_detail, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
      body: JSON.stringify({ jwt: { google_pay: number } }),
    })
      .then((resp) => resp.json())
      .catch((error) => {
        console.log(error);
      });
  }
  static updatePayTmNumber(number, APIToken) {
    console.log(APIToken);
    return fetch(APIPaths.add_payment_detail, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
      body: JSON.stringify({ jwt: { paytm: number } }),
    })
      .then((resp) => resp.json())
      .catch((error) => {
        console.log(error);
      });
  }
  static updatePhonePeNumber(number, APIToken) {
    return fetch(APIPaths.add_payment_detail, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
      body: JSON.stringify({ jwt: { phone_pay: number } }),
    })
      .then((resp) => resp.json())
      .catch((error) => {
        console.log(error);
      });
  }

  static updateProfile(address, city, zipcode, fullName, APIToken) {
    console.log(fullName);
    var fullName = fullName.split(" "),
      firstName = fullName[0],
      lastName = fullName[fullName.length - 1];

    return fetch(APIPaths.update_profile, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
      body: JSON.stringify({
        jwt: {
          first_name: firstName,
          last_name: lastName,
          address: address,
          city_id: "1",
          zip: zipcode,
        },
      }),
    })
      .then((resp) => resp.json())
      .catch((error) => {
        console.log(error);
      });
  }

  static updateAccountNo(fullName, account, bank, ifsc, APIToken) {
    return fetch(APIPaths.add_payment_detail, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
      body: JSON.stringify({
        jwt: {
          account_no: account,
          bank_name: bank,
          ifsc_code: ifsc,
          account_holder_name: fullName,
        },
      }),
    })
      .then((resp) => resp.json())
      .catch((error) => {
        console.log(error);
      });
  }
  static updateBankName(number, APIToken) {
    return fetch(APIPaths.add_payment_detail, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
      body: JSON.stringify({ jwt: { bank_name: number } }),
    })
      .then((resp) => resp.json())
      .catch((error) => {
        console.log(error);
      });
  }
  static updateIFSCCode(number, APIToken) {
    return fetch(APIPaths.add_payment_detail, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIToken,
      },
      body: JSON.stringify({ jwt: { ifsc_code: number } }),
    })
      .then((resp) => resp.json())
      .catch((error) => {
        console.log(error);
      });
  }

  static getuserStatement(token, startData, endDate) {
    return fetch(APIPaths.get_statement, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        jwt: { start_date: startData, end_date: endDate },
      }),
    }).then((resp) => resp.json());
  }
}
