import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const NextInQueue = (props) => {
  const { audio_slug, audio_title } = props;

  return (
    <Link href={`/audio-message/${encodeURIComponent(audio_slug)}`}>
      <div
        className="px-2 py-3 rounded bg-ls-300 flex items-center justify-between"
        role="next message in queue">
        <div className="w-50 flex flex-col gap-2">
          <span className="text-xs text-neutral-40">Next up</span>
          <span className="font-bold text-sm text-white-300">
            {audio_title ?? 'loading...'}
          </span>
        </div>

        <ChevronRightIcon className="w-5 text-white-300" />
      </div>
    </Link>
  );
};

export default NextInQueue;
