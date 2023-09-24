import { useEffect, useRef } from "react";

import { useSnapshot, subscribe } from "valtio";

import { singleAudioProxyStore as _ } from "@/store";

import { optimizeURL } from "@/utils/optimizeURL";

// configured the audio in its own component
// to avoid re-renders caused by context
const Wrapper = ({ children }) => {
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

  return (
    <>
      <audio
        ref={audio_ref}
        src={optimizeURL({ publicID: snap.currentAudio })}
        preload="metadata"
      />
      {children}
    </>
  );
};

export default Wrapper;
