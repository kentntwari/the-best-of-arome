import { useState, useCallback, useRef } from 'react';

import { convertToMinutesSeconds as formatTime } from '@/hooks/useAudioPlayer/utils/convertToMinutesSeconds';

import AudioModal from '../AudioModal';

const Piece = ({ data, trackBg }) => {
  const { title, url } = data;

  // make details dynamic since we expect diverse results
  const [modalDetails, setModalDetails] = useState({});

  // reference modal in the system
  const modal_ref = useRef();
  // reference audio for each piece
  const audio_ref = useRef();
  // reference unique duration for each audio source...
  const duration_ref = useRef();

  function loadAudioDuration() {
    duration_ref.current.innerText = formatTime(audio_ref.current?.duration);
  }

  const displayModalDetails = useCallback(() => {
    setModalDetails((prev) => {
      return { ...prev, title, url };
    });

    modal_ref.current.showModal();
  }, []);

  return (
    <>
      <audio
        ref={audio_ref}
        src={url}
        preload="metadata"
        onLoadedMetadata={loadAudioDuration}
      />
      <AudioModal ref={modal_ref} {...modalDetails} />

      <div
        onClick={displayModalDetails}
        className={`px-2 py-4 ${trackBg} flex items-center`}>
        <p className="grow font-semibold text-xs text-ls-400">{title}</p>

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
