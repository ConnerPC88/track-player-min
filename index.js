/**
 * @format
 */

import {registerRootComponent} from 'expo';
import App from './App';
import TrackPlayer from 'react-native-track-player';

const playbackService = async () => {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    goToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
  TrackPlayer.addEventListener(Event.RemoteJumpForward, () => {
    TrackPlayer.seekBy(15);
  });
  TrackPlayer.addEventListener(Event.RemoteJumpBackward, () => {
    TrackPlayer.seekBy(-15);
  });
  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, () => {
    setSermonCompleted();
    goToNext();
  });
  TrackPlayer.addEventListener(Event.RemoteSeek, data => {
    TrackPlayer.seekTo(data.position);
  });
};

registerRootComponent(App);
TrackPlayer.registerPlaybackService(() => playbackService);