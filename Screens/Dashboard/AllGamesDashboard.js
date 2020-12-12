import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import {
  Table,
  Row,
  TableWrapper,
  Cell,
  Col,
} from "react-native-table-component";
import DialogInput from "react-native-dialog-input";
import LinearGradient from "react-native-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import { APIResource, WalletAPIManager } from "../../APIManager";
import { CustomButton, CustomPicker } from "../../Components/UI";
import constant from "../../Constants/constant";
const AllGamesDashboard = (props) => {
  const initialState = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
    18: "",
    19: "",
    20: "",
    21: "",
    22: "",
    23: "",
    24: "",
    25: "",
    26: "",
    27: "",
    28: "",
    29: "",
    30: "",
    31: "",
    32: "",
    33: "",
    34: "",
    35: "",
    36: "",
    37: "",
    38: "",
    39: "",
    40: "",
    41: "",
    42: "",
    43: "",
    44: "",
    45: "",
    46: "",
    47: "",
    48: "",
    49: "",
    50: "",
    51: "",
    52: "",
    53: "",
    54: "",
    55: "",
    56: "",
    57: "",
    58: "",
    59: "",
    60: "",
    61: "",
    62: "",
    63: "",
    64: "",
    65: "",
    66: "",
    67: "",
    68: "",
    69: "",
    70: "",
    71: "",
    72: "",
    73: "",
    74: "",
    75: "",
    76: "",
    77: "",
    78: "",
    79: "",
    80: "",
    81: "",
    82: "",
    83: "",
    84: "",
    85: "",
    86: "",
    87: "",
    88: "",
    89: "",
    90: "",
    91: "",
    92: "",
    93: "",
    94: "",
    95: "",
    96: "",
    97: "",
    98: "",
    99: "",
    100: "",
    101: "",
    102: "",
    103: "",
    104: "",
    105: "",
    106: "",
    107: "",
    108: "",
    109: "",
    110: "",
    111: "",
    112: "",
    113: "",
    114: "",
    115: "",
    116: "",
    117: "",
    118: "",
    119: "",
    120: "",
    121: "",
    122: "",
    123: "",
    124: "",
    125: "",
    126: "",
    127: "",
    128: "",
    129: "",
    130: "",
    131: "",
    132: "",
    133: "",
    134: "",
    135: "",
    136: "",
    137: "",
    138: "",
    139: "",
    140: "",
    141: "",
    142: "",
    143: "",
    144: "",
    145: "",
    146: "",
    147: "",
    148: "",
    149: "",
    150: "",
    151: "",
    152: "",
    153: "",
    154: "",
    155: "",
    156: "",
    157: "",
    158: "",
    159: "",
    160: "",
    161: "",
    162: "",
    163: "",
    164: "",
    165: "",
    166: "",
    167: "",
    168: "",
    169: "",
    170: "",
    171: "",
    172: "",
    173: "",
    174: "",
    175: "",
    176: "",
    177: "",
    178: "",
    179: "",
    180: "",
    181: "",
    182: "",
    183: "",
    184: "",
    185: "",
    186: "",
    187: "",
    188: "",
    189: "",
    190: "",
    191: "",
    192: "",
    193: "",
    194: "",
    195: "",
    196: "",
    197: "",
    198: "",
    199: "",
    200: "",
    201: "",
    202: "",
    203: "",
    204: "",
    205: "",
    206: "",
    207: "",
    208: "",
    209: "",
    210: "",
    211: "",
    212: "",
    213: "",
    214: "",
    215: "",
    216: "",
    217: "",
    218: "",
    219: "",
    220: "",
    221: "",
    222: "",
    223: "",
    224: "",
    225: "",
    226: "",
    227: "",
    228: "",
    229: "",
    230: "",
  };
  const [updatedCellData, setUpdateCellData] = useState(initialState);
  const [figureGameData, setfigureGameData] = useState({});
  const [total, setTotal] = useState(0);
  const [lastPoint, setLastPoint] = useState("");
  const [cellData, setCellData] = useState([
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["128", "129", "120", "130", "140", "123", "124", "125", "126", "127"],
    ["137", "138", "139", "149", "159", "150", "160", "134", "135", "136"],
    ["146", "147", "148", "158", "168", "169", "179", "170", "180", "145"],
    ["236", "156", "157", "167", "230", "178", "250", "189", "234", "190"],
    ["245", "237", "238", "239", "249", "240", "269", "260", "270", "235"],
    ["290", "246", "247", "248", "258", "259", "278", "279", "289", "280"],
    ["380", "345", "256", "257", "267", "268", "340", "350", "360", "370"],
    ["470", "390", "346", "347", "348", "349", "359", "369", "379", "389"],
    ["489", "480", "490", "356", "357", "358", "368", "378", "450", "460"],
    ["560", "570", "580", "590", "456", "367", "458", "459", "469", "479"],
    ["579", "589", "670", "680", "690", "457", "467", "468", "478", "569"],
    ["678", "679", "689", "789", "780", "790", "890", "567", "568", "578"],
    ["100", "110", "166", "112", "113", "114", "115", "116", "117", "118"],
    ["119", "200", "229", "220", "122", "277", "133", "224", "144", "226"],
    ["155", "228", "300", "266", "177", "330", "118", "233", "119", "244"],
    ["227", "255", "337", "338", "339", "448", "223", "288", "225", "299"],
    ["335", "336", "355", "400", "366", "466", "377", "440", "388", "334"],
    ["344", "499", "445", "446", "447", "556", "449", "477", "559", "488"],
    ["399", "660", "599", "455", "500", "600", "557", "558", "577", "550"],
    ["588", "688", "779", "699", "799", "880", "566", "800", "667", "668"],
    ["669", "778", "788", "770", "889", "899", "700", "990", "900", "677"],
    ["777", "444", "111", "888", "555", "222", "999", "666", "333", "000"],
  ]);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [rowIndex, setRowIndex] = useState("");
  const [columnIndex, setColumnIndex] = useState("");
  const [panna, setPanna] = useState("");
  const [APIToken, setAPIToken] = useState("");
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBazaar, setSelectedBazaar] = useState(true);
  const [walletBalance, setWalletBalance] = useState();

  useEffect(() => {
    getDate();
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "ALL GAMES",
      headerBackTitleVisible: false,
      headerRight: () => (
        <LinearGradient
          colors={["#1B1B1B", "#212121"]}
          style={styles.leftHeaderViewContainer}
        >
          <TouchableOpacity style={styles.leftHeaderView}>
            <MaterialCommunityIcons
              name="wallet"
              size={22}
              color={constant.Colors.primary}
            />
            <Text style={styles.contact}>{walletBalance || props.route.params.balance}</Text>
          </TouchableOpacity>
        </LinearGradient>
      ),
      headerTintColor: "black",
    });
  }, [props.navigation, walletBalance]);

  getDate = async () => {
    const APIToken = await AsyncStorage.getItem("device_token");
    setAPIToken(APIToken);
    WalletAPIManager.getDates(APIToken).then((res) => {
      setDates(res.data);
      setSelectedDate(moment(res.data[0].date).format("DD/MM/YYYY - dddd"));
    });
  };

  useEffect(() => {
    async function setToken() {
      const APIToken = await AsyncStorage.getItem("device_token");
      setAPIToken(APIToken);
    }
    setToken();
  }, []);

  function sendInput(inputText) {
    let newArr = { ...updatedCellData };
    let index =
      columnIndex == 0
        ? rowIndex.toString()
        : columnIndex.toString() + rowIndex.toString();
    newArr[index] = inputText;
    let add = 0;
    setUpdateCellData(newArr);
    updatedCellData[1] = inputText;
    const bet = "bet" + panna;
    const newFigureArr = { ...figureGameData, [bet]: inputText };
    setfigureGameData(newFigureArr);
    for (let i = 0; i <= 230; i++) {
      add = add + Number(updatedCellData[i]);
    }
    setTotal(add);
  }

  function checkValidationAdd() {
    if (true) {
      const type = selectedBazaar == "OPEN-BAZAAR" ? "open" : "close";
      APIResource.getBets(
        figureGameData,
        type,
        "all",
        props.route.params.lottery_id,
        APIToken
      ).then((res) => {
        if (res.status === 'success') {
          setUpdateCellData(initialState);
          setTotal(0);
          setWalletBalance(res.data.balance);
        }
        ToastAndroid.show(res.message, 5);
      });
    } else {
      ToastAndroid.show("Please fill all the details", 5);
    }
  }

  const TopView = () => {
    const lotteryData = dates.find(
      (date) => date.id === props.route.params.lottery_id
    );
    const currentTime = moment().format("HH:mm:ss");
    const isOpeningBetValid = lotteryData?.opening_bet_time > currentTime;
    const isClosingBetValid = lotteryData?.closing_bet_time > currentTime;
    const bazarArray = [{ title: "OPEN-BAZAAR" }, { title: "CLOSE-BAZAAR" }];
    // isOpeningBetValid
    //   ? isClosingBetValid
    //     ? [{ title: "OPEN-BAZAAR" }, { title: "CLOSE-BAZAAR" }]
    //     : [{ title: "OPEN-BAZAAR" }]
    //   : [];
    return (
      <View
        style={[
          styles.topviewContainer,
          {
            justifyContent: "space-around",
            paddingHorizontal: 5,
          },
        ]}
      >
        <CustomPicker
          dateArray={dates}
          selectedValue={selectedDate}
          onChange={(e) => {
            setSelectedDate(e);
          }}
        />
        <CustomPicker
          dateArray={bazarArray}
          bazaar
          selectedBazaarValue={selectedBazaar}
          onChange={(e) => {
            setSelectedBazaar(e);
          }}
        />
      </View>
    );
  };

  const flatlistView = (props) => {
    return (
      <DialogInput
        isDialogVisible={isDialogVisible}
        title={"Enter points"}
        message={""}
        hintInput={""}
        initValueTextInput={lastPoint}
        submitInput={(inputText) => {
          sendInput(inputText);
          setDialogVisible(false);
          setLastPoint(inputText);
        }}
        closeDialog={() => {
          setDialogVisible(false);
        }}
      ></DialogInput>
    );
  };

  const bottomView = () => {
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setUpdateCellData(initialState);
            setTotal(0);
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
              <Text textBreakStrategy={"simple"} style={styles.text}>
                RESET
              </Text>
            </LinearGradient>
          }
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1 }}
          onPress={() => {
            checkValidationAdd();
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
              <Text textBreakStrategy={"simple"} style={styles.text}>
                SUBMIT
              </Text>
            </LinearGradient>
          }
        </TouchableOpacity>
      </View>
    );
  };
  const element = (rowIndex, data, columnIndex) => {
    let index =
      columnIndex == 0
        ? rowIndex.toString()
        : columnIndex.toString() + rowIndex.toString();
    let cellValue = updatedCellData[index];

    return (
      <TouchableOpacity
        style={{}}
        onPress={() => {
          rowIndex != 10 && setDialogVisible(true);
          setRowIndex(rowIndex);
          setColumnIndex(columnIndex);
          setPanna(data);
        }}
      >
        <View
          style={[
            styles.btn,
            { backgroundColor: rowIndex == 10 ? "lightgrey" : "" },
          ]}
        >
          {true && (
            <Text
              style={[
                styles.btnText,
                {
                  color: rowIndex == 10 ? "red" : constant.Colors.primary,
                  marginTop: rowIndex == 10 ? 5 : 0,
                },
              ]}
            >
              {data + "\n"}
              <Text style={{ color: "red" }}>{cellValue}</Text>
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {TopView()}
      <View style={styles.flatlistContainer}>
        <Table
          borderStyle={{
            borderWidth: 1,
            borderColor: constant.Colors.primary,
          }}
        >
          {cellData.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={element(cellIndex, cellData, index)}
                  textStyle={styles.text}
                  style={{ width: "10%", borderColor: constant.Colors.primary }}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
        <Text
          style={{
            color: "white",
            alignSelf: "flex-end",
            marginVertical: 10,
            fontSize: 24,
            fontStyle: "italic",
          }}
        >
          {total}
        </Text>
        {flatlistView()}
        {bottomView()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "black",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    bottom: 0,
  },
  bottomView: {
    alignItems: "center",
  },

  head: {
    height: 20,
    backgroundColor: "#808B97",
  },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  text: { margin: 20 },
  row: {
    flexDirection: "row",
    margin: 0,
  },
  btn: {},
  btnText: { textAlign: "center", color: "black" },
  leftHeaderViewContainer: {
    height: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "center",
  },
  leftHeaderView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    padding: 2,
  },
  contact: {
    color: constant.Colors.primary,
    fontSize: 14,
    marginLeft: 5,
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
  },
  text: {
    fontSize: constant.Fonts.Size.headerTitle,
    textAlign: "center",
    color: "black",
    fontFamily: constant.Fonts.FontFamily.semiBold,
    fontWeight: "bold",
  },
  topviewContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "black",
  },
});

export default AllGamesDashboard;
