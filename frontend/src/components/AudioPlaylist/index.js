import { useRef } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { v4 as uuidv4 } from "uuid";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

import { useModal } from "@/hooks/useModal";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useExtractFields } from "@/hooks/useExtractFields";
import { useSWRAudioState } from "@/hooks/useSWRAudioState";

import AudioMessage from "../AudioMessage";
import AudioModal from "../AudioModal";

const AudioPlaylist = () => {
  const audioModal_ref = useRef();

  const router = useRouter();

  const { methods } = useAudioPlayer();

  const { playlist } = useExtractFields({ playlist: router.query.playlist });

  const [, setPlayerDetails] = useSWRAudioState();

  const { openModal } = useModal(audioModal_ref);

  if (!playlist) return;

  return (
    <>
      <AudioModal ref={audioModal_ref} playlist={playlist.slug} />

      <section className="px-5 py-4">
        <Link
          href="/browse"
          className="underline underline-offset-3 text-sm text-neutral-200 dark:text-neutral-20 decoration-neutral-200">
          Back to Browse
        </Link>
        <article className="mt-6 px-3 py-4 rounded-lg bg-la-300 dark:bg-black-300 flex flex-col gap-3">
          <span className="w-fit px-3 py-2 rounded-full bg-white-300 text-xs text-black-300">
            Playlist
          </span>
          <div>
            <h3
              className="capitalize font-semibold text-black-300 dark:text-white-300"
              aria-label="playlist title">
              {playlist.name}
            </h3>
            <p
              className="mt-2 text-xs text-black-300 dark:text-white-300"
              aria-label="playlist description">
              {playlist.description}
            </p>
          </div>
        </article>

        <section className="mt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="grow font-semibold text-base">All messages</span>
            <button className="px-2 py-1 border border-neutral-200 dark:border-white-300 rounded flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="w-4 text-neutral-200 dark:text-white-300" />
              <span className="text-sm text-neutral-200 dark:text-white-300">Filter</span>
            </button>
          </div>

          <div className="border border-la-300 dark:border-dp-200">
            {playlist.audios.map((details, index) => (
              <div
                key={uuidv4()}
                onClick={() => {
                  methods.pauseAudio();

                  setPlayerDetails({
                    title: details.title,
                    slug: details.slug,
                    url: details.url,
                  });

                  openModal();
                }}>
                <AudioMessage.Piece
                  data={details}
                  trackBg={
                    index % 2
                      ? "bg-la-50 hover:bg-la-100 dark:bg-dp-300 dark:hover:bg-dp-500"
                      : "bg-la-75 hover:bg-la-100 dark:bg-dp-400 dark:hover:bg-dp-500"
                  }
                />
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
};

export default AudioPlaylist;
