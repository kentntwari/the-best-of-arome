import { useEffect, useRef, useCallback } from "react";

import Link from "next/link";

import { useSWRAudioState } from "@/hooks/useSWRAudioState";
import { useCldAudioTransformation } from "@/hooks/useCldAudioTransformation";

import { ChevronRightIcon } from "@heroicons/react/24/solid";

import AudioPlayer from "@/components/AudioPlayer";
import * as AudioMessage from "@/components/AudioMessage";

import { truncateText } from "@/utils/truncateText";

const AudioMessagePage = ({ data }) => {
  // retrieve the current playing audio ID for use of...
  // ...fetching the next audio to play
  const id = data[0].id;

  const {
    title,
    description,
    slug: audioSlug,
    playlist: { slug: playlistSlug },
    publicID,
  } = data[0];

  // store the description of the fetched audio message
  const description_ref = useRef();
  const revealFullDescription = useCallback(() => {
    description_ref.current.innerText = description;
  }, []);

  const [, setPlayerDetails] = useSWRAudioState();

  // retrieve the transformed cloudinary audio url
  const transformedURL = useCldAudioTransformation(publicID);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setPlayerDetails({ title, slug: audioSlug, url: transformedURL });
    }

    return () => {
      mounted = false;
    };
  }, [title, audioSlug, transformedURL]);

  return (
    <>
      <main>
        <section
          className="lg:mx-10 px-5 py-4 lg:py-8 bg-la-300 dark:bg-dp-200 flex flex-col gap-15 lg:rounded-t-lg"
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
            <span className="w-fit px-3 py-2 rounded-full bg-white-300 text-xs lg:text-sm text-black-300">
              Audio post
            </span>
            <h3 className="font-bold text-black-300 dark:text-white-300">{title}</h3>
          </div>
        </section>

        <div className="lg:mx-10 p-5 lg:px-3 lg:py-5 bg-la-100 dark:bg-black-300">
          <AudioPlayer />
        </div>

        <section
          className="lg:mx-10 p-5 lg:bg-la-50 flex flex-col gap-5 lg:gap-8 lg:rounded-b-lg"
          role="details and more">
          <div className="flex flex-col gap-3 lg:gap-4" role="description">
            <p className="font-semibold text-base lg:text-umd">Description</p>
            <p
              ref={description_ref}
              className="text-sm lg:text-base text-justify text-black-300 dark:text-white-300">
              {truncateText(description, 320, false)}
              <span
                onClick={revealFullDescription}
                className="font-bold text-black-300 dark:text-white-300">
                ...Read more
              </span>
            </p>
          </div>

          <AudioMessage.NextInQueue id={parseInt(id)} playlist={playlistSlug} />
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
