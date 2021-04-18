import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';

export default function Controller({onNext, onPrv, isPrv, isNext}) {
  const playbackState = usePlaybackState();
  const isPlaying = useRef('paused'); //paused play loading

  useEffect(() => {
    console.log('Player State', playbackState);

    //set the player state
    if (playbackState == "playing") {
      isPlaying.current = 'playing';
    } else if (playbackState == "paused") {
      isPlaying.current = 'paused';
    } else {
      isPlaying.current = 'loading';
    }
  }, [playbackState]);

  const returnPlayBtn = () => {
    console.log(isPlaying);
    switch (isPlaying.current) {
      case 'playing':
        return <Icon color="black" name="pause" size={45} />;
      case 'paused':
        return <Icon color="black" name="play-arrow" size={45} />;
      default:
        return <Icon color="black" name="pause" size={45} />;
    }
  };

  const onPlayPause = () => {
    if (isPlaying.current == 'playing') {
      TrackPlayer.pause();
      isPlaying.current = 'paused';
    } else if (isPlaying.current == 'paused') {
      TrackPlayer.play();
      isPlaying.current = 'playing';
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrv} disabled={!isPrv}>
        <Icon color="black" name="skip-previous" size={45} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPlayPause}>
        {returnPlayBtn()}
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext} disabled={!isNext}>
        <Icon color="black" name="skip-next" size={45} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 250,
    alignSelf: 'center',
  },
});
