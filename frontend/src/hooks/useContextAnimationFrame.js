import { useEffect } from "react";

import { useSnapshot } from "valtio";

import { singleAudioProxyStore as store } from "@/store";

const useContextAnimationFrame = (functionToRun) => {
  if (typeof functionToRun !== "function")
    console.error(
      "argument in hook useRequestAnimationFrame is not a function. This hook requires a function to run"
    );

  const snap = useSnapshot(store);

  let animate = false;

  function update() {
    functionToRun();

    if (animate === true) {
      requestAnimationFrame(update);
    }
  }

  useEffect(() => {
    if (snap.isPlaying === true) {
      animate = true;
      window.requestAnimationFrame(update);
    }

    if (snap.isPlaying === false) {
      animate = false;
      window.cancelAnimationFrame(update);
    }
  }, [snap.isPlaying]);
};

export { useContextAnimationFrame };
