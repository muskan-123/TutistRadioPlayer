import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
  Platform
} from 'react-native';

import TrackPlayer, {
  Capability,
  useTrackPlayerEvents,
  usePlaybackState,
  TrackPlayerEvents,
  STATE_PLAYING,
  Event,
} from 'react-native-track-player';
import {FlatListSlider} from 'react-native-flatlist-slider';

// import {ProfileArray, bannerArray} from '../../Model/ModelData';
// import songs from './data';
import Controller from './Controller';
import SliderComp from './Slider';
const {width, height} = Dimensions.get('window');
var lastIndex = 0
// const events = [
//   TrackPlayerEvents.PLAYBACK_STATE,
//   TrackPlayerEvents.PLAYBACK_ERROR
// ];

export default function PlayerScreen(props) {
  // console.log('PROPS:', props);
  const [currentIndex, setCurrentIndex] = useState(props.currentChannel);
  const [songs, setSongs] = useState(props.channelList);
  const [bannerArray, setBannerArray] = useState(props.bannerList);

  //   const setData = new Promise(function(resolve, reject) {
  //     setSongs(props.channelList);
  //     setBannerArray(props.bannerList);
  //     resolve('done');
  //  });

  useEffect(() => {
    console.log('PROPS: ', props);
    // position.addListener(({ value }) => {
    //   console.log(value);
    // });
    setSongs(props.channelList);
    TrackPlayer.setupPlayer({
      iosCategory: 'playback',
      waitForBuffer: true,
      maxBuffer: 100000,
      iosCategoryOptions: [
        'interruptSpokenAudioAndMixWithOthers',
        'allowBluetooth',
        'allowAirPlay',
      ],
      iosCategoryMode: 'spokenAudio',
    }).then(async () => {
      // The player is ready to be used
      console.log(currentIndex);
      // await setData();
      // add the array of songs in the playlist
      if (lastIndex != currentIndex) {
        TrackPlayer.stop();
      }
      lastIndex = currentIndex;
      const position = await TrackPlayer.getPosition();
      const duration = await TrackPlayer.getDuration();

      console.log('hey', duration, position);
      
      console.log(songs[currentIndex].name);
      console.log(songs[currentIndex].url);
      await TrackPlayer.add({
        id: songs[currentIndex].id,
        url: songs[currentIndex].url,
        type: 'default',
        title: songs[currentIndex].name,
        album: songs[currentIndex].name,
        artist: 'Track Artist',
        artwork: songs[currentIndex].image,
      });
      TrackPlayer.play();
      // if (Platform.OS === 'ios') {
      //   TrackPlayer.updateOptions({
      //     stopWithApp: true,
      //     capabilities: [
      //       TrackPlayer.CAPABILITY_PLAY,
      //       TrackPlayer.CAPABILITY_PAUSE,
      //       TrackPlayer.CAPABILITY_STOP,
      //     ],
      //     notificationCapabilities: [
      //       TrackPlayer.CAPABILITY_PLAY,
      //       TrackPlayer.CAPABILITY_PAUSE,
      //       TrackPlayer.CAPABILITY_STOP,
      //     ],

      //     compactCapabilities: [
      //       TrackPlayer.CAPABILITY_PLAY,
      //       TrackPlayer.CAPABILITY_PAUSE,
      //     ],
      //     alwaysPauseOnInterruption: true,
      //   });
      // } else {
        await TrackPlayer.updateOptions({
          stopWithApp: true,
          alwaysPauseOnInterruption: true,
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
          ],
        });
        // TrackPlayer.addEventListener('playback-metadata-received', async (e) => {
        //   const currentTrack = await TrackPlayer.getCurrentTrack();
        //   if (Platform.OS === 'android') {
        //     TrackPlayer.updateMetadataForTrack(currentTrack, {
        //       title: e.title,
        //       artist: e.artist,
        //     });
        //     this.setState({
        //       currentTitle: e.title || 'Innersong Radio',
        //       currentArtist: e.artist || 'Live radio',
        //     });
        //   } else if (Platform.OS === 'ios') {
        //     let step1 = e.title;
        //     let step2 = step1.split('-');
        //     let artist = step2.shift();
        //     let title = step2.join('-');
        //     console.log("----title----", artist, title);
        //     TrackPlayer.updateMetadataForTrack(currentTrack, {
        //       title: title,
        //       artist: artist,
        //     });
        //     // this.setState({
        //     //   currentTitle: title || 'Innersong Radio',
        //     //   currentArtist: artist || 'Live radio',
        //     // });
        //   }
        // });
     // }
     TrackPlayer.addEventListener('remote-play', (e) => {
      this.setState({audioStatus: false});
      TrackPlayer.play();
    });
    TrackPlayer.addEventListener('remote-pause', () => {
      this.setState({audioStatus: true});
      TrackPlayer.stop();
    });
    }, []);
  });

  const renderItem = ({index, item}) => {
    return (
      <Animated.View
        style={{
          alignItems: 'center',
          width: width,
        }}>
        <Animated.Image
          source={item.image}
          style={{width: 320, height: 320, borderRadius: 5}}
        />
      </Animated.View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
        <Animated.View
          style={{
            alignItems: 'center',
            width: width,
            // flex: 1
          }}>

        </Animated.View> */}
      <View style={{height: height * 0.4, marginTop: 0}}>
        <FlatListSlider
          contentContainerStyle={{height: height * 0.4}}
          data={props.bannerList}
          height={height * 0.4}
          onPress={() => null}
        />
      </View>
      <Text style={styles.description}>{songs[currentIndex].description}</Text>
      <Image
        style={{height: height * 0.1}}
        source={require('../assets/imgpsh_fullsize_anim.gif')}
      />
      {songs.length > 0 ? (
        <View style={{marginBottom: height / 9}}>
          <Text style={styles.title}>{songs[currentIndex].name}</Text>
          <Text style={styles.artist}>{songs[currentIndex].name}</Text>
          {console.log('AAAAAAAAAAAAAAAAAAAAAA')}
          {/* <SliderComp /> */}
          <Controller
            onPrv={() => {
              setCurrentIndex(currentIndex - 1);
            }}
            isPrv={currentIndex != 0}
            isNext={currentIndex != songs.length - 1}
            onNext={() => {
              setCurrentIndex(currentIndex + 1);
            }}
          />
        </View>
      ) : null}
      {/* </View> */}
    </SafeAreaView>
  );
  // return <SafeAreaView></SafeAreaView>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '600',
    textTransform: 'capitalize',
    color: 'black',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    textTransform: 'capitalize',
    color: 'black',
    marginTop: 20,
    marginLeft:12,
    marginRight:12,
  },
  artist: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff',
    textTransform: 'capitalize',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
    height: height,
    // maxHeight: 600,
  },
  corousal: {
    alignSelf: 'center',
  },
});
