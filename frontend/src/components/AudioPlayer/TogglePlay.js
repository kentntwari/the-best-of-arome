import { useCallback } from "react";
import { useSnapshot } from "valtio";
import { store, actions as storeActions } from "@/store";
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/solid";

// payload in this case is the publicID of the audio source
const TogglePlay = ({ payload, global = false, scoped = false }) => {
  const snap = useSnapshot(store);

  const pauseAudio = useCallback(() => {
    if (global) return storeActions.pauseAudio("GLOBAL");
    if (scoped) return storeActions.pauseAudio("SCOPED");
  }, [global, scoped]);

  const playAudio = useCallback(() => {
    if (global) return storeActions.playAudio("GLOBAL", payload);
    if (scoped) return storeActions.playAudio("SCOPED", payload);
  }, [global, scoped]);

  if ((!global && !scoped) || (global && scoped))
    throw new Error("TogglePlay must be either GLOBAL or SCOPED");

  return (
    <>
      <button type="button">
        {global ? (
          snap.global.currentAudioID === payload && snap.global.isPlaying ? (
            <PauseCircleIcon
              onClick={pauseAudio}
              className="w-10 text-ls-300 dark:text-white-300"
            />
          ) : (
            <PlayCircleIcon
              onClick={playAudio}
              className="w-10 text-ls-400 dark:text-white-300"
            />
          )
        ) : null}

        {scoped ? (
          snap.scoped.currentAudioID === payload && snap.scoped.isPlaying ? (
            <PauseCircleIcon
              onClick={pauseAudio}
              className="w-10 text-ls-300 dark:text-white-300"
            />
          ) : (
            <PlayCircleIcon
              onClick={playAudio}
              className="w-10 text-ls-400 dark:text-white-300"
            />
          )
        ) : null}
      </button>
    </>
  );
};

export default TogglePlay;
