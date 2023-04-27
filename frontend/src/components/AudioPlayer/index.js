import { memo, useState, useRef, useEffect, useCallback } from 'react';

import {
  PlayCircleIcon,
  PauseCircleIcon,
  ForwardIcon,
  BackwardIcon,
} from '@heroicons/react/24/solid';

import { convertToMinutesSeconds } from './utils/convertToMinutesSeconds';

const AudioPlayer = ({ type = null, playing: url }) => {
  // define audio states needed for custom audio player
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(null);
  const [audioDuration, setAudioDuration] = useState(null);

  // reference DOM elements and values in memoruy
  const audioPlayer_ref = useRef();
  const progressBar_ref = useRef();
  const audioCurrentTime_ref = useRef(null);
  const audioDuration_ref = useRef(null);

  // instantiate future values
  audioCurrentTime_ref.current = audioCurrentTime;
  audioDuration_ref.current = audioDuration;

  // retrieve audio duration on start up(mount)
  useEffect(() => {
    setAudioDuration(audioPlayer_ref.current?.duration);
  }, [audioPlayer_ref.current?.duration]);

  // save play audio function
  const playAudio = useCallback(() => {
    return audioPlayer_ref.current.play();
  }, []);

  // save pause audio function
  const pauseAudio = useCallback(() => {
    return audioPlayer_ref.current.pause();
  }, []);

  // update everything that depends on the current progress...
  // ...of the audio, from current time to range track styling
  const updateAudioProgress = useCallback(() => {
    setAudioCurrentTime(audioPlayer_ref.current?.currentTime);

    progressBar_ref.current.value =
      (audioCurrentTime_ref.current / audioDuration_ref.current) * 100;

    progressBar_ref.current.style.background = `linear-gradient(to right,#ae7137 0 ${progressBar_ref.current.value}%,#dedede 0)`;
  }, []);

  // render component when only play button and total duration is needed
  if (type === 'playonly')
    return (
      <div className="flex items-center gap-2">
        <audio
          ref={audioPlayer_ref}
          src={url}
          preload="metadata"
          onLoadedMetadata={() => setAudioDuration(audioPlayer_ref.current.duration)}
          onPlay={() => setAudioIsPlaying(true)}
          onPause={() => setAudioIsPlaying(false)}
        />
        <span>{convertToMinutesSeconds(audioDuration_ref.current) ?? '--:--'}</span>

        {audioIsPlaying ? (
          <PauseCircleIcon
            onClick={pauseAudio}
            className="w-10 text-ls-300 cursor-pointer"
          />
        ) : (
          <PlayCircleIcon
            onClick={playAudio}
            className="w-10 text-ls-400 cursor-pointer"
          />
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
        onLoadedMetadata={() => setAudioDuration(audioPlayer_ref.current.duration)}
        onTimeUpdate={updateAudioProgress}
        onPlay={() => setAudioIsPlaying(true)}
        onPause={() => setAudioIsPlaying(false)}
      />

      <div className="grid grid-cols-[35px_1fr_35px] items-center gap-1">
        <span className="text-xs">
          {convertToMinutesSeconds(audioCurrentTime_ref.current)}
        </span>
        <input
          ref={progressBar_ref}
          type="range"
          step={0.5}
          defaultValue={0}
          min={0}
          max={100}
          className="grow h-2 appearance-none bg-neutral-40 rounded-full"
        />
        <span className="text-xs">
          {convertToMinutesSeconds(audioDuration_ref.current) ?? '--:--'}
        </span>
      </div>

      <div className="flex items-center justify-center gap-4">
        <BackwardIcon className="w-7.5 text-ls-300" />

        {audioIsPlaying ? (
          <PauseCircleIcon
            onClick={pauseAudio}
            className="w-10 text-ls-300 cursor-pointer"
          />
        ) : (
          <PlayCircleIcon
            onClick={playAudio}
            className="w-10 text-ls-400 cursor-pointer"
          />
        )}

        <ForwardIcon className="w-7.5 text-ls-300" />
      </div>
    </div>
  );
};

export default memo(AudioPlayer);
