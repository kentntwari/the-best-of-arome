import { useRef } from "react";

import { useRouter } from "next/router";

import { useModal } from "@/hooks/useModal";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useSWRAudioState } from "@/hooks/useSWRAudioState";
import { useCldAudioTransformation } from "@/hooks/useCldAudioTransformation";

import AudioModal from "@/components/AudioModal";
import Duration from "../AudioPlayer/Duration";

import { convertToMinutesSeconds as formatTime } from "@/utils/convertToMinutesSeconds";

const AudioFile = (props) => {
  const { title, slug, duration, publicID, url } = props;

  const audioModal_ref = useRef();

  const router = useRouter();

  const { methods } = useAudioPlayer();

  const { openModal } = useModal(audioModal_ref);

  const [, setPlayerDetails] = useSWRAudioState();

  const transformedURL = useCldAudioTransformation(publicID);

  return (
    <>
      <div
        onClick={() => {
          methods.pauseAudio();

          setPlayerDetails({
            title,
            slug,
            url: transformedURL,
          });

          openModal();
        }}>
        <AudioModal ref={audioModal_ref} mapQueue={router.query.playlist} />

        <div className={`px-2 py-4 flex items-center justify-between cursor-pointer`}>
          <p className="grow truncate font-semibold text-xs text-ls-400 dark:text-white-300">
            {title}
          </p>

          <span className='ml-6 w-16 h-6 rounded bg-ls-300 dark:bg-neutral-10 flex items-center justify-center text-white-300 dark:text-ds-500 text-xs"'>
            <Duration value={formatTime(duration)} />
          </span>
        </div>
      </div>
    </>
  );
};

export default AudioFile;
