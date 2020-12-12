import { WalletData, RequestFund } from "./modelClass";

export const walletArray = [
  new WalletData(require("../assets/wallet.png"), "Withdraw Funds", 0),
  new WalletData(require("../assets/wallet.png"), "Add Funds", 1),
  new WalletData(require("../assets/wallet.png"), "Fund Request History", 2),
  new WalletData(require("../assets/wallet.png"), "Winning History", 3),
];

export const HistoryArray = [
  new WalletData(require("../assets/wallet.png"), "Bid History", 0),
  new WalletData(require("../assets/wallet.png"), "Transaction History", 1),
  new WalletData(require("../assets/wallet.png"), "Fund Request History", 2),
];

export const ProfileArray = [
  new WalletData(require("../assets/user.png"), "My Profile", 0),
  new WalletData(require("../assets/user.png"), "Generate MPIN", 1),
  // new WalletData(require("../assets/user.png"), "Settings", 2),
  new WalletData(require("../assets/user.png"), "How To Play", 3),
  new WalletData(require("../assets/user.png"), "Game Rates", 4),
  new WalletData(require("../assets/user.png"), "Notice Board / Rules", 5),
  new WalletData(require("../assets/user.png"), "Account Statement", 6),
  new WalletData(require("../assets/user.png"), "Logout", 7),
];
export const generateMpin = [
  new WalletData(require("../assets/user.png"), "Change Mpin", 0),
  new WalletData(require("../assets/user.png"), "Generate MPIN", 1),
];
export const ProfileDetailArray = [
  new WalletData(require("../assets/user.png"), "Add Address Details", 0),
  new WalletData(require("../assets/user.png"), "Add Bank Details", 1),
  new WalletData(require("../assets/phonepay.png"), "Add Paytm Numbers", 2),
  new WalletData(
    require("../assets/phonepay.png"),
    "Add Google Pay Numbers",
    3
  ),
  new WalletData(require("../assets/phonepay.png"), "Add  Phonepe Numbers", 4),
];

export const RequestAmountData = [
  new RequestFund(318057, 1000, "Credit", "Pending", "19/08/2020-Wednesday"),
];

export const BidHistoryData = [
  new WalletData(null, "SRIDEVI HISTORY", 0),
  new WalletData(null, "TIME BAZAR HISTORY", 1),
  new WalletData(null, "MILAN DAY HISTORY", 2),
  new WalletData(null, "RAJDHANI DAY HISTORY", 3),
  new WalletData(null, "SUPREME DAY HISTORY", 4),
  new WalletData(null, "KALYAN HISTORY", 5),
  new WalletData(null, "SRIDEVI NIGHT HISTORY", 6),
  new WalletData(null, "SUPREME NIGHT HISTORY", 7),
  new WalletData(null, "MILAN NIGHT HISTORY", 8),
  new WalletData(null, "RAJDHANI NIGHT HISTORY", 9),
  new WalletData(null, "MAIN RATAN HISTORY", 10),
];
