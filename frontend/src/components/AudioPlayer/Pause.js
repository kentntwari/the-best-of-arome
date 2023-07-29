import { memo } from 'react';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';

import { PauseCircleIcon } from '@heroicons/react/24/solid';

const Pause = ({ overridePauseEvent = null }) => {
  const { methods } = useAudioPlayer();

  return (
    <PauseCircleIcon
      onClick={!overridePauseEvent ? methods.pauseAudio : overridePauseEvent}
      className={`w-10 text-ls-300 cursor-pointer`}
    />
  );
};

export default memo(Pause);
