import { useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useSWRAudioState } from '@/hooks/useSWRAudioState';

import AudioPlayer from '@/components/AudioPlayer';
import AudioPlaylist from '@/components/AudioPlaylist';

import { ChevronRightIcon } from '@heroicons/react/24/solid';

const AudioMessagePage = ({ data }) => {
  // access url link to derive UI state from query
  const router = useRouter();

  const [, setPlayerDetails] = useSWRAudioState();

  // retrieve the data of the fetched audio message...
  // ...fro the nested response attributes in data)
  const { title, description, slug: audioSlug, playlist, audio } = data[0].attributes;

  // retrieve the playlist slug
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
          <main className="px-5 py-4 bg-la-300 flex flex-col gap-[60px]" role="message">
            <div className="flex items-center gap-2 text-black-300">
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
              <h3 className="font-bold text-black-300">{title}</h3>
            </div>
          </main>

          <div className="bg-la-100 p-5">
            <AudioPlayer />
          </div>

          <section className="p-5 flex flex-col gap-5" role="details and more">
            <div className="flex flex-col gap-3" role="description">
              <p className="font-semibold text-base">Description</p>
              <p className="text-sm text-justify text-black-300">{description}</p>
            </div>
          </section>
        </article>
      )}
    </>
  );
};

export async function getStaticPaths() {
  // const res = await fetch('http://localhost:1337/api/audio-messages');

  // for testing purposes
  const test_res = await fetch(
    'https://mocki.io/v1/82e531c2-4786-4c6c-b557-51d8e85e0823'
  );
  const { data } = await test_res.json();

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

export async function getStaticProps(ctx) {
  // get matching data with the slug of the fecthed audio message
  // const res = await fetch(
  //   `http://localhost:1337/api/audio-messages?filters[slug][$eq]=${params.slug}&populate[playlist][fields][0]=slug&populate[audio][fields][0]=alternativeText&populate[audio][fields][1]=url`
  // );

  // for testing purposes
  const test_res = await fetch(
    'https://mocki.io/v1/6cc51a1f-f0e8-4df1-ab0e-e02c67b8381b'
  );

  const { data } = await test_res.json();

  return {
    props: {
      data,
    },
  };
}

export default AudioMessagePage;
