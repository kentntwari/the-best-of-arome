import { useContext } from 'react';

import { PlayerContext } from '@/context/PlayerContext';

const usePlayerContext = () => {
  const context = useContext(PlayerContext);

  if (!context) throw new Error('usePlayerContext must be used within PlayerProvider');

  return context;
};

export { usePlayerContext };
