import { createContext, useState, useEffect, useRef } from 'react';

import { useSWRAudioState } from '@/hooks/useSWRAudioState';

const PlayerContext = createContext(null);

const PlayerProvider = ({ children }) => {
  const [url, setUrl] = useState(null);
  const [globalAudioDuration, setGlobalAudioDuration] = useState(null);
  const [isGlobalAudioPlaying, setIsGlobalAudioPlaying] = useState(false);

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
        onLoadedMetadata={() => setGlobalAudioDuration(audio_ref.current.duration)}
        onPlay={() => setIsGlobalAudioPlaying(true)}
        onPause={() => setIsGlobalAudioPlaying(false)}
      />
      <PlayerContext.Provider
        value={{
          ref: audio_ref.current,
          globalAudioState: {
            isPlaying: isGlobalAudioPlaying,
            duration: globalAudioDuration,
          },
          forceGlobalAudioState: {
            toPlay: () => setIsGlobalAudioPlaying(true),
            toPause: () => setIsGlobalAudioPlaying(false),
          },
        }}>
        {children}
      </PlayerContext.Provider>
    </>
  );
};

export { PlayerProvider, PlayerContext };
