import Link from "next/link";

import * as AudioPlayer from "@/components/AudioPlayer";

import { convertToMinutesSeconds as formatTime } from "@/utils/convertToMinutesSeconds";

const Snip = (props) => {
  return (
    <>
      <div
        className="xl:w-96 flex xl:flex-shrink-0 flex-col lg:justify-between gap-6 p-3 lg:p-5 bg-la-300 hover:bg-la-200 dark:bg-dp-200 dark:hover:bg-dp-200 lg:border-2 lg:border-la-300 lg:dark:border-dp-200 rounded-lg cursor-pointer"
        title={`${props.alternativeText}`}>
        <p className="font-semibold text-base lg:text-umd text-ls-400 dark:text-white-300">
          {props.title}
        </p>

        <div className="flex items-center justify-between">
          <Link
            href={`/audio-message/${encodeURIComponent(props.slug)}`}
            className="bg-la-50 dark:bg-dp-500 px-3 py-2 rounded text-xs lg:text-sm text-ls-500 dark:text-white-300">
            Read details
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs lg:text-sm text-ls-400 dark:text-white-300">
              {formatTime(props.duration)}
            </span>
            <AudioPlayer.TogglePlay payload={props.publicID} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Snip;
