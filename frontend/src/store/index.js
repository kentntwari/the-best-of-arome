import { proxy } from "valtio";

export const store = proxy({
  currentAudio: null,
  isPlaying: false,
});
