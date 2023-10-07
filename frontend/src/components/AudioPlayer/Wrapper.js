import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

import { useSnapshot, subscribe } from "valtio";

import { store as _ } from "@/store";

import { optimizeURL } from "@/utils/optimizeURL";

const Wrapper = forwardRef(({ children, fallBack, title }, ref) => {
  const snap = useSnapshot(_);

  const audio_ref = useRef();

  useEffect(() => {
    subscribe(_, () => {
      if (_.currentAudio && _.isPlaying)
        return new Promise((resolve) =>
          setTimeout(() => resolve(audio_ref?.current?.play()), 5)
        );
      if (_.currentAudio && !_.isPlaying) return audio_ref?.current?.pause();
    });
  }, []);

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

  return (
    <>
      <audio
        ref={audio_ref}
        src={optimizeURL({ publicID: snap.currentAudio }) ?? fallBack}
        title={title}
        preload="metadata"
      />
      {children}
    </>
  );
});

export default Wrapper;
