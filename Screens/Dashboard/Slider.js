import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

import TrackPlayer, {useProgress} from 'react-native-track-player';

export default function SliderComp() {
  let position = 0;
  let duration = 0;
  useEffect(() => {
    //    position = await TrackPlayer.getPosition();
    //  duration = await TrackPlayer.getDuration();
  }, []);
  const formatTime = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  };

  const handleChange = (val) => {
    TrackPlayer.seekTo(val);
  };

  //components
  return (
    <View style={styles.container}>
      <Slider
        style={{width: 280, height: 40}}
        minimumValue={0}
        value={position}
        maximumValue={duration}
        minimumTrackTintColor="black"
        onSlidingComplete={handleChange}
        maximumTrackTintColor="blue)"
        thumbTintColor="black"
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timers}>{formatTime(position)}</Text>
        <Text style={styles.timers}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
  },
  timers: {
    color: 'black',
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
