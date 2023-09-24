import { Fragment } from "react";

import Link from "next/link";

import useSWR from "swr";

import Snip from "./Snip";
import * as Skeletons from "@/components/Skeletons";
import * as AudioPlayer from "@/components/AudioPlayer";

import { v4 as uuidv4 } from "uuid";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

const Snippets = () => {
  const { data: snippets } = useSWR("http://localhost:1337/api/snippets");

  return (
    <AudioPlayer.Wrapper>
      <div
        id="snippets"
        className="grid pb-2 xl:flex grid-cols-1 lg:grid-cols-2 gap-3 xl:overflow-x-auto xl:snap-x">
        <div className="hidden xl:block w-20 flex-shrink-0 pointer-events-none"></div>

        {!snippets &&
          new Array(4).fill(null).map((item) => (
            <Fragment key={uuidv4()}>
              <Skeletons.SnippetSkeleton />
            </Fragment>
          ))}

        {snippets?.map((snippet) => (
          <Fragment key={uuidv4()}>
            <Snip {...snippet} />
          </Fragment>
        ))}

        <Link
          href={"/browse"}
          className="hidden xl:flex w-12 flex-shrink-0 flex-col items-center justify-center rounded-tl-lg rounded-bl-lg text-center text-umd text-white-300">
          <ChevronRightIcon />
        </Link>
      </div>
    </AudioPlayer.Wrapper>
  );
};

export default Snippets;
