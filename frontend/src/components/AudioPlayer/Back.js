import { memo } from 'react';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';

import { BackwardIcon } from '@heroicons/react/24/solid';

const Back = ({ overrideRewindEvent = null }) => {
  const { methods } = useAudioPlayer();

  return (
    <BackwardIcon
      onClick={!overrideRewindEvent ? methods.backwardAudio : overrideRewindEvent}
      className={`w-7.5 text-ls-300 cursor-pointer`}
    />
  );
};

export default memo(Back);
