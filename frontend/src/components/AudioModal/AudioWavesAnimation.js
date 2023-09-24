import { useEffect, useRef } from "react";

import Lottie from "lottie-react";
import { useSnapshot } from "valtio";

import { valtioProxyStore as _ } from "@/store/valtioProxyStore";

import audioWavesAnimation from "../../../public/audio-waves.json";

const AudioWavesAnimation = () => {
  const wavesAnimation_ref = useRef();
  const snap = useSnapshot(_);

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
      <Lottie
        lottieRef={wavesAnimation_ref}
        animationData={audioWavesAnimation}
        loop={snap.isPlaying ? true : false}
      />
    </div>
  );
};

export default AudioWavesAnimation;
