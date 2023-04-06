// Instead of raw strings passed in the reducer...
// ...opted instead for an object based approach...
// ...for easy updating
export const ACTIONS = {
  // This will be used to determine whether or not...
  // we should even display the play button
  CAN_PLAY: 'CAN_PLAY',

  // This will control the play behaviuor
  PLAY_AUDIO: 'PLAY',

  // This will control the pause behavior
  PAUSE_AUDIO: 'PAUSE',

  // This will control the duration display...
  // ...as in the full audio length
  SET_DURATION: 'SET_AUDIO_LENGTH',

  // Duration was retrieved but it's NaN
  DURATION_IS_NaN: 'DURATION_IS_NaN',
};
