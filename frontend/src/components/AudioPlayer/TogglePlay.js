import { useSnapshot } from "valtio";
import { store as _, actions as storeActions } from "@/store";
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/solid";

// payload in this case is the publicID of the audio source
const TogglePlay = ({ payload, global = false, scoped = false }) => {
  const snap = useSnapshot(_);

  if ((!global && !scoped) || (global && scoped))
    throw new Error("TogglePlay must be either global or scoped");

  return (
    <>
      <button type="button">
        {global ? (
          snap.currentAudio.global === payload && snap.isPlaying.global ? (
            <PauseCircleIcon
              onClick={storeActions.pauseGlobal}
              className="w-10 text-ls-300 dark:text-white-300"
            />
          ) : (
            <PlayCircleIcon
              onClick={() => storeActions.playGlobal(payload)}
              className="w-10 text-ls-400 dark:text-white-300"
            />
          )
        ) : null}

        {scoped ? (
          snap.currentAudio.scoped === payload && snap.isPlaying.scoped ? (
            <PauseCircleIcon
              onClick={storeActions.pauseScoped}
              className="w-10 text-ls-300 dark:text-white-300"
            />
          ) : (
            <PlayCircleIcon
              onClick={() => storeActions.playScoped(payload)}
              className="w-10 text-ls-400 dark:text-white-300"
            />
          )
        ) : null}
      </button>
    </>
  );
};

export default TogglePlay;
