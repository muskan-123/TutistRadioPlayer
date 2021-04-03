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
} from 'react-native';

import TrackPlayer, {
  Capability,
  useTrackPlayerEvents,
  usePlaybackState,
  TrackPlayerEvents,
  STATE_PLAYING,
  Event,
} from 'react-native-track-player';

import songs from './data';
import Controller from './Controller';
import SliderComp from './Slider';
const {width, height} = Dimensions.get('window');

// const events = [
//   TrackPlayerEvents.PLAYBACK_STATE,
//   TrackPlayerEvents.PLAYBACK_ERROR
// ];

export default function PlayerScreen() {
  const [play, setPlay] = useState('true');
  useEffect(() => {
    // position.addListener(({ value }) => {
    //   console.log(value);
    // });

    TrackPlayer.setupPlayer().then(async () => {
      // The player is ready to be used
      console.log('Player ready');
      // add the array of songs in the playlist
      await TrackPlayer.reset();
      await TrackPlayer.add(songs);
      TrackPlayer.play();

      await TrackPlayer.updateOptions({
        stopWithApp: false,
        alwaysPauseOnInterruption: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
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
      <View>
        <Animated.View
          style={{
            alignItems: 'center',
            width: width,
          }}>
          <Image
            source={{uri: songs[0].image}}
            style={{width: 320, height: 320, borderRadius: 5}}
          />
        </Animated.View>
        <Text style={styles.title}>{songs[0].name}</Text>
        <Text style={styles.artist}>{songs[0].artist}</Text>
        <SliderComp />
        <Controller />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '600',
    textTransform: 'capitalize',
    color: 'black',
  },
  artist: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff',
    textTransform: 'capitalize',
  },
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: height,
    maxHeight: 600,
  },
});
