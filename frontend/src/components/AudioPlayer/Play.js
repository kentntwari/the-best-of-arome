import { memo } from 'react';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';

import { PlayCircleIcon } from '@heroicons/react/24/solid';

const Play = ({ overridePlayEvent = null }) => {
  const { methods } = useAudioPlayer();

  return (
    <PlayCircleIcon
      onClick={!overridePlayEvent ? methods.playAudio : overridePlayEvent}
      className={`w-10 text-ls-400 cursor-pointer`}
    />
  );
};

export default memo(Play);
