import { useRef, useEffect, useCallback } from "react";
import { useSnapshot } from "valtio";
import { useSubscribeAudioEffects } from "@/hooks/useSubscribeAudioEffects";
import { useAnimateAudioUpdates } from "@/hooks/useAnimateAudioUpdates";
import { store, actions as storeActions } from "@/store";
import {
  BackwardIcon,
  ForwardIcon,
  PlayCircleIcon,
  PauseCircleIcon,
} from "@heroicons/react/24/solid";
import { optimizeURL } from "@/utils/optimizeURL";
import { convertToMinutesSeconds as formatTime } from "@/utils/convertToMinutesSeconds";

const Board = ({
  bgColor = "",
  fileDuration,
  publicID,
  title,
  global = false,
  scoped = false,
}) => {
  if ((!global && !scoped) || (global && scoped))
    throw new Error("Board must be either GLOBAL or SCOPED");

  const snap = useSnapshot(store);

  const audio_ref = useRef();
  const duration_ref = useRef();
  const currentTime_ref = useRef();
  const progressBar_ref = useRef();

  const handleUpdates = useCallback(() => {
    if (currentTime_ref.current) {
      currentTime_ref.current.innerText =
        formatTime(audio_ref?.current?.currentTime) ?? "00:00";
    }

    if (progressBar_ref.current) {
      progressBar_ref.current.value =
        (audio_ref?.current?.currentTime / audio_ref?.current?.duration) * 100;
      progressBar_ref.current.style.background = `linear-gradient(to right,
          var(--bg-progressBar-slider-track) 0 ${progressBar_ref?.current?.value}%,#dedede 0)`;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      storeActions.pauseAudio();
      if (global) storeActions.setAudio("GLOBAL", publicID, title);
      if (scoped) storeActions.setAudio("SCOPED", publicID, title);
    }

    return () => {
      mounted = false;
    };
  }, []);

  useSubscribeAudioEffects(audio_ref, { global, scoped });

  useAnimateAudioUpdates(handleUpdates, { src: publicID });

  return (
    <>
      <div className={`${bgColor} flex flex-col gap-5`}>
        <audio
          ref={audio_ref}
          src={
            global
              ? optimizeURL({ publicID: snap.global.currentAudioID })
              : optimizeURL({ publicID: snap.scoped.currentAudioID })
          }
          title={global ? store.global.currentAudioTitle : store.scoped.currentAudioTitle}
          muted={global ? true : false}
          preload="metadata"
          onEnded={() => {
            audio_ref.current.currentTime = 0;
            if (global && store.global.isPlaying) storeActions.pauseAudio("GLOBAL");
            if (scoped && store.scoped.isPlaying) storeActions.pauseAudio("SCOPED");
          }}
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
            className="grow h-2 appearance-none bg-neutral-40 rounded-full cursor-pointer"
            onChange={(e) => {
              if (global) return storeActions.seekAudio("GLOBAL", e.target.value);
              if (scoped) return storeActions.seekAudio("SCOPED", e.target.value);
            }}
          />
          <span ref={duration_ref} className="text-xs">
            {formatTime(fileDuration) ?? "--:--"}
          </span>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              if (global) return storeActions.rewindAudio("GLOBAL");
              if (scoped) return storeActions.rewindAudio("SCOPED");
            }}>
            <BackwardIcon className="w-10" />
          </button>

          <button type="button">
            {global ? (
              snap.global.isPlaying && snap.global.currentAudioID === publicID ? (
                <PauseCircleIcon
                  className="w-10 text-ls-300 dark:text-white-300"
                  onClick={() => storeActions.pauseAudio("GLOBAL")}
                />
              ) : (
                <PlayCircleIcon
                  className="w-10 text-ls-400 dark:text-white-300"
                  onClick={() => storeActions.playAudio("GLOBAL")}
                />
              )
            ) : null}

            {scoped ? (
              snap.scoped.isPlaying && snap.scoped.currentAudioID === publicID ? (
                <PauseCircleIcon
                  className="w-10 text-ls-300 dark:text-white-300"
                  onClick={() => storeActions.pauseAudio("SCOPED")}
                />
              ) : (
                <PlayCircleIcon
                  className="w-10 text-ls-400 dark:text-white-300"
                  onClick={() => storeActions.playAudio("SCOPED")}
                />
              )
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => {
              if (global) return storeActions.forwardAudio("GLOBAL");
              if (scoped) return storeActions.forwardAudio("SCOPED");
            }}>
            <ForwardIcon className="w-10" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Board;
