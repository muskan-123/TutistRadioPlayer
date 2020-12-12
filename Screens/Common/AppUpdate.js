import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import constant from "../../Constants/constant";

const AppUpdate = (props) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/matka360.png")}
        />
        <Text style={[styles.text, { fontSize: 20 }]}>
          New Version Available!
        </Text>
        <Text style={styles.text}>Please update the App to new version.</Text>

        <View style={styles.rowContainer}>
          {!props.isForceUpdate && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.onLaterPress();
              }}
              style={{ flex: 1, paddingHorizontal: 5 }}
            >
              {
                <LinearGradient
                  colors={["#f0eaa8", "#e9d060"]}
                  style={[
                    styles.buttonGradient,
                    { borderRadius: 30, justifyContent: "center" },
                  ]}
                >
                  <Text textBreakStrategy={"simple"} style={styles.buttonText}>
                    LATER
                  </Text>
                </LinearGradient>
              }
            </TouchableOpacity>
          )}

          <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1 }}
            onPress={() => {
              props.onUpdatePress();
            }}
          >
            {
              <LinearGradient
                colors={["#f0eaa8", "#e9d060"]}
                style={[
                  styles.buttonGradient,
                  { borderRadius: 30, justifyContent: "center" },
                ]}
              >
                <Text textBreakStrategy={"simple"} style={styles.buttonText}>
                  UPDATE
                </Text>
              </LinearGradient>
            }
          </TouchableOpacity>
        </View>
        <Text style={styles.versionText}>Version {props.appVersion}</Text>
      </View>
      {props.downloading && (
        <Modal visible={props.downloading} transparent>
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color={constant.Colors.primary} />
            <Text style={[styles.text, { marginTop: 10 }]}>
              Please wait while we are downloading new version!
            </Text>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: constant.Colors.primary,
    fontSize: 16,
    fontFamily: constant.Fonts.FontFamily.semiBold,
    marginBottom: 10,
  },
  buttonGradient: {
    height: 40,
    marginVertical: 10,
    width: "95%",
    borderRadius: 5,
    elevation: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  rowContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  buttonText: {
    fontSize: constant.Fonts.Size.headerTitle,
    textAlign: "center",
    color: "black",
    fontFamily: constant.Fonts.FontFamily.semiBold,
    fontWeight: "bold",
  },
  logo: {
    width: 160,
    height: "auto",
    aspectRatio: 2.4 / 2,
  },
  versionText: {
    color: constant.Colors.white,
    fontSize: 14,
    fontFamily: constant.Fonts.FontFamily.semiBold,
    marginTop: 10,
  },
});

export default AppUpdate;
