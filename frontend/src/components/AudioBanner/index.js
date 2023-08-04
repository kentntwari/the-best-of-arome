import { useRef } from "react";

import { usePlayerContext } from "@/hooks/usePlayerContext";
import { useModal } from "@/hooks/useModal";

import AudioModal from "../AudioModal";

import { truncateText } from "@/utils/truncateText";

const AudioBanner = () => {
  const audioModal_ref = useRef();

  const context = usePlayerContext();

  const { openModal } = useModal(audioModal_ref);

  return (
    <>
      <AudioModal ref={audioModal_ref} />

      {context.globalAudioState.isPlaying && (
        <div
          className="my-6 mx-5 p-2 bg-white-300 flex items-center gap-2"
          onClick={() => openModal()}>
          <span className="px-2 py-1 rounded bg-ls-400 text-sm text-white-300">
            Playing...
          </span>
          <span className="text-sm text-black-300">
            {truncateText(context.globalAudioState.title, 30)}
          </span>
        </div>
      )}
    </>
  );
};

export default AudioBanner;
