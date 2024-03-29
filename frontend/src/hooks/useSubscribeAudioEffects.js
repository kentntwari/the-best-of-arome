import { useEffect } from "react";
import { proxy, subscribe } from "valtio";
import { store, actions as storeActions } from "@/store";

const useSubscribeAudioEffects = (currentAudio, { global = false, scoped = false }) => {
  useEffect(() => {
    subscribe(store, () => {
      // Set a facade to reactively play the audio within react compoent tree albeit muted
      // in order to take advantage ffo react lifecycle
      if (global && store.global.isPlaying) {
        // Show loading animation.
        const playPromise = currentAudio?.current?.play();

        if (playPromise !== undefined) {
          playPromise
            .then((_) => {
              // Automatic playback started!
              // Show playing UI.
              // We can now safely pause video...
              if (global && !store.global.isPlaying) currentAudio?.current?.pause();
            })
            .catch((error) => {
              // Auto-play was prevented
              // Show paused UI.
              console.error(error);
              store.global.isPlaying = false;
            });
        }
      }

      if (scoped && store.scoped.isPlaying) {
        // Show loading animation.
        const playPromise = currentAudio?.current?.play();

        if (playPromise !== undefined) {
          playPromise
            .then((_) => {
              // Automatic playback started!
              // Show playing UI.
              // We can now safely pause video...
              if (scoped && !store.scoped.isPlaying) currentAudio?.current?.pause();
            })
            .catch((error) => {
              // Auto-play was prevented
              // Show paused UI.
              console.error(error);
              store.scoped.isPlaying = false;
            });
        }
      }

      if (global && store.global.isForwarded) {
        switch (currentAudio?.current?.currentTime) {
          case null || undefined:
            console.warn("A possible breaking error occured when reading current time");
            break;

          default:
            currentAudio.current.currentTime += 0.5;
            store.global.isForwarded = false;
            break;
        }
      }

      if (scoped && store.scoped.isForwarded) {
        switch (currentAudio?.current?.currentTime) {
          case null || undefined:
            console.warn("A possible breaking error occured when reading current time");
            break;

          default:
            currentAudio.current.currentTime += 0.5;
            store.scoped.isForwarded = false;
            break;
        }
      }

      if (global && store.global.isRewinded) {
        switch (currentAudio?.current?.currentTime) {
          case null || undefined:
            console.warn("A possible breaking error occured when reading current time");
            break;

          default:
            currentAudio.current.currentTime -= 0.5;
            store.global.isRewinded = false;
            break;
        }
      }

      if (scoped && store.scoped.isRewinded) {
        switch (currentAudio?.current?.currentTime) {
          case null || undefined:
            console.warn("A possible breaking error occured when reading current time");
            break;

          default:
            currentAudio.current.currentTime -= 0.5;
            store.scoped.isRewinded = false;
            break;
        }
      }

      if (global && store.global.isSeeking) {
        switch (currentAudio?.current?.currentTime) {
          case null || undefined:
            console.warn("A possible breaking error occured when reading current time");
            break;

          default:
            currentAudio.current.currentTime =
              (store.global.__seeked.value * currentAudio?.current?.duration) / 100;

            store.global.isSeeking = false;
            break;
        }
      }

      if (scoped && store.scoped.isSeeking) {
        switch (currentAudio?.current?.currentTime) {
          case null || undefined:
            console.warn("A possible breaking error occured when reading current time");
            break;

          default:
            currentAudio.current.currentTime =
              (store.scoped.__seeked.value * currentAudio?.current?.duration) / 100;

            store.scoped.isSeeking = false;
            break;
        }
      }
    });
  }, [global, scoped]);
};

export { useSubscribeAudioEffects };
