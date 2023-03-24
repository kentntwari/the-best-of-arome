import { useState, useRef } from 'react';
import { PlayCircleIcon, PauseCircleIcon } from '@heroicons/react/24/solid';

const TimeAndPlayer = ({ source: url }) => {
  const audioPlayerRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState('--:--');

  function togglePlayPause() {
    setIsPlaying((prev) => !prev);

    if (!isPlaying) return audioPlayerRef.current.pause();
    if (isPlaying) return audioPlayerRef.current.play();
  }

  return (
    <div className="flex items-center gap-2">
      <audio
        ref={audioPlayerRef}
        src={url}
        preload="metadata"
        onLoadedMetadata={() => setDuration(audioPlayerRef.current.duration)}></audio>
      <span className="text-xs">{duration}</span>
      <button
        className="border-none outline-none cursor-pointer"
        onClick={togglePlayPause}>
        {!isPlaying ? (
          <PlayCircleIcon className="w-10 text-ls-400" />
        ) : (
          <PauseCircleIcon className="w-10 text-ls-300" />
        )}
      </button>
    </div>
  );
};

export default TimeAndPlayer;
