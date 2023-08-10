import { forwardRef } from "react";

import Link from "next/link";

import { usePlayerContext } from "@/hooks/usePlayerContext";
import { useSWRAudioState } from "@/hooks/useSWRAudioState";
import { useModal } from "@/hooks/useModal";

import { XCircleIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

import Back from "../AudioPlayer/Back";
import Pause from "../AudioPlayer/Pause";
import Play from "../AudioPlayer/Play";
import Forward from "../AudioPlayer/Forward";
import Duration from "../AudioPlayer/Duration";
import CurrentTime from "../AudioPlayer/CurrentTime";
import ProgressBar from "../AudioPlayer/ProgressBar";
import AudioPlayer from "../AudioPlayer";
import AudioWavesAnimation from "./AudioWavesAnimation";

const AudioModal = forwardRef((props, ref) => {
  const context = usePlayerContext();

  const [playerDetails] = useSWRAudioState();

  const { closeModal } = useModal(ref);

  return (
    <dialog ref={ref} className="w-[335px] p-0 border-none rounded-lg appearance-none">
      <XCircleIcon
        className="w-6 absolute top-1 right-1 text-neutral-10 cursor-pointer"
        onClick={closeModal}
      />

      <AudioWavesAnimation />

      <section className="p-3 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-base text-ls-500 dark:text-ds-500">
            {playerDetails.title}
          </span>

          <AudioPlayer
            enableDefaultControls={false}
            enableDefaultFileReadings={false}
            enableCustomization={true}>
            <div className="grid grid-cols-[35px_1fr_35px] items-center gap-1">
              <CurrentTime color="text-ls-500 dark:text-ds-500">00:00</CurrentTime>
              <ProgressBar />
              <Duration color="text-ls-500 dark:text-ds-500" />
            </div>

            <div className="flex items-center justify-center gap-4">
              <Back color="text-ls-500 dark:text-ds-500" />
              {context.globalAudioState.isPlaying === true ? (
                <Pause color="text-ls-500 dark:text-ds-500" />
              ) : (
                <Play color="text-ls-500 dark:text-ds-500" />
              )}
              <Forward color="text-ls-500 dark:text-ds-500" />
            </div>
          </AudioPlayer>
        </div>

        <Link
          href={{
            pathname: "/audio-message/[slug]/",
            query: {
              slug: playerDetails.slug,
              q: props.playlist ? props.playlist : null,
            },
          }}
          className="flex self-center">
          <span className="text-sm text-neutral-100">See full description</span>
          <ArrowTopRightOnSquareIcon className="ml-2 w-4 text-netural-100" />
        </Link>
      </section>
    </dialog>
  );
});

export default AudioModal;
