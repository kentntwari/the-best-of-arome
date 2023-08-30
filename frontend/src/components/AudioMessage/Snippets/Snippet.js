import Link from "next/link";

import { useCldAudioTransformation } from "@/hooks/useCldAudioTransformation";

import { convertToMinutesSeconds as formatTime } from "../../../utils/convertToMinutesSeconds";

import AudioPlayer from "@/components/AudioPlayer";
import Duration from "@/components/AudioPlayer/Duration";
import ForceSwitchPlayPause from "@/components/AudioPlayer/ForceSwitchPlayPause";

const Snippet = (props) => {
  const { title, slug, alternativeText, duration, publicID } = props;

  const transformedURL = useCldAudioTransformation(publicID);

  return (
    <>
      <div
        className="bg-la-300 hover:bg-la-200 dark:bg-dp-300 dark:hover:bg-dp-200 p-3 lg:p-5 lg:border-2 lg:border-la-300 lg:dark:border-dp-200 rounded-lg flex flex-col lg:justify-between gap-6 cursor-pointer"
        title={`${alternativeText}`}>
        <p className="font-semibold text-base lg:text-umd text-ls-400 dark:text-white-300">
          {title}
        </p>

        <div className="flex items-center justify-between">
          <Link
            href={`/audio-message/${encodeURIComponent(slug)}`}
            className="bg-la-50 dark:bg-dp-500 px-3 py-2 rounded text-xs lg:text-sm text-ls-500 dark:text-white-300">
            Read details
          </Link>

          <AudioPlayer
            enableDefaultFileReadings={false}
            enableDefaultControls={false}
            enableCustomization={true}>
            <div className="flex items-center gap-2">
              <Duration value={formatTime(duration)} />
              <ForceSwitchPlayPause
                watchPlayedTitle={title}
                watchPlayedSlug={slug}
                watchPlayedURL={transformedURL}
              />
            </div>
          </AudioPlayer>
        </div>
      </div>
    </>
  );
};

export default Snippet;
