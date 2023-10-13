import { useEffect } from "react";
import { subscribe } from "valtio";
import { store as _ } from "@/store";

const useAudioAnimationFrame = (
  updateAnimationFrameFn,
  { src, global = false, scoped = false }
) => {
  if (!updateAnimationFrameFn || typeof updateAnimationFrameFn !== "function")
    throw new Error("useAudioAnimationFrame only accpets functions as arguments");

  if (!src) throw new Error("useAudioAnimationFrame requires an audio source to track");

  if ((!global && !scoped) || (global && scoped))
    throw new Error("useAudioAnimationFrame hook must be either global or scoped");

  useEffect(() => {
    subscribe(_, () => {
      let animate = false;

      function runAnimationUpdate() {
        updateAnimationFrameFn();

        if (animate === true) return requestAnimationFrame(runAnimationUpdate);
      }

      // evaluate when audio is global
      switch (global) {
        case _.isPlaying.global && _.currentAudio.global === src:
          {
            animate = true;
            window.requestAnimationFrame(runAnimationUpdate);
          }
          break;

        case !_.isPlaying.global || _.currentAudio.global !== src: {
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
      switch (scoped) {
        case _.isPlaying.scoped && _.currentAudio.scoped === src:
          {
            animate = true;
            window.requestAnimationFrame(runAnimationUpdate);
          }
          break;

        case !_.isPlaying.scoped || _.currentAudio.scoped !== src: {
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
  }, [global, scoped]);
};

export { useAudioAnimationFrame };
