import { useRef } from 'react';

import { convertToMinutesSeconds as formatTime } from '../../utils/convertToMinutesSeconds';

const Piece = ({ data, trackBg }) => {
  // reference audio for each piece
  const audio_ref = useRef();
  // reference unique duration for each audio source...
  const duration_ref = useRef();

  function loadAudioDuration() {
    duration_ref.current.innerText = formatTime(audio_ref.current?.duration);
  }

  return (
    <>
      <audio
        ref={audio_ref}
        src={data.url}
        preload="metadata"
        onLoadedMetadata={loadAudioDuration}
      />

      <div className={`px-2 py-4 ${trackBg} flex items-center`}>
        <p className="grow font-semibold text-xs text-ls-400">{data.title}</p>

        <span
          ref={duration_ref}
          className='w-16 h-6 rounded bg-ls-300 flex items-center justify-center text-white-300 text-xs"'>
          {'--:--'}
        </span>
      </div>
    </>
  );
};

export default Piece;
