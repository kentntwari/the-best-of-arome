import { useRef } from "react";

import Link from "next/link";

import { ChevronRightIcon } from "@heroicons/react/24/solid";

import * as AudioPlayer from "@/components/AudioPlayer";
import AudioPlaylist from "@/components/AudioPlaylist";

const AudioMessagePage = ({ data }) => {
  // retrieve the current playing audio ID for use of...
  // ...fetching the next audio to play
  const id = data[0].id;

  const {
    title,
    description,
    slug: audioSlug,
    duration,
    playlist: { slug: playlistSlug },
    publicID,
  } = data[0];

  // store the description of the fetched audio message
  const description_ref = useRef();

  return (
    <>
      <main className="xl:h-full xl:grid xl:grid-cols-2">
        <section
          className="lg:mx-10 xl:m-0 lg:py-8 xl:px-10 bg-la-300 dark:bg-dp-200 flex flex-col xl:justify-between gap-15 lg:rounded-t-lg xl:rounded-tr-none xl:rounded-br-none xl:rounded-bl-lg"
          role="message">
          <div className="px-5 py-4 flex items-center gap-2 text-black-300 dark:text-white-300">
            <Link
              href={`/audio-message/${audioSlug}/?playlist=${playlistSlug}`}
              className="text-xs">
              Go back to playlist
            </Link>

            <ChevronRightIcon className="w-4" />
          </div>

          <AudioPlaylist />

          <div className="px-5 flex flex-col gap-3">
            <span className="w-fit px-3 py-2 rounded-full bg-white-300 text-xs lg:text-sm text-black-300">
              Audio post
            </span>
            <h3 className="font-bold text-black-300 dark:text-white-300">{title}</h3>
          </div>

          {/* ON MOBILE & TABLET DEVICES */}
          <div className="bg-la-100 dark:bg-black-200 px-3 py-5">
            <AudioPlayer.Board
              publicID={publicID}
              title={title}
              fileDuration={duration}
            />
          </div>
        </section>

        <section
          className="p-5 xl:px-10 xl:py-8 lg:mx-10 xl:m-0 lg:bg-la-50 lg:dark:bg-dp-500 flex flex-col xl:justify-between gap-5 lg:gap-8 lg:rounded-b-lg"
          role="details and more">
          <div className="flex flex-col gap-3 lg:gap-4" role="description">
            <p className="font-semibold text-base lg:text-umd">Description</p>
            <p
              ref={description_ref}
              className="text-sm lg:text-base text-justify text-black-300 dark:text-white-300">
              {description}
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export async function getStaticPaths() {
  const res = await fetch("http://localhost:1337/api/audio-messages");

  const data = await res.json();

  const paths = data.map(({ slug }) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:1337/api/audio-messages?q=${params.slug}`);

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default AudioMessagePage;
