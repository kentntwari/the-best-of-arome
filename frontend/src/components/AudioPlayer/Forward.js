import { memo } from "react";

import { useAudioPlayer } from "@/hooks/useAudioPlayer";

import { ForwardIcon } from "@heroicons/react/24/solid";

const Forward = ({ overrideForwardEvent = null, width = null, color = null }) => {
  const { methods } = useAudioPlayer();

  return (
    <ForwardIcon
      onClick={!overrideForwardEvent ? methods.forwardAudio : overrideForwardEvent}
      className={`${width ?? "w-7.5"} ${color && color} cursor-pointer`}
    />
  );
};

export default memo(Forward);
