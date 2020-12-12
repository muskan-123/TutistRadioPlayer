import jwt from "react-native-pure-jwt";

export default class JWTManager {
  static getJWTToken(payload) {
    jwt
      .sign(
        payload, // body
        "P8wCTuBglRX7efuMMQ9ntDwiBM5nVhy7iGkBtCIl8PhVPJ8fVSuK1yZ7plWBoDTf", // secret
        {
          alg: "HS256",
          typ: "JWT",
        }
      )
      .then((res) => console.log(res)) // token as the only argument
      .catch(console.error);
  }
  static decodeJWTToken() {
    jwt
      .decode(
        token, // the token
        "P8wCTuBglRX7efuMMQ9ntDwiBM5nVhy7iGkBtCIl8PhVPJ8fVSuK1yZ7plWBoDTf", // the secret
        {
          skipValidation: true, // to skip signature and exp verification
        }
      )
      .then(console.log) // already an object. read below, exp key note
      .catch(console.error);
  }
}
