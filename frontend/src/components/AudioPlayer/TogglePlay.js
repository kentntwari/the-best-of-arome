import { useSnapshot } from "valtio";

import { singleAudioProxyStore as _ } from "@/store";

import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/solid";

const TogglePlay = ({ payload }) => {
  const snap = useSnapshot(_);

  // button to mutate the proxy state
  // payload in this case is the publicID of the audio source
  return (
    <>
      <button type="button">
        {snap.currentAudio === payload && snap.isPlaying ? (
          <PauseCircleIcon
            onClick={() => (_.isPlaying = false)}
            className="w-10 text-ls-300 dark:text-white-300"
          />
        ) : (
          <PlayCircleIcon
            onClick={() => {
              _.currentAudio = payload;
              _.isPlaying = true;
            }}
            className="w-10 text-ls-400 dark:text-white-300"
          />
        )}
      </button>
    </>
  );
};

export default TogglePlay;
