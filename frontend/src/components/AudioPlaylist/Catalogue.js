import { useRouter } from "next/router";

import { v4 as uuidv4 } from "uuid";

import { usePlaylistCatalogue } from "@/hooks/usePlaylistCatalogue";

import Filter from "./Filter";
import AudioModal from "@/components/AudioModal";
import * as Shapes from "@/components/Skeletons/ShapeSkeleton";

import { convertToMinutesSeconds } from "@/utils/convertToMinutesSeconds";

const Catalogue = () => {
  const router = useRouter();

  const catalogue = usePlaylistCatalogue(router.query.playlist, {
    sortBy: router.query.sort,
  });

  return (
    <>
      <section className="mt-6 flex flex-col gap-4">
        <div className="relative flex items-center justify-between">
          <span className="grow font-semibold text-base">All messages</span>

          <Filter />
        </div>
        {!catalogue && <Shapes.LineSkeleton width="w-1/2" height="h-10" />}

        {catalogue && (
          <ul className="border border-la-300 dark:border-dp-200">
            {catalogue?.map((details, index) => (
              <li
                key={uuidv4()}
                className={`${
                  index % 2
                    ? "bg-la-50 hover:bg-la-100 dark:bg-dp-300 dark:hover:bg-dp-500"
                    : "bg-la-75 hover:bg-la-100 dark:bg-dp-400 dark:hover:bg-dp-500"
                }`}>
                <AudioModal
                  fileID={details.id}
                  fileSlug={details.slug}
                  cue={router.query.playlist}>
                  <div
                    className={`px-2 py-4 flex items-center justify-between cursor-pointer`}>
                    <p className="grow truncate font-semibold text-xs text-ls-400 dark:text-white-300">
                      {details.title}
                    </p>

                    <span className='ml-6 w-16 h-6 rounded bg-ls-300 dark:bg-neutral-10 flex items-center justify-center text-white-300 dark:text-ds-500 text-xs"'>
                      {convertToMinutesSeconds(details.duration)}
                    </span>
                  </div>
                </AudioModal>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default Catalogue;
