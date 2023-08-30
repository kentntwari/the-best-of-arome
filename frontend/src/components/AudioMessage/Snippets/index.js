import { Fragment } from "react";

import useSWR from "swr";

import { v4 as uuidv4 } from "uuid";

import Snippet from "./Snippet";
import * as Skeletons from "@/components/Skeletons";

const Snippets = () => {
  const { data: snippets } = useSWR("http://localhost:1337/api/get-snippets");

  if (!snippets)
    return (
      <>
        {new Array(4).fill(null).map((item) => (
          <Fragment key={uuidv4()}>
            <Skeletons.SnippetSkeleton />
          </Fragment>
        ))}
      </>
    );

  return (
    <>
      {snippets?.map((details) => (
        <Fragment key={uuidv4()}>
          <Snippet {...details} />
        </Fragment>
      ))}
    </>
  );
};

export default Snippets;
