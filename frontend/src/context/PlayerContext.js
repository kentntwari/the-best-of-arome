import { createContext, useEffect, useState, useRef } from 'react';

import { useSWRAudioState } from '@/hooks/useSWRAudioState';

const PlayerContext = createContext(null);

const PlayerProvider = ({ children }) => {
  const [url, setUrl] = useState(null);

  const audio_ref = useRef();
  const [playerDetails] = useSWRAudioState();

  useEffect(() => {
    if (playerDetails.url !== '') {
      setUrl(playerDetails.url);
    }
  }, [playerDetails.url]);

  return (
    <PlayerContext.Provider value={{ audio_ref }}>
      <audio ref={audio_ref} src={url} preload="metadata" />
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerProvider, PlayerContext };
