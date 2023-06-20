import Link from 'next/link';
import Head from 'next/head';

import { ArrowRightIcon } from '@heroicons/react/24/solid';

import AudioMessage from '@/components/AudioMessage';

export default function Home() {
  return (
    <>
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
            <AudioMessage.Snippets />
          </article>
        </main>
      </div>
    </>
  );
}
