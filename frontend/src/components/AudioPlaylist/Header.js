import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import * as Shapes from "@/components/Skeletons/ShapeSkeleton";

const Header = () => {
  const router = useRouter();

  const { data: playlists } = useSWR(
    `${process.env.NEXT_PUBLIC_RESSOURCES_URL}/api/playlists`
  );

  return (
    <>
      <header
        className="min-h-[12rem] px-3 py-4 rounded-lg bg-la-300 dark:bg-black-300 flex flex-col gap-3"
        aria-label="playlist header">
        <span className="w-fit px-3 py-2 rounded-full bg-white-300 text-xs text-black-300">
          Playlist
        </span>
        {!playlists && (
          <>
            <Shapes.LineSkeleton width="w-1/2" height="h-6" />
            <Shapes.LineSkeleton width="w-2/3" />
          </>
        )}

        {playlists
          ?.filter(({ slug }) => slug === router.query.playlist)
          .map(({ name, description }) => (
            <div key={uuidv4()}>
              <h3
                className="capitalize font-semibold text-black-300 dark:text-white-300"
                aria-label={`${name} playlist`}>
                {name}
              </h3>
              <p
                className="mt-2 text-xs text-black-300 dark:text-white-300"
                aria-label="playlist description">
                {description}
              </p>
            </div>
          ))}
      </header>
    </>
  );
};

export default Header;
