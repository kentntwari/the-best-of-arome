import { useEffect } from "react";
import { subscribe } from "valtio";
import { store } from "@/store";

const useAnimateAudioUpdates = (updateAnimationFrameFn, { src }) => {
  if (!updateAnimationFrameFn || typeof updateAnimationFrameFn !== "function")
    throw new Error("useAnimateAudioUpdates accepts only functions as arguments");

  if (!src) throw new Error("useAnimateAudioUpdates requires an audio source to track");

  useEffect(() => {
    subscribe(store, () => {
      let animate = false;

      function runAnimationUpdate() {
        updateAnimationFrameFn();

        if (animate) requestAnimationFrame(runAnimationUpdate);
      }

      // evaluate when audio is global
      switch (store.global.isPlaying) {
        case store.global.isPlaying && store.global.currentAudioID === src:
          {
            animate = true;
            window.requestAnimationFrame(runAnimationUpdate);
          }
          break;

        case !store.global.isPlaying || store.global.currentAudioID !== src: {
          animate = false;
          window.cancelAnimationFrame(runAnimationUpdate);
          return;
        }

        default: {
          window.cancelAnimationFrame(runAnimationUpdate);
          return;
        }
      }

      // evaluate when audio is scoped
      switch (store.scoped.isPlaying) {
        case store.scoped.isPlaying && store.scoped.currentAudioID === src:
          {
            animate = true;
            window.requestAnimationFrame(runAnimationUpdate);
          }
          break;

        case !store.scoped.isPlaying || store.scoped.currentAudioID !== src: {
          animate = false;
          window.cancelAnimationFrame(runAnimationUpdate);
          return;
        }

        default: {
          window.cancelAnimationFrame(runAnimationUpdate);
          return;
        }
      }
    });
  }, []);
};

export { useAnimateAudioUpdates };
