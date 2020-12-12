export default class Validation {
  static validateEmail(email) {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(email)) {
      return true;
    } else return false;
  }
  static validateMobileNum(num) {
    var regex = /^[0-9\b]+$/;
    if (!regex.test(num)) {
      return false;
    } else if (num.length != 10) {
      return false;
    }
    return true;
  }
  static validateUsername(username) {
    if (username.length < 6) {
      return false;
    }
    return true;
  }
}
