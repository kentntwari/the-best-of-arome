import { memo } from 'react';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';

import { ForwardIcon } from '@heroicons/react/24/solid';

const Forward = ({ overrideForwardEvent = null }) => {
  const { methods } = useAudioPlayer();

  return (
    <ForwardIcon
      onClick={!overrideForwardEvent ? methods.forwardAudio : overrideForwardEvent}
      className={`w-7.5 text-ls-300 cursor-pointer`}
    />
  );
};

export default memo(Forward);
