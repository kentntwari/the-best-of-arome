import { useRef, useEffect, useState } from "react";

import { useSnapshot, subscribe } from "valtio";

import { singleAudioProxyStore as store } from "@/store";

import { useContextAnimationFrame } from "@/hooks/useContextAnimationFrame";

import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/solid";

import TogglePlay from "./TogglePlay";

import { optimizeURL } from "@/utils/optimizeURL";
import { convertToMinutesSeconds as formatTime } from "@/utils/convertToMinutesSeconds";

const Board = ({ bgColor = "", title, fileDuration, publicID }) => {
  const snap = useSnapshot(store);

  const audio_ref = useRef();
  const duration_ref = useRef();
  const currentTime_ref = useRef();
  const progressBar_ref = useRef();

  useEffect(() => {
    subscribe(store, () => {
      if (store.currentAudio !== publicID) return audio_ref?.current?.pause();
      if (store.currentAudio && !store.isPlaying) return audio_ref?.current?.pause();
      if (store.currentAudio && store.isPlaying)
        return new Promise((resolve) =>
          setTimeout(() => resolve(audio_ref?.current?.play()), 5)
        );
    });
  }, []);

  useEffect(() => {
    audio_ref.current.src = optimizeURL({ publicID });
  }, [publicID]);

  useContextAnimationFrame(() => {
    if (currentTime_ref.current)
      currentTime_ref.current.innerText =
        formatTime(audio_ref?.current?.currentTime) ?? "00:00";
  });

  useContextAnimationFrame(() => {
    if (progressBar_ref.current) {
      progressBar_ref.current.value =
        (audio_ref?.current?.currentTime / audio_ref?.current?.duration) * 100;
      progressBar_ref.current.style.background = `linear-gradient(to right,
        var(--bg-progressBar-slider-track) 0 ${progressBar_ref?.current?.value}%,#dedede 0)`;
    }
  });

  return (
    <>
      <div className={`${bgColor} flex flex-col gap-5`}>
        <audio
          ref={audio_ref}
          // src={optimizeURL({ publicID: snap.currentAudio })}
          title={title}
          preload="metadata"
          onEnded={() => (store.isPlaying = false)}
        />

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
      </div>
    </>
  );
};

export default Board;
