import { useCallback } from 'react';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { usePlayerContext } from '@/hooks/usePlayerContext';
import { useSWRAudioState } from '@/hooks/useSWRAudioState';

import Play from './Play';
import Pause from './Pause';

/* IMPORTANT DISCLAIMER */
/* This components is best to be used for lists where you'd want to play an audio file 
from a list and avoid conflicts between audio files  */

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

  if (playerDetails.url === watchPlayedURL && context.globalAudioState.isPlaying === true)
    return <Pause />;

  if (
    playerDetails.url === watchPlayedURL &&
    context.globalAudioState.isPlaying === false
  )
    return <Play overridePlayEvent={triggerPlayEvent} />;

  return <Play overridePlayEvent={triggerPlayEvent} />;
};

export default ForceSwitchPlayPause;
