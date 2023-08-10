import { memo, useRef } from 'react';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import useContextAnimationFrame from '@/hooks/useContextAnimationFrame';

const ProgressBar = ({ variant = '', overrideSeekingEvent = null }) => {
  const progressBar_ref = useRef();

  const { player, methods } = useAudioPlayer();

  useContextAnimationFrame(() => {
    if (progressBar_ref.current) {
      progressBar_ref.current.value = (player?.currentTime / player?.duration) * 100;
      progressBar_ref.current.style.background = `linear-gradient(to right,${
        variant === "" ? "var(--bg-progressBar-slider-track)" : variant
      } 0 ${progressBar_ref.current.value}%,#dedede 0)`;
    }
  });

  return (
    <input
      ref={progressBar_ref}
      onChange={!overrideSeekingEvent ? methods.seekTimeframe : overrideSeekingEvent}
      type="range"
      step={0.5}
      defaultValue={0}
      min={0}
      max={100}
      className={`grow h-2 appearance-none bg-neutral-40 rounded-full ${variant}`}
    />
  );
};

export default memo(ProgressBar);
