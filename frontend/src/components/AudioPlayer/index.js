import { useEffect } from "react";

import { useRouter } from "next/router";

import { useAudioPlayer } from "@/hooks/useAudioPlayer";

import DefaultControls from "./DefaultControls";
import DefaultFileReadings from "./DefaultFileReadings";

const AudioPlayer = ({
  enableDefaultFileReadings = true,
  enableDefaultControls = true,
  enableCustomization = false,
  children,
}) => {
  const router = useRouter();

  const { methods } = useAudioPlayer();

  useEffect(() => {
    if (router.pathname === "/audio-message/[slug]" && !router.query.playlist)
      methods.pauseAudio();
  }, [router.pathname]);

  if (
    enableCustomization === true &&
    enableDefaultControls === false &&
    enableDefaultFileReadings === false
  ) {
    return <>{children}</>;
  }

  if (enableCustomization === true && enableDefaultControls === false) {
    return (
      <>
        <DefaultFileReadings />
        {children}
      </>
    );
  }

  if (enableCustomization === true && enableDefaultFileReadings === false) {
    return (
      <>
        {children}
        <DefaultControls />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        <DefaultFileReadings />
        <DefaultControls />
      </div>
    </>
  );
};

export default AudioPlayer;
