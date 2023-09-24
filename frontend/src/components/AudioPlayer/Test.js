import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/AudioPlayer.module.css";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  PauseCircleIcon,
} from "@heroicons/react/24/solid";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

const Test = ({ chapters = [], timeJump = 0, track }) => {
  const {
    audioPlayer,
    backThirty,
    calculateTime,
    changeRange,
    currentTime,
    duration,
    forwardThirty,
    isPlaying,
    play,
    progressBar,
    setDuration,
    setIsPlaying,
    timeTravel,
    togglePlayPause,
    setTimeJump,
  } = useAudioPlayer();

  // handle time jumps
  useEffect(() => {
    setTimeJump(timeJump);
  }, [timeJump]);

  console.log({ isPlaying, timeJump });

  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioPlayer} src={track} preload="metadata" />
      <button className={styles.forwardBackward} onClick={backThirty}>
        <ArrowLeftIcon /> 30
      </button>
      <button onClick={togglePlayPause} className={styles.playPause}>
        {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon className={styles.play} />}
      </button>
      <button className={styles.forwardBackward} onClick={forwardThirty}>
        30 <ArrowRightIcon />
      </button>

      {/* current time */}
      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <div className={styles.progressBarWrapper}>
        <input
          type="range"
          className={styles.progressBar}
          defaultValue="0"
          ref={progressBar}
          onChange={changeRange}
        />
        {chapters.map((chapter, i) => {
          const leftStyle = (chapter.start / duration) * 100;
          const widthStyle = ((chapter.end - chapter.start) / duration) * 100;
          return (
            <div
              key={i}
              className={`${styles.chapter} ${chapter.start == 0 && styles.start} ${
                chapter.end == duration && styles.end
              }`}
              style={{
                "--left": `${String(leftStyle)}%`,
                "--width": `${String(widthStyle)}%`,
              }}></div>
          );
        })}
      </div>

      {/* duration */}
      <div className={styles.duration}>{duration && calculateTime(duration)}</div>
    </div>
  );
};

export default Test;
