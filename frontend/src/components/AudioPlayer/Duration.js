import { useRef } from "react";

import { usePlayerContext } from "@/hooks/usePlayerContext";

import { convertToMinutesSeconds } from "../../utils/convertToMinutesSeconds";

const Duration = ({ value = null, fontSize = null, fontWeight = null, color = null }) => {
  const duration_ref = useRef();

  const context = usePlayerContext();

  // provided value in props
  if (value)
    return (
      <span
        className={`${fontSize ?? "text-xs lg:text-sm"} ${fontWeight && fontWeight} ${
          color ?? color
        }`}>
        {value}
      </span>
    );

  // by default will display currently playing audio in context
  return (
    <span
      ref={duration_ref}
      className={`${fontSize ?? "text-xs lg:text-sm"} ${fontWeight && fontWeight} ${
        color ?? color
      }`}>
      {convertToMinutesSeconds(context.globalAudioState.duration) ?? "--:--"}
    </span>
  );
};

export default Duration;
