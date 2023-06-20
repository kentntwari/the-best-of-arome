import { useState, useCallback, useRef } from 'react';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { convertToMinutesSeconds } from '@/hooks/useAudioPlayer/utils/convertToMinutesSeconds';

import AudioModal from '../AudioModal';

const Piece = ({ data, trackBg }) => {
  const { title, url } = data;

  const [modalDetails, setModalDetails] = useState({});

  const modal_ref = useRef();

  const displayModalDetails = useCallback(() => {
    setModalDetails((prev) => {
      return { ...prev, title, url };
    });

    modal_ref.current.showModal();
  }, []);

  return (
    <>
      <AudioModal ref={modal_ref} {...modalDetails} />

      <div
        onClick={displayModalDetails}
        className={`px-2 py-4 ${trackBg} flex items-center`}>
        <p className="grow font-semibold text-xs text-ls-400">{title}</p>

        <span className='w-16 h-6 rounded bg-ls-300 flex items-center justify-center text-white-300 text-xs"'>
          {'--:--'}
        </span>
      </div>
    </>
  );
};

export default Piece;
