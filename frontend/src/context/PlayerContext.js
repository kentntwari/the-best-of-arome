import { createContext, useState, useEffect, useRef } from 'react';

import { useSWRAudioState } from '@/hooks/useSWRAudioState';

const PlayerContext = createContext(null);

const PlayerProvider = ({ children }) => {
  const [url, setUrl] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const audio_ref = useRef();
  const [playerDetails] = useSWRAudioState();

  useEffect(() => {
    if (playerDetails.url !== '') {
      setUrl(playerDetails.url);
    }
  }, [playerDetails.url]);

  return (
    <>
      <audio
        ref={audio_ref}
        src={url}
        preload="metadata"
        onPlay={() => setIsAudioPlaying(true)}
        onPause={() => setIsAudioPlaying(false)}
      />
      <PlayerContext.Provider
        value={{ ref: audio_ref, isAudioPlaying, forceAudioPlay: setIsAudioPlaying }}>
        {children}
      </PlayerContext.Provider>
    </>
  );
};

export { PlayerProvider, PlayerContext };
