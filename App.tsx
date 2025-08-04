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

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    setupPlayer();
  }, []);

  useEffect(() => {
    TrackPlayer.load({
      artist: 'Bill Parker',
      artwork:
        'https://vps.sermonaudio.com/resize_image/speakers/podcast/600/600/7463-0002.jpg',
      duration: 1871,
      id: '129241320364515',
      title: 'Real Faith',
      type: TrackType.Default,
      url: 'https://cloud.sermonaudio.net/media/audio/high/129241320364515.mp3?ts=1733754717&language=eng',
    });
    TrackPlayer.play();
  }, []);

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
      artist: 'Bill Parker',
      artwork:
        'https://vps.sermonaudio.com/resize_image/speakers/podcast/600/600/7463-0002.jpg',
      duration: 1871,
      id: '129241320364515',
      title: 'Real Faith',
      type: TrackType.Default,
      url: 'https://cloud.sermonaudio.net/media/audio/high/129241320364515.mp3?ts=1733754717&language=eng',
    });
    await TrackPlayer.play();
  };

  const loadNewTrack = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.load({
      artist: 'Douglas Salyer',
      artwork:
        'https://vps.sermonaudio.com/resize_image/speakers/podcast/600/600/22398-0002.jpg',
      duration: 3203,
      id: '8425173741181',
      title: 'The Vision of Dry Bones',
      type: TrackType.Default,
      url: 'https://cloud.sermonaudio.net/media/audio/high/8425173741181.mp3?ts=1754331195&language=eng',
    });
    await TrackPlayer.play();
  };

  const loadNewTestTrack = async () => {
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{ height: 700 }}>
        <Text
          style={{ marginTop: 150, alignSelf: 'center' }}
          onPress={loadOriginalTrack}
        >
          Load original audio track
        </Text>
        <Text
          style={{ marginTop: 150, alignSelf: 'center' }}
          onPress={loadNewTrack}
        >
          Load new audio track
        </Text>
        <Text
          style={{ marginTop: 150, alignSelf: 'center' }}
          onPress={loadNewTestTrack}
        >
          Load new test track
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
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
