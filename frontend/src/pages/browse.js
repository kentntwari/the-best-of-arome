import { Fragment } from "react";

import Link from "next/link";

import useSWR from "swr";

import { v4 as uuidv4 } from "uuid";
import { CldImage } from "next-cloudinary";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import AudioPlaylist from "@/components/AudioPlaylist";

const Browse = () => {
  const { data: playlists } = useSWR("http://localhost:1337/api/playlists");

  const { data: browseDetails } = useSWR(
    "http://localhost:1337/api/browsepage?populate=*"
  );

  if (!playlists || playlists?.length === 0) return;

  return (
    <>
      <section className="mt-6 px-5 lg:px-10 flex flex-col gap-4">
        <header>
          {browseDetails?.coverText ? (
            browseDetails?.coverText
          ) : (
            <>
              <h3 className="font-bold lg:text-center lg:text-4xl">
                Browse audio messages by playlist
              </h3>
            </>
          )}
        </header>

        <main className="max-h-[410px] lg:max-h-[624px] grid grid-cols-2">
          <div className="relative row-span-full col-span-full grid z-20">
            {playlists?.map(({ name, slug }, index, arr) => (
              <Fragment key={uuidv4()}>
                <Link href={`browse/?playlist=${slug}`}>
                  <div
                    className={`h-full px-4 lg:px-8 py-6 lg:py-10 flex items-center justify-between `}>
                    <div className="flex items-center gap-4">
                      <span
                        className="uppercase font-bold text-md lg:text-2xl text-white-300 leading-[32px]"
                        style={{
                          WebkitTextFillColor: "transparent",
                          WebkitTextStrokeWidth: "1px",
                          WebkitTextStrokeColor: "white",
                        }}>
                        {index < 10 && "0"}
                        {index + 1}
                      </span>
                      <span className="uppercase font-bold text-md lg:text-2xl text-white-300 leading-[32px]">
                        {name}
                      </span>
                    </div>

                    <ArrowRightIcon className="w-6 lg:w-8 -rotate-45 text-white-300" />
                  </div>
                </Link>

                <AudioPlaylist />
              </Fragment>
            ))}
          </div>

          <div
            className={`row-span-full col-span-full bg-ls-300 dark:bg-da-500 ${
              browseDetails?.coverImage ? "opacity-[0.65]" : ""
            }  -z-10 rounded-lg`}></div>

          {browseDetails?.coverImage ? (
            <div className="relative row-span-full col-span-full -z-20">
              <CldImage
                deliveryType="upload"
                src={browseDetails?.coverImage?.public_id}
                sizes="(max-width: 768px) 50vw, 100vw"
                fill={true}
                priority={true}
                alt={browseDetails?.coverImage?.altText}
                className="rounded-lg"
                style={{ objectFit: "cover", objectPosition: "right 80% top 100%" }}
              />
            </div>
          ) : null}
        </main>
      </section>
    </>
  );
};

export default Browse;
