import { Fragment, useRef, useCallback } from 'react';

import Link from 'next/link';

import { v4 as uuidv4 } from 'uuid';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

import { useExtractFields } from '@/hooks/useExtractFields';
import { useSWRAudioState } from '@/hooks/useSWRAudioState';

import AudioMessage from '../AudioMessage';
import AudioModal from '../AudioModal';

const AudioPlaylist = () => {
  const { playlist } = useExtractFields('playlist');

  const modal_ref = useRef();

  const [, setPlayerDetails] = useSWRAudioState();

  const sendGlobalPlayerDetails = useCallback((details) => {
    setPlayerDetails({
      title: details.title,
      slug: details.slug,
      url: details.url,
    });
    modal_ref.current.showModal();
    document.body.setAttribute('style', 'overflow: hidden');
  }, []);

  if (!playlist) return;

  return (
    <>
      <AudioModal ref={modal_ref} />

      <section className="px-5 py-4">
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
            {playlist.map((details, index) => (
              <div key={uuidv4()} onClick={() => sendGlobalPlayerDetails(details)}>
                <AudioMessage.Piece
                  data={details}
                  trackBg={index % 2 ? 'bg-la-50' : 'bg-la-75'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AudioPlaylist;
