import { useRef } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import useSWR from "swr";

import { NextSeo } from "next-seo";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";

import * as AudioMessage from "@/components/AudioMessage";
import * as AudioPlayer from "@/components/AudioPlayer";
import AudioPlaylist from "@/components/AudioPlaylist";

const AudioMessagePage = ({ data: res }) => {
  const {
    id,
    title,
    description,
    slug: audioSlug,
    duration,
    playlist: { slug: playlistSlug },
    publicID,
  } = res[0];

  const router = useRouter();

  const description_ref = useRef();

  const { data } = useSWR(() =>
    router.query.q
      ? `http://localhost:1337/api/cue/${id}?playlist=${playlistSlug}`
      : `http://localhost:1337/api/cue/${id}`
  );

  return (
    <>
      <NextSeo title={title} description={description} />

      {data?.at(0)?.prev ? (
        <AudioMessage.Cued
          position="previous"
          data={data?.at(0)?.prev}
          className="fixed top-1/2 -left-12 lg:left-0">
          <Link
            href={
              router.query.q
                ? `/audio-message/${encodeURIComponent(
                    data?.at(0)?.prev?.slug
                  )}?q=${encodeURIComponent(playlistSlug)}`
                : `/audio-message/${encodeURIComponent(data?.at(0)?.prev?.slug)}`
            }
            className="relative">
            <ChevronLeftIcon className="w-10 translate-x-2 lg:translate-x-0" />
          </Link>
        </AudioMessage.Cued>
      ) : null}

      {data?.at(0)?.next ? (
        <AudioMessage.Cued
          position="next"
          data={data?.at(0)?.next}
          className="fixed top-1/2 -right-12 lg:right-0">
          <Link
            href={
              router.query.q
                ? `/audio-message/${data?.at(0)?.next?.slug}?q=${playlistSlug}`
                : `/audio-message/${data?.at(0)?.next?.slug}`
            }
            className="relative">
            <ChevronRightIcon className="w-10 -translate-x-2 lg:translate-x-0" />
          </Link>
        </AudioMessage.Cued>
      ) : null}

      <main className="md:mx-10 xl:mx-0 md:h-full md:grid md:grid-cols-2">
        <section
          className="umd:mx-5 md:m-0 md:py-5 lg:py-8 md:px-5 lg:px-10 bg-la-300 dark:bg-dp-200 flex flex-col 
          md:justify-between umd:rounded-lg md:rounded-tl-lg md:rounded-tr-none md:rounded-br-none md:rounded-bl-lg"
          role="message">
          <div className="px-5 py-4 md:p-0 flex items-center gap-2 text-black-300 dark:text-white-300">
            <Link
              href={`/audio-message/${audioSlug}/?playlist=${playlistSlug}`}
              className="text-xs">
              Go back to playlist
            </Link>

            <ChevronRightIcon className="w-4" />
          </div>

          <AudioPlaylist />

          <div className="mt-[60px] px-5 md:p-0 lg:mt-0 flex flex-col gap-3">
            <span className="w-fit px-3 py-2 rounded-full bg-white-300 text-xs lg:text-sm text-black-300">
              Audio post
            </span>
            <h3 className="font-bold text-black-300 dark:text-white-300">{title}</h3>
          </div>

          <div className="mt-4 lg:mt-0 p-5 bg-la-100 dark:bg-black-200">
            <AudioPlayer.Board
              publicID={publicID}
              title={title}
              fileDuration={duration}
            />
          </div>
        </section>

        <section
          className="p-5 lg:px-10 lg:py-8 umd:mx-5 md:m-0 md:bg-la-50 umd:dark:bg-dp-500 flex flex-col md:justify-between
           gap-5 md:gap-8 md:rounded-tr-lg md:rounded-br-lg"
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
    revalidate: 360,
  };
}

export default AudioMessagePage;
