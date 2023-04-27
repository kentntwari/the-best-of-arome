import { Fragment } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';
import AudioMessage from '@/components/AudioMessage';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function Home() {
  /* fetch data on the client with swr...*/
  // construct url to be fetched for audio messages...
  // ...from strapi CMS with only the needed fields
  // const url =
  //   'http://localhost:1337/api/audio-messages?populate[playlist][fields][0]=slug&populate[audio][fields][0]=alternativeText&populate[audio][fields][1]=url';

  // for testing purposes
  const test_url = 'https://mocki.io/v1/82e531c2-4786-4c6c-b557-51d8e85e0823';

  const { data: latestMessages } = useSWR(test_url);

  if (!latestMessages) return;

  // retrieve the nested array of the actual data we need
  const { data } = latestMessages;

  return (
    <Fragment>
      <Head>
        <title>Home | The Best of Apostle Arome Osayi</title>
        <meta
          name="description"
          content="A compilation website of the most inspirational messages by Apostle Arome Osayi"
          key="description"
        />
        <meta
          name="description"
          content="Audio messages by Apostle Arome Osayi, from prayer to bible study topics"
          key="description"
        />
      </Head>

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
            {[...data]
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
    </Fragment>
  );
}
