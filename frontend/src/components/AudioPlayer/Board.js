import { useRef, useEffect, useCallback } from "react";
import { useAudioAnimationFrame } from "@/hooks/useAudioAnimationFrame";
import { actions as storeActions } from "@/store";
import Audio from "./Audio";
import TogglePlay from "./TogglePlay";
import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/solid";
import { convertToMinutesSeconds as formatTime } from "@/utils/convertToMinutesSeconds";

const Board = ({
  bgColor = "",
  fileDuration,
  publicID,
  global = false,
  scoped = false,
}) => {
  if ((!global && !scoped) || (global && scoped))
    throw new Error("Board must be either global or scoped");

  const audio_ref = useRef();
  const duration_ref = useRef();
  const currentTime_ref = useRef();
  const progressBar_ref = useRef();

  const handleUpdates = useCallback(() => {
    if (currentTime_ref.current) {
      currentTime_ref.current.innerText =
        formatTime(audio_ref?.current?.exposeAudioCurrentTime()) ?? "00:00";
    }

    if (progressBar_ref.current) {
      progressBar_ref.current.value =
        (audio_ref?.current?.exposeAudioCurrentTime() /
          audio_ref?.current?.exposeAudioDuration()) *
        100;
      progressBar_ref.current.style.background = `linear-gradient(to right,
          var(--bg-progressBar-slider-track) 0 ${progressBar_ref?.current?.value}%,#dedede 0)`;
    }
  }, []);

  useAudioAnimationFrame(handleUpdates, { src: publicID, global, scoped });

  return (
    <>
      <div className={`${bgColor} flex flex-col gap-5`}>
        <Audio ref={audio_ref} global={global} scoped={scoped}>
          <div className="grid grid-cols-[35px_1fr_35px] items-center gap-1">
            <span ref={currentTime_ref} className="text-xs">
              00:00
            </span>

            <input
              ref={progressBar_ref}
              type="range"
              step={0.5}
              defaultValue={0}
              min={0}
              max={100}
              className="grow h-2 appearance-none bg-neutral-40 rounded-full"
            />
            <span ref={duration_ref} className="text-xs">
              {formatTime(fileDuration) ?? "--:--"}
            </span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <BackwardIcon className="w-10" />
            <TogglePlay payload={publicID} global={global} scoped={scoped} />
            <ForwardIcon className="w-10" />
          </div>
        </Audio>
      </div>
    </>
  );
};

export default Board;
