import {WalletData, RequestFund} from './modelClass';

export const walletArray = [
  // new WalletData(
  //   require('../Screens/assets/language.png'),
  //   'Change Language',
  //   0,
  // ),
  new WalletData(
    require('../Screens/assets/createchannel.png'),
    'Create your channel',
    1,
    'https://docs.tutist.com/prabhavana/create-your-channel/'
  ),
  new WalletData(require('../Screens/assets/faq.png'), 'FAQs', 2, 'https://docs.tutist.com/prabhavana/faqs/'),
  new WalletData(require('../Screens/assets/about.png'), 'About Us', 3, 'https://docs.tutist.com/prabhavana/about-us/'),
  new WalletData(require('../Screens/assets/contactus.png'), 'Contact Us', 4, 'https://docs.tutist.com/prabhavana/contact-us/'),
];

export const HistoryArray = [
  new WalletData(require('../assets/wallet.png'), 'Bid History', 0),
  new WalletData(require('../assets/wallet.png'), 'Transaction History', 1),
  new WalletData(require('../assets/wallet.png'), 'Fund Request History', 2),
];

export const ProfileArray = [
  {
    id: 1,
    name: 'Jain Bhajan',
    image: 'http://35.154.213.13:9191/navkar_mantra.jpg',
    url: 'http://35.154.213.13:8000/jain-bhajan',
  },
  {
    id: 2,
    name: 'Jain Bhajan',
    image: 'http://35.154.213.13:9191/navkar_mantra.jpg',
    url: 'http://35.154.213.13:8000/jain-bhajan',
  },
  {
    id: 3,
    name: 'Jain ',
    image: 'http://35.154.213.13:9191/navkar_mantra.jpg',
    url: 'http://35.154.213.13:8000/jain-bhajan',
  },
];

export const bannerArray = [
  {
    "id": 1,
    "image": "http://35.154.213.13:9191/navkar_mantra.jpg"
  },
  {
    "id": 2,
    "image": "http://35.154.213.13:9191/navkar_mantra.jpg"
  },
  {
    "id": 3,
    "image": "http://35.154.213.13:9191/navkar_mantra.jpg"
  }
];

export const generateMpin = [
  new WalletData(require('../assets/user.png'), 'Change Mpin', 0),
  new WalletData(require('../assets/user.png'), 'Generate MPIN', 1),
];
export const ProfileDetailArray = [
  new WalletData(require('../assets/user.png'), 'Add Address Details', 0),
  new WalletData(require('../assets/user.png'), 'Add Bank Details', 1),
  new WalletData(require('../assets/phonepay.png'), 'Add Paytm Numbers', 2),
  new WalletData(
    require('../assets/phonepay.png'),
    'Add Google Pay Numbers',
    3,
  ),
  new WalletData(require('../assets/phonepay.png'), 'Add  Phonepe Numbers', 4),
];

export const RequestAmountData = [
  new RequestFund(318057, 1000, 'Credit', 'Pending', '19/08/2020-Wednesday'),
];

export const BidHistoryData = [
  new WalletData(null, 'SRIDEVI HISTORY', 0),
  new WalletData(null, 'TIME BAZAR HISTORY', 1),
  new WalletData(null, 'MILAN DAY HISTORY', 2),
  new WalletData(null, 'RAJDHANI DAY HISTORY', 3),
  new WalletData(null, 'SUPREME DAY HISTORY', 4),
  new WalletData(null, 'KALYAN HISTORY', 5),
  new WalletData(null, 'SRIDEVI NIGHT HISTORY', 6),
  new WalletData(null, 'SUPREME NIGHT HISTORY', 7),
  new WalletData(null, 'MILAN NIGHT HISTORY', 8),
  new WalletData(null, 'RAJDHANI NIGHT HISTORY', 9),
  new WalletData(null, 'MAIN RATAN HISTORY', 10),
];
