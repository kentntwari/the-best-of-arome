import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { useSnapshot, subscribe } from "valtio";
import { store as _ } from "@/store";
import { optimizeURL } from "@/utils/optimizeURL";

const Audio = forwardRef(({ children, global = false, scoped = false }, ref) => {
  const snap = useSnapshot(_);

  const audio_ref = useRef();

  useEffect(() => {
    subscribe(_.isPlaying, () => {
      if (global && _.isPlaying.global)
        return new Promise((resolve) =>
          setTimeout(() => resolve(audio_ref?.current?.play()), 5)
        );

      if (global && !_.isPlaying.global) return audio_ref?.current?.pause();

      if (scoped && _.isPlaying.scoped)
        return new Promise((resolve) =>
          setTimeout(() => resolve(audio_ref?.current?.play()), 5)
        );

      if (scoped && !_.isPlaying.scoped) return audio_ref?.current?.pause();
    });
  }, [global, scoped]);

  useImperativeHandle(
    ref,
    () => {
      return {
        exposeAudioCurrentTime() {
          return audio_ref.current.currentTime;
        },
        exposeAudioDuration() {
          return audio_ref.current.duration;
        },
      };
    },
    []
  );

  if ((!global && !scoped) || (global && scoped))
    throw new Error("Audio must be either global or scoped");

  return (
    <>
      <audio
        ref={audio_ref}
        src={
          global
            ? optimizeURL({ publicID: snap.currentAudio.global })
            : optimizeURL({ publicID: snap.currentAudio.scoped })
        }
        title={global ? _.currentAudio.global : _.currentAudio.scoped}
        preload="metadata"
      />
      {children}
    </>
  );
});

export default Audio;
