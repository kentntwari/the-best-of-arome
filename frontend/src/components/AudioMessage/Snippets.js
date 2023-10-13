import { Fragment } from "react";

import Link from "next/link";

import useSWR from "swr";
import Snip from "./Snip";
import * as Skeletons from "@/components/Skeletons"
import { v4 as uuidv4 } from "uuid";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

const Snippets = () => {
  const { data: snippets } = useSWR("http://localhost:1337/api/snippets");

  return (
    <div
      id="snippets"
      className="grid pb-2 md:flex grid-cols-1 base:grid-cols-2 gap-3 md:overflow-x-auto md:snap-x">
      <div className="hidden md:block w-20 flex-shrink-0 pointer-events-none"></div>

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
        className="hidden md:flex md:w-10 w-12 flex-shrink-0 flex-col items-center justify-center rounded-tl-lg rounded-bl-lg text-center text-umd text-white-300">
        <ChevronRightIcon />
      </Link>
    </div>
  );
};

export default Snippets;
