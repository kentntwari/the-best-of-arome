import { useContext } from 'react';

import { AudioPlayerContext } from '@/context/audioPlayer';

const useAudioPlayerContext = () => useContext(AudioPlayerContext);

export { useAudioPlayerContext };
