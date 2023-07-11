import { memo, useCallback } from 'react';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { usePlayerContext } from '@/hooks/usePlayerContext';
import { useSWRAudioState } from '@/hooks/useSWRAudioState';

import * as defaultClasses from '@/hooks/useAudioPlayer/utils/defaultClasses';

import { PlayCircleIcon, PauseCircleIcon } from '@heroicons/react/24/solid';

const Play = memo(PlayCircleIcon);
const Pause = memo(PauseCircleIcon);

const ForceSwitchPlayPause = ({ watchPlayedTitle, watchPlayedSlug, watchPlayedURL }) => {
  const context = usePlayerContext();

  const [playerDetails, setPlayerDetails] = useSWRAudioState();

  const { methods } = useAudioPlayer();

  const triggerPlayEvent = useCallback(() => {
    setPlayerDetails({
      title: watchPlayedTitle,
      slug: watchPlayedSlug,
      url: watchPlayedURL,
    });

    return methods.playAudio();
  }, []);

  if (playerDetails.url === watchPlayedURL && context.isAudioPlaying === true)
    return (
      <Pause
        className={`${defaultClasses.pauseButtonClass}`}
        onClick={methods.pauseAudio}
      />
    );

  if (playerDetails.url === watchPlayedURL && context.isAudioPlaying === false)
    return (
      <Play className={`${defaultClasses.playButtonClass}`} onClick={triggerPlayEvent} />
    );

  return (
    <Play className={`${defaultClasses.playButtonClass}`} onClick={triggerPlayEvent} />
  );
};

export default ForceSwitchPlayPause;
