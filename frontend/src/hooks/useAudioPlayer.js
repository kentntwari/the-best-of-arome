import { usePlayerContext } from "./usePlayerContext";

const useAudioPlayer = () => {
  const context = usePlayerContext();
  let player = context.ref;

  // save play audio function
  const playAudio = () => {
    context.forceGlobalAudioState.toPlay();

    const isPlaying = !context.globalAudioState.isPlaying;
    if (isPlaying === true) setTimeout(() => player?.play(), 20);
  };

  // save pause audio function
  const pauseAudio = () => {
    context.forceGlobalAudioState.toPause();

    const isPlaying = !context.globalAudioState.isPlaying;
    if (isPlaying === false) setTimeout(() => player?.pause(), 20);
  };

  // method for direct slider time change...
  // ...this will immediately impact the current time...
  // ... and appearance of the progress bar background
  const seekTimeframe = (e) => {
    player.currentTime = (player?.duration * e.target.value) / 100;
  };

  // method to jump forward 0.5s of the current time...
  // ...will freeze when it reached audio duration
  const forwardAudio = () => {
    if (player?.currentTime < player?.duration) player.currentTime += 0.5;
  };

  // method to jump backwards 0.5s of the current time...
  // ...will freeze when it reached audio duration
  const backwardAudio = () => {
    if (player?.currentTime >= 0) player.currentTime -= 0.5;
  };

  /* EXPORTED COMPONENTS */

  return {
    player,
    methods: {
      playAudio,
      pauseAudio,
      forwardAudio,
      backwardAudio,
      seekTimeframe,
    },
  };
};

export { useAudioPlayer };
