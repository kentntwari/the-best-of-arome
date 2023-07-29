import { useEffect, useRef } from 'react';

import Lottie from 'lottie-react';

import { usePlayerContext } from '@/hooks/usePlayerContext';

import audioWavesAnimation from '../../../public/audio-waves.json';

const AudioWavesAnimation = () => {
  const wavesAnimation_ref = useRef();

  const context = usePlayerContext();

  useEffect(() => {
    if (!context.globalAudioState.isPlaying) wavesAnimation_ref.current.stop();
    if (context.globalAudioState.isPlaying) wavesAnimation_ref.current.play();
  }, [context.globalAudioState.isPlaying]);

  return (
    <div
      className="h-[134px] flex place-content-center"
      style={{
        background:
          'radial-gradient(50% 50.00% at 50% 50.00%, #FFB456 0%, rgba(255, 180, 86, 0.70) 100%)',
      }}>
      <Lottie
        lottieRef={wavesAnimation_ref}
        animationData={audioWavesAnimation}
        loop={context.globalAudioState.isPlaying ? true : false}
      />
    </div>
  );
};

export default AudioWavesAnimation;
