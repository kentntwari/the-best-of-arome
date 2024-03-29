import { memo, useEffect, useRef } from "react";

import Lottie from "lottie-react";
import { useSnapshot, subscribe } from "valtio";

import { store } from "@/store";

import audioWavesAnimation from "../../../public/audio-waves.json";

const MemoizedLottie = memo(Lottie);

const AudioWavesAnimation = ({ global = false, scoped = false }) => {
  const wavesAnimation_ref = useRef();
  const snap = useSnapshot(store);

  useEffect(() => {
    subscribe(store, () => {
      if (global && store.global.isPlaying) return wavesAnimation_ref.current.stop();
      if (scoped && store.scoped.isPlaying) return wavesAnimation_ref.current.play();
    });
  }, []);

  if ((!global && !scoped) || (global && scoped))
    throw new Error("AudioWavesAnimation must be either global or scoped");

  return (
    <div
      className="h-[134px] lg:h-60 flex place-content-center"
      style={{
        background: "var(--bg-audioWaves)",
      }}>
      {global ? (
        <MemoizedLottie
          lottieRef={wavesAnimation_ref}
          animationData={audioWavesAnimation}
          loop={snap.global.isPlaying ? true : false}
        />
      ) : null}

      {scoped ? (
        <MemoizedLottie
          lottieRef={wavesAnimation_ref}
          animationData={audioWavesAnimation}
          loop={snap.scoped.isPlaying ? true : false}
        />
      ) : null}
    </div>
  );
};

export default AudioWavesAnimation;
