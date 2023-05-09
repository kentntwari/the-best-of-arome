import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import { convertToMinutesSeconds as formatTime } from '@/hooks/useAudioPlayer/utils/convertToMinutesSeconds';

const useAudioPlayer = (player) => {
  // Barebones state that need to be rendered or re-rendered
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(null);

  // render duration on mount
  useEffect(() => {
    setDuration(player?.duration);
  }, [player?.duration]);

  // render initial value of current audio time
  useEffect(() => {
    if (currentTime_ref.current) currentTime_ref.current.innerText = '00:00';
  }, []);

  // reference the duration as it doesn't change...
  // ...per audio file that is playing
  const duration_ref = useRef();
  duration_ref.current = duration;

  // reference the current time from a HTML element...
  // ...as th eupdated value will be directly inserted...
  // ...in the DOM
  const currentTime_ref = useRef();

  // reference the progress bar html element
  const progressBar_ref = useRef();

  // calculate expended audio time with animation frame...
  // ...to avoid needless re-rendering
  let animate = false;

  let update = () => {
    currentTime_ref.current.innerText = formatTime(player?.currentTime);

    progressBar_ref.current.value = (player?.currentTime / duration_ref.current) * 100;

    progressBar_ref.current.style.background = `linear-gradient(to right,#ae7137 0 ${progressBar_ref.current.value}%,#dedede 0)`;

    if (animate === true) {
      requestAnimationFrame(update);
    }
  };

  // Exported JSX element for current time
  const CurrentTime = useMemo(
    () =>
      ({ className = 'text-xs', children }) => {
        return (
          <span className={className} ref={currentTime_ref}>
            {children}
          </span>
        );
      },
    []
  );

  // Exported JSX element for duration
  const Duration = useMemo(
    () =>
      ({ className = 'text-xs' }) => {
        return (
          <span className={className}>{formatTime(duration_ref.current) ?? '--:--'}</span>
        );
      },
    []
  );

  // Exported JSX element for range input type element
  const ProgressBar = useMemo(
    () => () =>
      (
        <input
          ref={progressBar_ref}
          type="range"
          step={0.5}
          defaultValue={0}
          min={0}
          max={100}
          className="grow h-2 appearance-none bg-neutral-40 rounded-full"
        />
      ),
    []
  );

  // set audio state to isPlaying...
  const readAudioIsPlaying = useCallback(() => {
    return setIsPlaying(true);
  }, []);

  // set audio state to pause...
  const readAudioIsPaused = useCallback(() => {
    return setIsPlaying(false);
  }, []);

  // save play audio function
  const playAudio = () => {
    animate = true;
    window.requestAnimationFrame(update);

    return player?.play();
  };

  // save pause audio function
  const pauseAudio = () => {
    animate = false;
    window.cancelAnimationFrame(update);

    return player?.pause();
  };

  return {
    exportedComponents: {
      CurrentTime,
      Duration,
      ProgressBar,
    },
    state: {
      audioIsPlaying: isPlaying,
    },
    methods: {
      playAudio,
      pauseAudio,
      updateAnimationFrame: update,
      updateAudioState: {
        isPlaying: readAudioIsPlaying,
        isPaused: readAudioIsPaused,
      },
      updateDuration: (newDuration) => setDuration(newDuration),
    },
  };
};

export { useAudioPlayer };
