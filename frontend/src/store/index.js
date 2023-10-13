import { proxy, ref } from "valtio";

export const store = proxy({
  currentAudio: {
    global: null,
    scoped: null,
  },
  isPlaying: {
    global: false,
    scoped: false,
  },
});

export const actions = {
  setGlobal: (audioSrc) => {
    actions.pauseAll();
    store.currentAudio.global = audioSrc;
  },
  setScoped: (audioSrc) => {
    actions.pauseAll();
    store.currentAudio.scoped = audioSrc;
  },
  playGlobal: (audioSrc) => {
    actions.pauseAll();
    store.currentAudio.global = audioSrc;
    store.isPlaying.global = true;
  },
  playScoped: (audioSrc) => {
    actions.pauseAll();
    store.currentAudio.scoped = audioSrc;
    store.isPlaying.scoped = true;
  },
  pauseGlobal: () => {
    store.isPlaying.global = false;
  },
  pauseScoped: () => {
    store.isPlaying.scoped = false;
  },
  pauseAll: () => {
    if (store.isPlaying.scoped) actions.pauseScoped();
    if (store.isPlaying.global) actions.pauseGlobal();
  },
};
