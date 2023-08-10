import { memo } from "react";

import { useAudioPlayer } from "@/hooks/useAudioPlayer";

import { PlayCircleIcon } from "@heroicons/react/24/solid";

const Play = ({ overridePlayEvent = null, width = null, color = null }) => {
  const { methods } = useAudioPlayer();

  return (
    <PlayCircleIcon
      onClick={!overridePlayEvent ? methods.playAudio : overridePlayEvent}
      className={`${width ?? "w-10"} ${
        color ?? "text-ls-400 dark:text-white-300"
      } cursor-pointer`}
    />
  );
};

export default memo(Play);
