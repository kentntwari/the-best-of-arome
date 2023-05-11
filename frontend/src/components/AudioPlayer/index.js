import { useAudioPlayerContext } from '@/hooks/useAudioPlayerContext';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

import { Controls } from './Controls';

const AudioPlayer = ({ type = null }) => {
  const url = useAudioPlayerContext();

  // import all functionality from one hook
  const { exportedComponents, state, methods } = useAudioPlayer(url);

  // components object varibale to allow dot notation
  const Exported = exportedComponents;

  const {
    playAudio,
    pauseAudio,
    updateCurrentTime: { forwardAudio, backwardAudio },
  } = methods;

  // render component when only play button and total duration is needed
  if (type === 'playonly')
    return (
      <div className="flex items-center gap-2">
        <Exported.Duration />

        {state.audioIsPlaying ? (
          <Controls.Pause
            onClick={pauseAudio}
            className="w-10 text-ls-300 cursor-pointer"
          />
        ) : (
          <Controls.Play
            onClick={playAudio}
            className="w-10 text-ls-400 cursor-pointer"
          />
        )}
      </div>
    );

  // full fledged-audio player component
  return (
    <div className="bg-la-100 p-5 flex flex-col gap-5">
      <div className="grid grid-cols-[35px_1fr_35px] items-center gap-1">
        <Exported.CurrentTime />
        <Exported.ProgressBar />
        <Exported.Duration />
      </div>

      <div className="flex items-center justify-center gap-4">
        <Controls.Back onClick={backwardAudio} className="w-7.5 text-ls-300" />

        {state.audioIsPlaying ? (
          <Controls.Pause
            onClick={pauseAudio}
            className="w-10 text-ls-300 cursor-pointer"
          />
        ) : (
          <Controls.Play
            onClick={playAudio}
            className="w-10 text-ls-400 cursor-pointer"
          />
        )}

        <Controls.Forward onClick={forwardAudio} className="w-7.5 text-ls-300" />
      </div>
    </div>
  );
};

export default AudioPlayer;
