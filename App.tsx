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
import { useDerivedValue } from 'react-native-reanimated';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  useIsPlaying,
  useProgress,
} from 'react-native-track-player';

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({ autoHandleInterruptions: true });
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
      artwork:
        'https://vps.sermonaudio.com/resize_image/speakers/podcast/600/600/10522-0001.jpg',
      broadcasterArtwork:
        'https://vps.sermonaudio.com/resize_image/sources/podcast/600/600/gcc2.jpg',
      broadcasterID: 'gcc',
      broadcasterName: 'Grace Community Church',
      duration: 2856,
      fromAutoPlay: false,
      id: '81251442472460',
      isLive: false,
      isVideo: false,
      roundedSpeakerImage:
        'https://media.sermonaudio.com/images/speakers/thumbnail/10522-0001.png',
      seriesID: 178120,
      seriesTitle: 'Mark',
      speaker: 'Craig Mussulman',
      title: 'Kingdom Economics',
      url: 'https://cloud.sermonaudio.net/media/audio/high/81251442472460.mp3?ts=1754060303&language=eng',
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 700,
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
