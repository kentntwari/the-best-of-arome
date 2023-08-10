import { useRef } from "react";

import { convertToMinutesSeconds as formatTime } from "../../utils/convertToMinutesSeconds";

const Piece = ({ data, trackBg }) => {
  // reference audio for each piece
  const audio_ref = useRef();
  // reference unique duration for each audio source...
  const duration_ref = useRef();

  return (
    <>
      <audio
        ref={audio_ref}
        src={data.url}
        preload="metadata"
        onLoadedMetadata={() => {
          duration_ref.current.innerText = formatTime(audio_ref.current?.duration);
        }}
      />

      <div
        className={`px-2 py-4 ${trackBg} flex items-center justify-between cursor-pointer`}>
        <p className="grow truncate font-semibold text-xs text-ls-400 dark:text-white-300">
          {data.title}
        </p>

        <span
          ref={duration_ref}
          className='ml-6 w-16 h-6 rounded bg-ls-300 dark:bg-neutral-10 flex items-center justify-center text-white-300 dark:text-ds-500 text-xs"'>
          {"--:--"}
        </span>
      </div>
    </>
  );
};

export default Piece;
