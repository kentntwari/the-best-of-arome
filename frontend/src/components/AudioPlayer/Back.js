import { memo } from 'react';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';

import { BackwardIcon } from '@heroicons/react/24/solid';

const Back = ({ overrideRewindEvent = null, width = null, color = null }) => {
  const { methods } = useAudioPlayer();

  return (
    <BackwardIcon
      onClick={!overrideRewindEvent ? methods.backwardAudio : overrideRewindEvent}
      className={`${width ?? "w-7.5"} ${color && color} cursor-pointer`}
    />
  );
};

export default memo(Back);
