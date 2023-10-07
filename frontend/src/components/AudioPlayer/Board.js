import { useRef } from "react";

import { useSnapshot } from "valtio";

import { store } from "@/store";

import { useContextAnimationFrame } from "@/hooks/useContextAnimationFrame";

import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/solid";

import Wrapper from "./Wrapper";
import TogglePlay from "./TogglePlay";

import { optimizeURL } from "@/utils/optimizeURL";
import { convertToMinutesSeconds as formatTime } from "@/utils/convertToMinutesSeconds";

const Board = ({ bgColor = "", title, fileDuration, publicID }) => {
  const snap = useSnapshot(store);

  const audio_ref = useRef();
  const duration_ref = useRef();
  const currentTime_ref = useRef();
  const progressBar_ref = useRef();

  useContextAnimationFrame(() => {
    if (snap.currentAudio === publicID && currentTime_ref.current)
      currentTime_ref.current.innerText =
        formatTime(audio_ref?.current?.exposeAudioCurrentTime()) ?? "00:00";

    return;
  });

  useContextAnimationFrame(() => {
    if (snap.currentAudio === publicID && progressBar_ref.current) {
      progressBar_ref.current.value =
        (audio_ref?.current?.exposeAudioCurrentTime() /
          audio_ref?.current?.exposeAudioDuration()) *
        100;
      progressBar_ref.current.style.background = `linear-gradient(to right,
        var(--bg-progressBar-slider-track) 0 ${progressBar_ref?.current?.value}%,#dedede 0)`;
    }

    return;
  });

  return (
    <>
      <div className={`${bgColor} flex flex-col gap-5`}>
        <Wrapper ref={audio_ref} fallBack={optimizeURL({ publicID })} title={title}>
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
              onChange={(e) => {
                audio_ref.current.currentTime =
                  (audio_ref.current.duration * e.target.value) / 100;

                return audio_ref.current.currentTime;
              }}
            />
            <span ref={duration_ref} className="text-xs">
              {formatTime(fileDuration) ?? "--:--"}
            </span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <BackwardIcon
              onClick={() => (audio_ref.current.currentTime -= 0.5)}
              className="w-10"
            />
            <TogglePlay payload={publicID} />
            <ForwardIcon
              onClick={() => (audio_ref.current.currentTime += 0.5)}
              className="w-10"
            />
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default Board;
