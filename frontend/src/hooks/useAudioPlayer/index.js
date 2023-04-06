import { useReducer, useCallback, useRef, useEffect } from 'react';
import { useEventListener } from '../useEventListener';
import { reducer } from './reducer';
import { ACTIONS } from './actions';
import { EVENTS } from './events';

const useAudioPlayer = (source) => {
  // create a new audio instance to control audio...
  // ...in the background without needing to attach...
  // ...an actual HTML element and reference it to avoid...
  // ...multiple re-renders
  const audioRef = useRef(null);
  function getAudio() {
    if (audioRef.current !== null) return audioRef.current;

    const audio = new Audio(source);
    audioRef.current = audio;

    return audio;
  }

  // Default object to be controlled by a reducer
  const defaultAudioState = {
    isReadyToPlay: false,
    isPlaying: false,
    isPaused: true,
    duration: null,
  };

  // initalizing reducer
  const [state, dispatch] = useReducer(reducer, defaultAudioState);

  // check if enough data is available to play
  // with the `canplaythrough`audio event...
  // ...we`ll determine if the full length...
  // ...of the audio is even available to play
  useEventListener(
    EVENTS.CAN_PLAY_THROUGH,
    () => dispatch({ type: ACTIONS.CAN_PLAY }),
    getAudio()
  );

  /* retrieve some useful metadata like duration
  by checking the DOM if any metata was loaded */
  function retrieveAudioDuration() {
    if (getAudio().duration === NaN) return dispatch({ type: ACTIONS.DURATION_IS_NaN });

    // format duration to common standards...
    //...of minute and seconds...
    //...and send duration if there is
    let minutes = Math.floor(getAudio().duration / 60);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let seconds = Math.floor(getAudio().duration % 60);
    seconds = seconds < 10 ? '0' + seconds : seconds;

    dispatch({ type: ACTIONS.SET_DURATION, payload: `${minutes}:${seconds}` });
  }

  useEventListener(EVENTS.LOADED_METADATA, retrieveAudioDuration, getAudio());

  // // Wrapper around the play functionality
  const playAudio = useCallback(() => {
    if (!state.isPlaying) {
      dispatch({ type: ACTIONS.PLAY_AUDIO });
      return getAudio().play();
    }
  }, [state.isPlaying]);

  // // Wrapper around pause functionality
  const pauseAudio = useCallback(() => {
    if (!state.isPaused) {
      dispatch({ type: ACTIONS.PAUSE_AUDIO });
      return getAudio().pause();
    }
  }, [state.isPaused]);

  return {
    readOutput: state,
    actions: {
      playAudio,
      pauseAudio,
    },
  };
};

export { useAudioPlayer };