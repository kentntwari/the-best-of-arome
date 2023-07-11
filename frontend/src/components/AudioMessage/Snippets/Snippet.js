import { useState, useRef } from 'react';

import Link from 'next/link';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';

import { convertToMinutesSeconds as formatTime } from '@/hooks/useAudioPlayer/utils/convertToMinutesSeconds';

import ForceSwitchPlayPause from '@/components/AudioPlayer/ForceSwitchPlayPause';

const Snippet = (props) => {
  const { title, slug, alternativeText, url } = props;

  const { Components } = useAudioPlayer();

  // read duration from audio url provided
  const [localAudioDuration, setLocalAudioDuration] = useState(null);

  const localAudio_ref = useRef();

  return (
    <>
      <audio
        ref={localAudio_ref}
        src={url}
        preload="metadata"
        onLoadedMetadata={() => setLocalAudioDuration(localAudio_ref.current?.duration)}
      />
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
            <Components.Duration forceValue={formatTime(localAudioDuration)} />
            <ForceSwitchPlayPause
              watchPlayedTitle={title}
              watchPlayedSlug={slug}
              watchPlayedURL={url}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Snippet;
