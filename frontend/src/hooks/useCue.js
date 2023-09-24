import { useState, useCallback } from "react";

import useSWR from "swr";

const useCue = ({ initID, initSlug, playlist = null }) => {
  if (!initID)
    throw new Error("You must provide a initial starting point audio ID for useCue hook");

  const [options, setOptions] = useState({ id: null, slug: null });

  const { data: cued } = useSWR(() => {
    if ((options.id && !playlist) || (options.id && playlist === ""))
      return `http://localhost:1337/api/cue/${options.id}`;

    if (options.id && playlist)
      return `http://localhost:1337/api/cue/${options.id}?playlist=${playlist}`;

    return null;
  });

  const { data: current } = useSWR(() =>
    options.slug ? `http://localhost:1337/api/audio-messages?q=${options.slug}` : null
  );

  const set = useCallback(() =>
    setOptions((prev) => {
      return { ...prev, id: initID, slug: initSlug };
    }, [])
  );

  const reset = useCallback(() =>
    setOptions((prev) => {
      return { ...prev, id: null, slug: null };
    }, [])
  );

  const setPrevious = useCallback(() => {
    const prevID = cued?.at(0)?.prev?.id;
    const prevSlug = cued?.at(0)?.prev?.slug;

    return setOptions((prev) => {
      return { ...prev, id: prevID, slug: prevSlug };
    });
  }, [cued?.at(0)?.prev?.id, cued?.at(0)?.prev?.slug]);

  const setNext = useCallback(() => {
    const nextID = cued?.at(0)?.next?.id;
    const nextSlug = cued?.at(0)?.next?.slug;

    return setOptions((prev) => {
      return { ...prev, id: nextID, slug: nextSlug };
    });
  }, [cued?.at(0)?.next?.id, cued?.at(0)?.next?.slug]);

  return [
    {
      prev: cued?.at(0)?.prev ?? null,
      current: current?.at(0) ?? null,
      next: cued?.at(0)?.next ?? null,
    },
    {
      set,
      reset,
      setPrevious,
      setNext,
    },
  ];
};

export { useCue };
