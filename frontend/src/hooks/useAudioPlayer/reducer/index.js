import { ACTIONS } from '../actions';

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.CAN_PLAY: {
      return {
        ...state,
        isReadyToPlay: true,
      };
    }

    case ACTIONS.PLAY_AUDIO: {
      return {
        ...state,
        isPlaying: true,
        isPaused: false,
      };
    }

    case ACTIONS.PAUSE_AUDIO: {
      return {
        ...state,
        isPlaying: false,
        isPaused: true,
      };
    }

    case ACTIONS.SET_DURATION: {
      return {
        ...state,
        duration: action.payload,
      };
    }

    case ACTIONS.DURATION_IS_NaN: {
      return {
        ...state,
        duration: null,
      };
    }
  }
}
