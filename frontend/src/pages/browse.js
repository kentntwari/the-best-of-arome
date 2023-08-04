import { Fragment } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { useExtractFields } from "@/hooks/useExtractFields";

import { v4 as uuidv4 } from "uuid";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import AudioPlaylist from "@/components/AudioPlaylist";

const Browse = () => {
  const router = useRouter();

  const { playlists } = useExtractFields("playlists");

  if (!playlists) return;

  return (
    <>
      {router.query.playlist ? (
        <AudioPlaylist />
      ) : (
        <section className="mt-6 px-5 flex flex-col gap-4">
          <h3 className="font-bold">Browse audio messages by playlist</h3>

          <div className="grid grid-cols-1">
            {playlists.map((playlist, index, arr) => (
              <Fragment key={uuidv4()}>
                <Link href={`/browse/?playlist=${playlist.slug}`}>
                  <div
                    className={`bg-ls-300 hover:bg-ls-400 px-4 py-6 ${
                      index === 0 && "rounded-t-lg"
                    } ${
                      index === arr.length - 1 && "rounded-b-lg"
                    } flex items-center justify-between `}>
                    <div className="flex items-center gap-4">
                      <span className="uppercase font-bold text-[21.9px] text-white-300 leading-[32px]">
                        {index < 10 && "0"}
                        {index + 1}
                      </span>
                      <span className="uppercase font-bold text-[21.9px] text-white-300 leading-[32px]">
                        {playlist.name}
                      </span>
                    </div>

                    <ArrowRightIcon className="w-6 -rotate-45 text-white-300" />
                  </div>
                </Link>
              </Fragment>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Browse;
