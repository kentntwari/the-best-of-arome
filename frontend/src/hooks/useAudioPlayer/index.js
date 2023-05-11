import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import useEventListener from '@use-it/event-listener';

import { EVENTS } from './utils/audioEvents';
import { convertToMinutesSeconds as formatTime } from './utils/convertToMinutesSeconds';

const useAudioPlayer = (url) => {
  // Barebones state that need to be rendered or re-rendered
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(null);

  // instantiate reference for dynamic audio element
  const audio_ref = useRef();

  // reference the duration as it doesn't change...
  // ...per audio file that is playing
  const duration_ref = useRef();
  duration_ref.current = duration;

  // reference the current time from a HTML element...
  // ...as the updated value will be directly inserted...
  // ...in the DOM
  const currentTime_ref = useRef();

  // reference the progress bar html element
  const progressBar_ref = useRef();

  useEffect(() => {
    if (!url) {
      setIsReadyToPlay(false);
      console.error('No url was given as an argument for useAudioPlayer hook');
    }

    setIsReadyToPlay(true);

    audio_ref.current = new Audio();
    audio_ref.current.preload = 'metadata';
    audio_ref.current.src = url;
  }, [url]);

  // render initial value of current audio time
  useEffect(() => {
    if (currentTime_ref.current) currentTime_ref.current.innerText = '00:00';
  }, []);

  const displayAudioCurrentTime = useCallback(() => {
    if (currentTime_ref.current)
      currentTime_ref.current.innerText =
        formatTime(audio_ref.current?.currentTime) ?? '00:00';
  }, []);

  const fillProgressBarBackground = useCallback(() => {
    progressBar_ref.current.value =
      (audio_ref.current?.currentTime / duration_ref.current) * 100;
    progressBar_ref.current.style.background = `linear-gradient(to right,#ae7137 0 ${progressBar_ref.current.value}%,#dedede 0)`;
  }, []);

  // calculate expended audio time with animation frame...
  // ...to avoid needless re-rendering
  let animate = false;

  let update = useCallback(() => {
    displayAudioCurrentTime();

    if (progressBar_ref.current) {
      fillProgressBarBackground();
    }

    if (animate === true) {
      requestAnimationFrame(update);
    }
  }, []);

  // set audio state to isPlaying...
  const readAudioIsPlaying = useCallback(() => {
    return setIsPlaying(true);
  }, []);

  // set audio state to pause...
  const readAudioIsPaused = useCallback(() => {
    return setIsPlaying(false);
  }, []);

  // save play audio function
  const playAudio = useCallback(() => {
    animate = true;
    window.requestAnimationFrame(update);

    return audio_ref.current?.play();
  }, []);

  // save pause audio function
  const pauseAudio = useCallback(() => {
    animate = false;
    window.cancelAnimationFrame(update);

    return audio_ref.current?.pause();
  }, []);

  // method for direct slider time change...
  // ...this will immediately impact the current time...
  // ... and appearance of the progress bar background
  const seekTimeframe = useCallback((e) => {
    audio_ref.current.currentTime = (duration_ref.current * e.target.value) / 100;
    displayAudioCurrentTime();
    fillProgressBarBackground();
  }, []);

  // method to jump forward 0.5s of the current time...
  // ...will freeze when it reached audio duration
  const forwardAudio = useCallback(() => {
    if (audio_ref.current?.currentTime < duration_ref.current) {
      audio_ref.current.currentTime += 0.5;
      displayAudioCurrentTime();
      fillProgressBarBackground();
    }
  }, [audio_ref.current?.currentTime]);

  // method to jump backwards 0.5s of the current time...
  // ...will freeze when it reached audio duration
  const backwardAudio = useCallback(() => {
    if (audio_ref.current?.currentTime >= 0) {
      audio_ref.current.currentTime -= 0.5;
      displayAudioCurrentTime();
      fillProgressBarBackground();
    }
  }, [audio_ref.current?.currentTime]);

  // audio event listener to calculate how many...
  // ...frames are available to be played
  useEventListener(
    EVENTS.LOADED,
    () => {
      if (audio_ref.current.readyState === 0) {
        setIsReadyToPlay(false);
        console.warn('no enough frame loaded to play file');
      }

      setIsReadyToPlay(true);
    },
    audio_ref.current
  );

  // audio event listener that sends duration...
  // ..as soon as enough metdata is available
  useEventListener(
    EVENTS.LOADED_METADATA,
    () => setDuration(audio_ref.current?.duration),
    audio_ref.current
  );

  // audio event listener that listens if the audio is playing
  useEventListener(EVENTS.PLAY_AUDIO, readAudioIsPlaying, audio_ref.current);

  // audio event listener that listens if audio is paused
  useEventListener(EVENTS.PAUSE_AUDIO, readAudioIsPaused, audio_ref.current);

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
          onChange={seekTimeframe}
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

  return {
    exportedComponents: {
      CurrentTime,
      Duration,
      ProgressBar,
    },
    state: {
      ready: isReadyToPlay,
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
      updateCurrentTime: {
        forwardAudio,
        backwardAudio,
      },
      updateDuration: (newDuration) => setDuration(newDuration),
    },
  };
};

export { useAudioPlayer };
