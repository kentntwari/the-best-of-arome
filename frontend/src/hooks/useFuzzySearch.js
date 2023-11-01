import { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import debounce from "lodash.debounce";

const useFuzzySearch = () => {
  const [query, setQuery] = useState(null);

  const { data } = useSWR(
    query ? `${process.env.NEXT_PUBLIC_RESSOURCES_URL}/api/search?q=${query}` : null
  );

  const setDebouncedQuery = useMemo(
    () => debounce((element) => setQuery(element?.target?.value ?? element), 500),
    []
  );

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      setDebouncedQuery.cancel();
    };
  }, []);

  return [data, setDebouncedQuery];
};

export { useFuzzySearch };
