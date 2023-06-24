import { useEffect, useRef, useCallback, useMemo } from 'react';

import {
  PlayCircleIcon,
  PauseCircleIcon,
  BackwardIcon,
  ForwardIcon,
} from '@heroicons/react/24/solid';

import { usePlayerContext } from '../usePlayerContext';
import { useSWRAudioState } from '../useSWRAudioState';

import { EVENTS } from './utils/audioEvents';
import { convertToMinutesSeconds as formatTime } from './utils/convertToMinutesSeconds';

const useAudioPlayer = (title = '', slug = '', url = '') => {
  const context = usePlayerContext();
  let player = context.ref.current;

  const [, setPlayerDetails] = useSWRAudioState();

  const timeoutRef = useRef();
  // reference the current time from a HTML element...
  // ...as the updated value will be directly inserted in the DOM
  const currentTime_ref = useRef();
  // reference the progress bar html element
  const progressBar_ref = useRef();
  const duration_ref = useRef();

  useEffect(() => {
    let mounted = true;

    if (mounted && player) {
      setTimeout(
        () =>
          duration_ref.current?.innerText &&
          (duration_ref.current.innerText = formatTime(player?.duration)),
        50
      );
    }

    if (mounted && !player) {
      player = new Audio(url);
      player.preload = 'metadata';
      player.addEventListener(EVENTS.PLAY_AUDIO, () => context.forceAudioPlay(true));
      player.addEventListener(EVENTS.PAUSE_AUDIO, () => context.forceAudioPlay(false));
    }

    return () => {
      mounted = false;
      player.removeEventListener(EVENTS.PLAY_AUDIO, () => context.forceAudioPlay(true));
      player.removeEventListener(EVENTS.PAUSE_AUDIO, () => context.forceAudioPlay(false));
    };
  }, [player]);

  // calculate expended audio time with animation frame...
  // ...to avoid needless re-rendering
  let animate = false;

  // render initial value of current audio time
  useEffect(() => {
    if (currentTime_ref.current) currentTime_ref.current.innerText = '00:00';

    const init = timeoutRef.current;

    return () => {
      clearTimeout(init);
    };
  }, []);

  let update = useCallback(() => {
    displayAudioCurrentTime();

    if (progressBar_ref.current) {
      fillProgressBarBackground();
    }

    if (animate === true) {
      requestAnimationFrame(update);
    }
  }, []);

  const displayAudioCurrentTime = useCallback(() => {
    if (currentTime_ref.current)
      currentTime_ref.current.innerText = formatTime(player?.currentTime) ?? '00:00';
  }, []);

  const fillProgressBarBackground = useCallback(() => {
    if (progressBar_ref.current) {
      progressBar_ref.current.value = (player?.currentTime / player?.duration) * 100;
      progressBar_ref.current.style.background = `linear-gradient(to right,#ae7137 0 ${progressBar_ref.current.value}%,#dedede 0)`;
    }
  }, []);

  // save play audio function
  const playAudio = useCallback(() => {
    animate = true;
    window.requestAnimationFrame(update);

    setPlayerDetails({ title, slug, url });

    setTimeout(() => player?.play(), 50);
  }, []);

  // save pause audio function
  const pauseAudio = useCallback(() => {
    animate = false;
    window.cancelAnimationFrame(update);

    setTimeout(() => player?.pause(), 50);
  }, []);

  // method for direct slider time change...
  // ...this will immediately impact the current time...
  // ... and appearance of the progress bar background
  const seekTimeframe = useCallback((e) => {
    player.currentTime = (player?.duration * e.target.value) / 100;
    displayAudioCurrentTime();
    fillProgressBarBackground();
  }, []);

  // method to jump forward 0.5s of the current time...
  // ...will freeze when it reached audio duration
  const forwardAudio = useCallback(() => {
    if (player?.currentTime < player?.duration) {
      player.currentTime += 0.5;
      displayAudioCurrentTime();
      fillProgressBarBackground();
    }
  }, [player?.currentTime]);

  // method to jump backwards 0.5s of the current time...
  // ...will freeze when it reached audio duration
  const backwardAudio = useCallback(() => {
    if (player?.currentTime >= 0) {
      player.currentTime -= 0.5;
      displayAudioCurrentTime();
      fillProgressBarBackground();
    }
  }, [player?.currentTime]);

  /* EXPORTED COMPONENTS */
  const Play = useMemo(
    () =>
      ({ variant = '' }) =>
        (
          <PlayCircleIcon
            onClick={playAudio}
            className={`w-10 text-ls-400 ${variant} cursor-pointer`}
          />
        ),
    []
  );

  const Pause = useMemo(
    () =>
      ({ variant = '' }) =>
        (
          <PauseCircleIcon
            onClick={pauseAudio}
            className={`w-10 text-ls-300 ${variant} cursor-pointer`}
          />
        ),
    []
  );

  const Back = useMemo(
    () =>
      ({ variant = '' }) =>
        (
          <BackwardIcon
            onClick={backwardAudio}
            className={`w-7.5 text-ls-300 ${variant} cursor-pointer`}
          />
        ),
    []
  );

  const Forward = useMemo(
    () =>
      ({ variant = '' }) =>
        (
          <ForwardIcon
            onClick={forwardAudio}
            className={`w-7.5 text-ls-300 ${variant} cursor-pointer`}
          />
        ),
    []
  );

  const CurrentTime = useMemo(
    () =>
      ({ variant = '', children }) => {
        return (
          <span className={`text-xs ${variant}`} ref={currentTime_ref}>
            {children}
          </span>
        );
      },
    []
  );

  const Duration = useMemo(
    () =>
      ({ variant = '', forceValue = null }) => {
        if (forceValue) return <span className={`text-xs ${variant}`}>{forceValue}</span>;

        return (
          <span ref={duration_ref} className={`text-xs ${variant}`}>
            {formatTime(duration_ref.current) ?? '--:--'}
          </span>
        );
      },
    []
  );

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
    player,
    methods: {
      playAudio,
      pauseAudio,
      forwardAudio,
      backwardAudio,
    },
    Components: {
      Play,
      Pause,
      Back,
      Forward,
      CurrentTime,
      Duration,
      ProgressBar,
    },
  };
};

export { useAudioPlayer };
