/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect, useMemo } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  TrackType,
  useIsPlaying,
  useProgress,
  Event,
} from 'react-native-track-player';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer({ autoHandleInterruptions: true });
    TrackPlayer.addEventListener(Event.MetadataCommonReceived, data => {
      console.log('track metadata:', data);
    });
    TrackPlayer.addEventListener(Event.MetadataChapterReceived, data => {
      console.log('audio chapter metadata:', data);
    });
    TrackPlayer.addEventListener(Event.PlaybackError, data => {
      console.log('playback error:', data);
    });
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SeekTo,
        Capability.Stop,
        Capability.JumpForward,
        Capability.JumpBackward,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.JumpForward,
        Capability.JumpBackward,
      ],

      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.JumpForward,
        Capability.JumpBackward,
      ],
      forwardJumpInterval: 15,
      backwardJumpInterval: 15,
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
    });
  };

  const startPlayer = async () => {
    await TrackPlayer.load({
      artist: 'samplelib',
      duration: 1871,
      id: '2349875987',
      title: 'Music',
      type: TrackType.Default,
      url: 'https://download.samplelib.com/mp3/sample-15s.mp3',
    });
    await TrackPlayer.play();
  };

  useEffect(() => {
    setupPlayer();
    startPlayer();
  }, []);

  useEffect(() => {}, []);

  const { playing } = useIsPlaying();
  const { position, duration } = useProgress();

  const playPauseText = playing ? 'Pause' : 'Play';

  const togglePlay = () => {
    if (playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  };

  const timestampStart = useMemo(() => {
    return new Date(position * 1000)
      .toISOString()
      .substring(position < 3600 ? 14 : 11, 19);
  }, [position]);

  const timestampEnd = useMemo(() => {
    return new Date(duration * 1000)
      .toISOString()
      .substring(duration < 3600 ? 14 : 11, 19);
  }, [duration]);

  const loadOriginalTrack = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.load({
      artist: 'samplelib',
      duration: 1871,
      id: '2349875987',
      title: 'Music',
      type: TrackType.Default,
      url: 'https://download.samplelib.com/mp3/sample-15s.mp3',
    });
    await TrackPlayer.play();
  };

  const loadSecondTrack = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.load({
      artist: 'onlinetestcase',
      duration: 216,
      id: '34582734',
      title: '5MB',
      type: TrackType.Default,
      url: 'https://onlinetestcase.com/wp-content/uploads/2023/06/5-MB-MP3.mp3',
    });
    await TrackPlayer.play();
  };

  const loadThirdTrack = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.load({
      artist: 'Test',
      duration: 42,
      id: '123456',
      title: 'Test Audio',
      type: TrackType.Default,
      url: 'https://file-examples.com/storage/fe180a8b03688f5559b9baf/2017/11/file_example_MP3_700KB.mp3',
    });
    await TrackPlayer.play();
  };

  const skipForward = async () => {
    await TrackPlayer.seekBy(15);
  };

  const skipBackward = async () => {
    await TrackPlayer.seekBy(-15);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{ height: 700, alignItems: 'center' }}>
        <Text style={{ marginTop: 150 }} onPress={loadOriginalTrack}>
          Load original track
        </Text>
        <Text style={{ marginTop: 50 }} onPress={loadSecondTrack}>
          Load 2nd track
        </Text>
        <Text style={{ marginTop: 50 }} onPress={loadThirdTrack}>
          Load 3rd track
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 100,
          }}
        >
          <Text style={{ color: 'red', fontSize: 32 }}>{timestampStart}</Text>
          <Text
            style={{ color: 'red', fontSize: 32, marginHorizontal: 10 }}
            onPress={togglePlay}
          >
            {playPauseText}
          </Text>
          <Text style={{ color: 'red', fontSize: 32 }}>{timestampEnd}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={{ marginRight: 80 }} onPress={skipBackward}>
            back
          </Text>
          <Text onPress={skipForward}>forward</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
