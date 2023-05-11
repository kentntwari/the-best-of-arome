import { AudioPlayerContext } from '@/context/audioPlayer';

const AudioPlayerProvider = ({ value, children }) => {
  return (
    <AudioPlayerContext.Provider value={value}>{children}</AudioPlayerContext.Provider>
  );
};

export default AudioPlayerProvider;
