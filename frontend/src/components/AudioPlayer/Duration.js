import { useRef } from 'react';

import { usePlayerContext } from '@/hooks/usePlayerContext';

import { convertToMinutesSeconds } from '../../utils/convertToMinutesSeconds';

const Duration = ({ forceValue = null }) => {
  const duration_ref = useRef();

  const context = usePlayerContext();

  if (forceValue) return <span className={`text-xs`}>{forceValue}</span>;

  return (
    <span ref={duration_ref} className={`text-xs`}>
      {convertToMinutesSeconds(context.globalAudioState.duration) ?? '--:--'}
    </span>
  );
};

export default Duration;
