import { Fragment } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';
import Episode from '@/components/Episode';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function Home() {
  // Fetch audio messages
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const url =
    'http://localhost:1337/api/audio-messages?populate[audio][fields][0]=name&populate[audio][fields][1]=alternativeText&populate[audio][fields][2]=url&populate[audio][fields][3]=provider_metadata';

  const { data: resp } = useSWR(url, fetcher);

  if (!resp) return;

  const { data } = resp;

  return (
    <div className="mt-6 px-5">
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
          {data
            .sort((a, b) => a.id - b.id)
            .slice(0, 4)
            .map((details) => (
              <Fragment key={uuidv4()}>
                <Episode {...details} />
              </Fragment>
            ))}
        </article>
      </main>
    </div>
  );
}
