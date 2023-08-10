import { usePlayerContext } from "@/hooks/usePlayerContext";

import Play from "./Play";
import Pause from "./Pause";
import Back from "./Back";
import Forward from "./Forward";

const DefaultControls = () => {
  const context = usePlayerContext();

  return (
    <div className="flex items-center justify-center gap-4">
      <Back />
      {context.globalAudioState.isPlaying === true ? <Pause /> : <Play />}
      <Forward />
    </div>
  );
};

export default DefaultControls;
