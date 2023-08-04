import { createContext, useState, useEffect, useRef } from "react";

import { useSWRAudioState } from "@/hooks/useSWRAudioState";

const PlayerContext = createContext(null);

const PlayerProvider = ({ children }) => {
  const [url, setUrl] = useState(null);
  const [title, setTitle] = useState(null);
  const [globalAudioDuration, setGlobalAudioDuration] = useState(null);
  const [isGlobalAudioPlaying, setIsGlobalAudioPlaying] = useState(false);

  const audio_ref = useRef();
  const [playerDetails] = useSWRAudioState();

  useEffect(() => {
    if (playerDetails.url !== "") {
      setUrl(playerDetails.url);
      setTitle(playerDetails.title);
    }
  }, [playerDetails.url]);

  return (
    <>
      <audio
        ref={audio_ref}
        src={url}
        preload="metadata"
        title={title}
        onLoadedMetadata={() => setGlobalAudioDuration(audio_ref.current.duration)}
        onPlay={() => setIsGlobalAudioPlaying(true)}
        onPause={() => setIsGlobalAudioPlaying(false)}
      />
      <PlayerContext.Provider
        value={{
          ref: audio_ref.current,
          globalAudioState: {
            title,
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
