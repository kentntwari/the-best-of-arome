import { memo } from "react";

import { useAudioPlayer } from "@/hooks/useAudioPlayer";

import { PauseCircleIcon } from "@heroicons/react/24/solid";

const Pause = ({ overridePauseEvent = null, width = null, color = null }) => {
  const { methods } = useAudioPlayer();

  return (
    <PauseCircleIcon
      onClick={!overridePauseEvent ? methods.pauseAudio : overridePauseEvent}
      className={`${width ?? "w-10"} ${color && color} cursor-pointer`}
    />
  );
};

export default memo(Pause);
