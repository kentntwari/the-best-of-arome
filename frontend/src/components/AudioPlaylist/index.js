import { Fragment } from 'react';

import Link from 'next/link';

import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { v4 as uuidv4 } from 'uuid';

// some test data
const test_data = [
  {
    title: 'How to speak with the Holy Ghost',
    duration: '10:06',
  },
  {
    title: 'How to speak with the Holy Ghost',
    duration: '10:06',
  },
  {
    title: 'How to speak with the Holy Ghost',
    duration: '10:06',
  },
  {
    title: 'How to speak with the Holy Ghost',
    duration: '10:06',
  },
  {
    title: 'How to speak with the Holy Ghost',
    duration: '10:06',
  },
  {
    title: 'How to speak with the Holy Ghost',
    duration: '10:06',
  },
  {
    title: 'How to speak with the Holy Ghost',
    duration: '10:06',
  },
];

const AudioPlaylist = () => {
  return (
    <Fragment>
      <div className="absolute w-full h-full top-0 left-0 z-10 bg-lp-300"></div>
      <section className="w-full h-screen px-5 py-4 absolute top-0 left-0 z-20">
        <Link
          href="/browse"
          className="underline underline-offset-3 text-sm text-neutral-200 decoration-neutral-200">
          Back to Browse
        </Link>
        <article className="mt-6 px-3 py-4 rounded-lg bg-la-300 flex flex-col gap-3">
          <span className="w-fit px-3 py-2 rounded-full bg-white-300 text-xs text-black-300">
            Playlist
          </span>
          <div>
            <h3
              className="capitalize font-semibold text-black-300"
              aria-label="playlist title">
              the holy spirit
            </h3>
            <p className="mt-2 text-xs text-black-300" aria-label="playlist description">
              tortor id aliquet lectus proin nibh nisl condimentum id venenatis a
              condimentum vitae sapien pellentesque habitant morbi tristique senectus et
              netus et malesuada
            </p>
          </div>
        </article>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="grow font-semibold text-base">All messages</span>
            <button className="px-2 py-1 border border-neutral-200 rounded flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="w-4 text-neutral-200" />
              <span className="text-sm text-neutral-200">Filter</span>
            </button>
          </div>

          <div>
            {test_data.map((item, index) => (
              <div
                key={uuidv4()}
                className={`px-2 py-4 ${
                  index % 2 ? 'bg-la-50' : 'bg-la-75'
                } flex items-center`}>
                <p className="grow font-semibold text-xs text-ls-400">{item.title}</p>
                <span className="w-16 h-6 rounded bg-ls-300 flex items-center justify-center text-white-300">
                  {item.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default AudioPlaylist;
