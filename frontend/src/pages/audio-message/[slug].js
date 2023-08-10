import { useEffect, useRef, useCallback } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { useSWRAudioState } from "@/hooks/useSWRAudioState";

import { ChevronRightIcon } from "@heroicons/react/24/solid";

import AudioPlayer from "@/components/AudioPlayer";
import AudioPlaylist from "@/components/AudioPlaylist";
import NextInQueue from "@/components/AudioMessage/NextInQueue";

import { truncateText } from "@/utils/truncateText";

const AudioMessagePage = ({ data }) => {
  // retrieve the current playing audio ID for use of...
  // ...fetching the next audio to play
  const id = data[0].id;

  // retrieve the playlist slug
  const { title, description, slug: audioSlug, playlist, audio } = data[0].attributes;

  const {
    data: {
      attributes: { slug: playlistSlug },
    },
  } = playlist;

  // retrieve nested audio details
  const {
    data: {
      attributes: { url },
    },
  } = audio;

  // access url link to derive UI state from query
  const router = useRouter();

  const [, setPlayerDetails] = useSWRAudioState();

  const description_ref = useRef();

  const revealFullDescription = useCallback(() => {
    description_ref.current.innerText = description;
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setPlayerDetails({ title, slug: audioSlug, url });
    }

    return () => {
      mounted = false;
    };
  }, [title, audioSlug, url]);

  return (
    <>
      {router.query.playlist ? (
        <AudioPlaylist />
      ) : (
        <article>
          <main
            className="px-5 py-4 bg-la-300 dark:bg-dp-200 flex flex-col gap-15"
            role="message">
            <div className="flex items-center gap-2 text-black-300 dark:text-white-300">
              <Link
                href={`/audio-message/${audioSlug}/?playlist=${playlistSlug}`}
                className="text-xs">
                Go back to playlist
              </Link>

              <ChevronRightIcon className="w-4" />
            </div>

            <div className="flex flex-col gap-3">
              <span className="w-fit px-3 py-2 rounded-full bg-white-300 text-xs text-black-300">
                Audio post
              </span>
              <h3 className="font-bold text-black-300 dark:text-white-300">{title}</h3>
            </div>
          </main>

          <div className="bg-la-100 dark:bg-black-300 p-5">
            <AudioPlayer />
          </div>

          <section className="p-5 flex flex-col gap-5" role="details and more">
            <div className="flex flex-col gap-3" role="description">
              <p className="font-semibold text-base">Description</p>
              <p
                ref={description_ref}
                className="text-sm text-justify text-black-300 dark:text-white-300">
                {truncateText(description, 320, false)}
                <span
                  onClick={revealFullDescription}
                  className="font-bold text-black-300 dark:text-white-300">
                  ...Read more
                </span>
              </p>
            </div>

            <NextInQueue id={parseInt(id) + 1} playlist={playlistSlug} />
          </section>
        </article>
      )}
    </>
  );
};

export async function getStaticPaths() {
  const res = await fetch("http://localhost:1337/api/audio-messages");

  const { data } = await res.json();

  // generate the paths
  const paths = data.map(({ attributes }) => ({
    params: {
      slug: attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // get matching data with the slug of the fecthed audio message
  const res = await fetch(
    `http://localhost:1337/api/audio-messages?filters[slug][$eq]=${params.slug}&populate[playlist][fields][0]=slug&populate[audio][fields][0]=url`
  );

  const { data } = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default AudioMessagePage;
