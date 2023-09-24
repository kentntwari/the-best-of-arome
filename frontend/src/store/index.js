import { proxy } from "valtio";

export const singleAudioProxyStore = proxy({
  currentAudio: null,
  isPlaying: false,
});
