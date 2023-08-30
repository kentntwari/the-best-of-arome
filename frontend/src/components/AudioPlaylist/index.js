import { Fragment } from "react";

import { useRouter } from "next/router";

import { useNormalizeQuery } from "@/hooks/useNormalizeQuery";

import { v4 as uuidv4 } from "uuid";

import Root from "./Root";
import Header from "./Header";
import AudioFile from "./AudioFile";
import Catalogue from "./Catalogue";

const AudioPlaylist = () => {
  const router = useRouter();

  const { playlist } = useNormalizeQuery("get single", {
    type: "playlist",
    value: router.query.playlist,
  });

  if (!playlist || playlist?.length === 0) return;

  return (
    <Root>
      {playlist.map(({ name, description, catalogue: data }) => (
        <Fragment key={uuidv4()}>
          <Header>
            <h3
              className="capitalize font-semibold text-black-300 dark:text-white-300"
              aria-label="playlist title">
              {name}
            </h3>
            <p
              className="mt-2 text-xs text-black-300 dark:text-white-300"
              aria-label="playlist description">
              {description}
            </p>
          </Header>
          <Catalogue>
            {data.map((details, index) => (
              <li
                key={uuidv4()}
                className={`${
                  index % 2
                    ? "bg-la-50 hover:bg-la-100 dark:bg-dp-300 dark:hover:bg-dp-500"
                    : "bg-la-75 hover:bg-la-100 dark:bg-dp-400 dark:hover:bg-dp-500"
                }`}>
                <AudioFile {...details} />
              </li>
            ))}
          </Catalogue>
        </Fragment>
      ))}
    </Root>
  );
};

export default AudioPlaylist;
