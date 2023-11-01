import { proxy, ref, subscribe } from "valtio";
import { subscribeKey } from "valtio/utils";
import { optimizeURL } from "@/utils/optimizeURL";

export const store = proxy({
  global: {
    currentAudioID: null,
    currentAudioTitle: null,
    isPlaying: false,
    isForwarded: false,
    isRewinded: false,
    isSeeking: false,
    isLoadingNext: false,
    isLoadingPrevious: false,
    __seeked: ref({ value: 0 }),
  },
  scoped: {
    currentAudioID: null,
    currentAudioTitle: null,
    isPlaying: false,
    isForwarded: false,
    isRewinded: false,
    isSeeking: false,
    isLoadingNext: false,
    isLoadingPrevious: false,
    __seeked: ref({ value: 0 }),
  },
  __audio: ref({
    node: typeof Audio !== "undefined" ? new Audio() : null,
  }),
});

export const actions = {
  setAudio: (level, audioID, audioTitle) => {
    actions.pauseAudio();

    switch (level) {
      case "GLOBAL":
        store.global.currentAudioID = audioID;
        store.global.currentAudioTitle = audioTitle;
        break;

      case "SCOPED":
        store.scoped.currentAudioID = audioID;
        store.scoped.currentAudioTitle = audioTitle;
        break;

      default:
        throw new Error(
          "Audio can only be set on a GLOBAL or SCOPED level. The first argument of this callback should be GLOBAL or SCOPED"
        );
    }
  },
  playAudio: (level, audioID = null, audioTitle = null) => {
    actions.pauseAudio();

    if (audioID) {
      store.global.currentAudioID = audioID;
    }

    if (audioTitle) {
      store.global.currentAudioTitle = audioTitle;
    }

    switch (level) {
      case "GLOBAL":
        store.global.isPlaying = true;
        store.scoped.isPlaying = false;
        break;

      case "SCOPED":
        store.global.isPlaying = false;
        store.scoped.isPlaying = true;
        break;

      default:
        throw new Error(
          "Audio can only be played on a GLOBAL or SCOPED level. The first argument of this callback should be GLOBAL or SCOPED"
        );
    }
  },

  pauseAudio: (level) => {
    switch (level) {
      case "GLOBAL":
        store.global.isPlaying = false;
        break;

      case "SCOPED":
        store.scoped.isPlaying = false;
        break;

      default:
        store.global.isPlaying = false;
        store.scoped.isPlaying = false;
        break;
    }
  },
  forwardAudio: (level) => {
    switch (level) {
      case "GLOBAL":
        store.global.isForwarded = true;
        break;

      case "SCOPED":
        store.scoped.isForwarded = true;
        break;

      default:
        throw new Error(
          "Audio can only be forwarded on a GLOBAL or SCOPED level. The first argument of this callback should be GLOBAL or SCOPED"
        );
    }
  },
  rewindAudio: (level) => {
    switch (level) {
      case "GLOBAL":
        store.global.isRewinded = true;
        break;

      case "SCOPED":
        store.scoped.isRewinded = true;
        break;

      default:
        throw new Error(
          "Audio can only be rewinded on a GLOBAL or SCOPED level. The first argument of this callback should be GLOBAL or SCOPED"
        );
    }
  },
  seekAudio: (level, seekedValue) => {
    if (isNaN(seekedValue)) throw new Error("The seeked value is NaN");

    switch (level) {
      case "GLOBAL":
        store.global.isSeeking = true;
        store.global.__seeked.value = Number(seekedValue);
        break;

      case "SCOPED":
        store.scoped.isSeeking = true;
        store.scoped.__seeked.value = Number(seekedValue);
        break;

      default:
        throw new Error(
          "Audio can only be seeked on a GLOBAL or SCOPED level. The first argument of this callback should be GLOBAL or SCOPED"
        );
    }
  },
  loadNextAudio: (level, audioID, audioTitle = null) => {
    switch (level) {
      case "GLOBAL":
        store.global.isLoadingNext = true;
        store.global.currentAudioID = audioID;
        store.global.currentAudioTitle = audioTitle;
        break;

      case "SCOPED":
        store.scoped.isLoadingNext = true;
        store.scoped.currentAudioID = audioID;
        store.scoped.currentAudioTitle = audioTitle;
        break;

      default:
        throw new Error(
          "Audio can only be loaded/cued on a GLOBAL or SCOPED level. The first argument of this callback should be GLOBAL or SCOPED"
        );
    }
  },
  loadPreviousAudio: (level, audioID, audioTitle = null) => {
    switch (level) {
      case "GLOBAL":
        store.global.isLoadingPrevious = true;
        store.global.currentAudioID = audioID;
        store.global.currentAudioTitle = audioTitle;
        break;

      case "SCOPED":
        store.scoped.isLoadingPrevious = true;
        store.scoped.currentAudioID = audioID;
        store.scoped.currentAudioTitle = audioTitle;
        break;

      default:
        throw new Error(
          "Audio can only be loaded/cued on a GLOBAL or SCOPED level. The first argument of this callback should be GLOBAL or SCOPED"
        );
    }
  },
};

// Manually control of the global state of the current audio
// Since the react component is set to mute when global
// This presents an opportunity to emit audio events the audio globally externally
subscribe(store.global, () => {
  const audio = store.__audio.node;
  const seeked = store.global.__seeked.value;
  const src = store.global.currentAudioID;
  const isPlaying = store.global.isPlaying;
  const isSeeking = store.global.isSeeking;

  if (typeof Audio !== "undefined") {
    audio.src = optimizeURL({ publicID: src });
    audio.preload = "metadata";

    audio.addEventListener("loadedmetadata", () => {
      if (isSeeking) {
        audio.currentTime = (seeked * audio.duration) / 100;
      }
    });

    audio.addEventListener("ended", () => {
      audio.currentTime = 0;
    });

    if (isPlaying) {
      // Show loading animation.
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            // Automatic playback started!
            // Show playing UI.
            // We can now safely pause video...
            if (!isPlaying) audio.pause();
          })
          .catch((error) => {
            // Auto-play was prevented
            // Show paused UI.
            console.error(error);
            actions.pauseAudio("GLOBAL");
          });
      }
    }
  }
});
