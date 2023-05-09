import { memo, useRef } from 'react';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';

import {
  PlayCircleIcon,
  PauseCircleIcon,
  ForwardIcon,
  BackwardIcon,
} from '@heroicons/react/24/solid';

const Back = memo(BackwardIcon);
const Play = memo(PlayCircleIcon);
const Pause = memo(PauseCircleIcon);
const Forward = memo(ForwardIcon);

const AudioPlayer = ({ type = null, playing: url }) => {
  // reference DOM elements and values in memory
  const audioPlayer_ref = useRef();

  const {
    exportedComponents: { CurrentTime, Duration, ProgressBar },
    state,
    methods,
  } = useAudioPlayer(audioPlayer_ref.current);

  // render component when only play button and total duration is needed
  if (type === 'playonly')
    return (
      <div className="flex items-center gap-2">
        <audio
          ref={audioPlayer_ref}
          src={url}
          preload="metadata"
          onLoadedMetadata={() =>
            methods.updateDuration(audioPlayer_ref.current.duration)
          }
          onPlay={methods.updateAudioState.isPlaying}
          onPause={methods.updateAudioState.isPaused}
        />

        <Duration />

        {state.audioIsPlaying ? (
          <Pause
            onClick={methods.pauseAudio}
            className="w-10 text-ls-300 cursor-pointer"
          />
        ) : (
          <Play onClick={methods.playAudio} className="w-10 text-ls-400 cursor-pointer" />
        )}
      </div>
    );

  // full fledged-audio player component
  return (
    <div className="bg-la-100 p-5 flex flex-col gap-5">
      <audio
        ref={audioPlayer_ref}
        src={url}
        preload="metadata"
        onLoadedMetadata={() => methods.updateDuration(audioPlayer_ref.current.duration)}
        onPlay={methods.updateAudioState.isPlaying}
        onPause={methods.updateAudioState.isPaused}
      />

      <div className="grid grid-cols-[35px_1fr_35px] items-center gap-1">
        <CurrentTime />
        <ProgressBar />
        <Duration />
      </div>

      <div className="flex items-center justify-center gap-4">
        <Back className="w-7.5 text-ls-300" />

        {state.audioIsPlaying ? (
          <Pause
            onClick={methods.pauseAudio}
            className="w-10 text-ls-300 cursor-pointer"
          />
        ) : (
          <Play onClick={methods.playAudio} className="w-10 text-ls-400 cursor-pointer" />
        )}

        <Forward className="w-7.5 text-ls-300" />
      </div>
    </div>
  );
};

export default AudioPlayer;
