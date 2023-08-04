import { useEffect } from "react";

import { useRouter } from "next/router";

import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { usePlayerContext } from "@/hooks/usePlayerContext";

import Play from "./Play";
import Pause from "./Pause";
import Back from "./Back";
import Forward from "./Forward";
import Duration from "./Duration";
import CurrentTime from "./CurrentTime";
import ProgressBar from "./ProgressBar";

const AudioPlayer = ({
  enableDefaultFileReadings = true,
  enableDefaultControls = true,
  enableCustomization = false,
  children,
}) => {
  const router = useRouter();

  const { methods } = useAudioPlayer();
  const context = usePlayerContext();

  useEffect(() => {
    if (router.pathname === "/audio-message/[slug]" && !router.query.playlist)
      methods.pauseAudio();
  }, [router.pathname]);

  if (enableCustomization === true) {
    enableDefaultControls = false;

    return <>{children}</>;
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        {enableDefaultFileReadings && (
          <div className="grid grid-cols-[35px_1fr_35px] items-center gap-1">
            <CurrentTime>00:00</CurrentTime>
            <ProgressBar />
            <Duration />
          </div>
        )}
        {enableDefaultControls && (
          <div className="flex items-center justify-center gap-4">
            <Back />
            {context.globalAudioState.isPlaying === true ? <Pause /> : <Play />}
            <Forward />
          </div>
        )}
      </div>
    </>
  );
};

export default AudioPlayer;
