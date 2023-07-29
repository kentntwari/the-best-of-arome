import { useEffect } from 'react';

import { usePlayerContext } from './usePlayerContext';

const useContextAnimationFrame = (functionToRun) => {
  if (typeof functionToRun !== 'function')
    console.error(
      'argument in hook useRequestAnimationFrame is not a function. This hook requires a function to run'
    );

  const context = usePlayerContext();

  let animate = false;

  function update() {
    functionToRun();

    if (animate === true) {
      requestAnimationFrame(update);
    }
  }

  useEffect(() => {
    if (context.globalAudioState.isPlaying === true) {
      animate = true;
      window.requestAnimationFrame(update);
    }

    if (context.globalAudioState.isPlaying === false) {
      animate = false;
      window.cancelAnimationFrame(update);
    }
  }, [context.globalAudioState.isPlaying]);
};

export default useContextAnimationFrame;
