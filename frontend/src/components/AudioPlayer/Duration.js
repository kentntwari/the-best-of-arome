import { useRef } from "react";

import { usePlayerContext } from "@/hooks/usePlayerContext";

import { convertToMinutesSeconds } from "../../utils/convertToMinutesSeconds";

const Duration = ({
  forceValue = null,
  fontSize = null,
  fontWeight = null,
  color = null,
}) => {
  const duration_ref = useRef();

  const context = usePlayerContext();

  if (forceValue)
    return (
      <span
        className={`${fontSize ?? "text-xs"} ${fontWeight && fontWeight} ${
          color ?? color
        }`}>
        {forceValue}
      </span>
    );

  return (
    <span
      ref={duration_ref}
      className={`${fontSize ?? "text-xs"} ${fontWeight && fontWeight} ${
        color ?? color
      }`}>
      {convertToMinutesSeconds(context.globalAudioState.duration) ?? "--:--"}
    </span>
  );
};

export default Duration;
