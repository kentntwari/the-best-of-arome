import { Fragment, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import AudioMessage from '@/components/AudioMessage';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function Home({ data }) {
  const memoizedData = useMemo(() => {
    return data;
  }, [data]);

  return (
    <div className="grow mt-6 px-5">
      <header className="font-extrabold">
        <h1>
          <span className="font-medium italic">Rekindling</span>
          <br />
          The Flames of <br />
          Revival
        </h1>
      </header>
      <main className="mt-12 mb-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="bg-white-300 px-3 py-2 text-xs text-black-300 rounded-full">
            Latest messages
          </p>
          <Link href="/browse" className="flex items-center gap-2 cursor-pointer">
            <span>View more</span>
            <ArrowRightIcon className="w-4" />
          </Link>
        </div>

        <article className="grid grid-cols-1 gap-3">
          {memoizedData
            .sort((a, b) => b.id - a.id)
            .slice(0, 4)
            .map((details) => (
              <Fragment key={uuidv4()}>
                <AudioMessage.Snippet {...details} />
              </Fragment>
            ))}
        </article>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // Get up to date  data of new audio messages...
  // ...from the server
  const res = await fetch(
    'http://localhost:1337/api/audio-messages?populate[playlist][fields][0]=slug&populate[audio][fields][0]=alternativeText&populate[audio][fields][1]=url'
  );

  const { data } = await res.json();

  return {
    props: {
      data,
    },
  };
}
