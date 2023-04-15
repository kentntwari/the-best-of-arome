import Link from 'next/link';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { PlayCircleIcon, PauseCircleIcon } from '@heroicons/react/24/solid';

const Snippet = (props) => {
  const {
    attributes: {
      title,
      slug,
      audio: {
        data: {
          attributes: { alternativeText, url },
        },
      },
    },
  } = props;

  const {
    readOutput,
    actions: { playAudio: play, pauseAudio: pause },
  } = useAudioPlayer(url);

  function togglePlayPause() {
    if (!readOutput.isPlaying) return play();

    return pause();
  }

  return (
    <div
      className="bg-la-300 dark:bg-dp-300 p-3 rounded-lg flex flex-col gap-6"
      title={`audio - ${alternativeText}`}>
      <p className="font-semibold text-base text-ls-400">{title}</p>

      <div className="flex items-center justify-between">
        <Link
          href={`/audio-message/${encodeURIComponent(slug)}`}
          className="bg-la-50 px-3 py-2 rounded text-xs text-ls-500">
          Read details
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs">{readOutput.duration}</span>
          <button
            className="border-none outline-none cursor-pointer"
            onClick={togglePlayPause}>
            {!readOutput.isPlaying && <PlayCircleIcon className="w-10 text-ls-400" />}
            {!readOutput.isPaused && <PauseCircleIcon className="w-10 text-ls-300" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Snippet;
