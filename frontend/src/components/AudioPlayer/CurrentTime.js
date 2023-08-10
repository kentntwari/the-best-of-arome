import { useRef, memo } from 'react';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import useContextAnimationFrame from '@/hooks/useContextAnimationFrame';

import { convertToMinutesSeconds } from '../../utils/convertToMinutesSeconds';

const CurrentTime = ({ children, fontSize = null, fontWeight = null, color = null }) => {
  const currentTime_ref = useRef();

  const { player } = useAudioPlayer();

  useContextAnimationFrame(() => {
    if (currentTime_ref.current)
      currentTime_ref.current.innerText =
        convertToMinutesSeconds(player?.currentTime) ?? "00:00";
  });

  return (
    <span
      className={`${fontSize ?? "text-xs"} ${fontWeight && fontWeight} ${color ?? color}`}
      ref={currentTime_ref}>
      {children}
    </span>
  );
};

export default memo(CurrentTime);
