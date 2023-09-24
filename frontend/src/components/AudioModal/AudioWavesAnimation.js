import { memo, useEffect, useRef } from "react";

import Lottie from "lottie-react";
import { useSnapshot } from "valtio";

import { singleAudioProxyStore as store } from "@/store";

import audioWavesAnimation from "../../../public/audio-waves.json";

const MemoizedLottie = memo(Lottie);

const AudioWavesAnimation = () => {
  const wavesAnimation_ref = useRef();
  const snap = useSnapshot(store);

  useEffect(() => {
    if (!snap.isPlaying) wavesAnimation_ref.current.stop();
    if (snap.isPlaying) wavesAnimation_ref.current.play();
  }, [snap.isPlaying]);

  return (
    <div
      className="h-[134px] lg:h-60 flex place-content-center"
      style={{
        background: "var(--bg-audioWaves)",
      }}>
      <MemoizedLottie
        lottieRef={wavesAnimation_ref}
        animationData={audioWavesAnimation}
        loop={snap.isPlaying ? true : false}
      />
    </div>
  );
};

export default AudioWavesAnimation;
