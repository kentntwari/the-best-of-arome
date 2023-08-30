import { useRouter } from "next/router";

import useSWR from "swr";

const useNormalizeQuery = (fieldType, options = {}) => {
  const router = useRouter();

  switch (fieldType) {
    case "get next message": {
      if (options === {})
        console.error("options is an empty object. Pass in an id and/or playlist values");

      const fetcher = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
          const error = new Error("An error occurred while fetching the data.");
          // Attach extra info to the error object.
          error.info = await res.json();
          error.status = res.status;
          throw error;
        }

        return res.json();
      };

      const { data: initialData, error } = useSWR(() => {
        if (options?.playlist && options?.playlist !== "")
          return `http://localhost:1337/api/get-next-message/${options?.id}?playlist=${options.playlist}`;

        return `http://localhost:1337/api/get-next-message/${options?.id}`;
      }, fetcher);

      const { data: resetToFirstAudio } = useSWR(() => {
        if (error?.status === 404) {
          return "http://localhost:1337/api/get-next-message/0";
        }
      });

      // Endpoins for initial data doesn't exist
      if (error?.status === 404 && resetToFirstAudio) {
        return {
          nextInQueue: resetToFirstAudio,
        };
      }

      return {
        nextInQueue: initialData,
      };
    }
    /* Case specific endpoints */
    case "get single": {
      if (options === {})
        throw new Error(
          "Cannot retrieve get single in useNormalizeQuery hook of empty options"
        );

      if (options?.value === "" || !options?.value)
        throw new Error(
          "value key in options of useNormalizeQuery hook cannot be empty or null"
        );

      /* For single playlist and by query sort */
      if (options?.type === "playlist") {
        const { data: playlist } = useSWR(() => {
          if (router.query.sort === "shortest")
            return `http://localhost:1337/api/playlists/${options?.value}?sortBy=duration`;

          if (router.query.sort === "longest")
            return `http://localhost:1337/api/playlists/${options?.value}?sortBy=duration&order=desc`;

          if (router.query.sort === "most-recent")
            return `http://localhost:1337/api/playlists/${options?.value}?sortBy=id&order=desc`;

          if (router.query.sort === "oldest")
            return `http://localhost:1337/api/playlists/${options?.value}?sortBy=id`;

          return `http://localhost:1337/api/playlists/${options?.value}`;
        });

        if (!playlist) {
          return {
            playlist: undefined,
          };
        }
        
        return {
          playlist,
        };
      }
    }

    default: {
      console.error(
        `field type ${fieldType} is not applicable in hook useExtractorFields`
      );
    }
  }
};

export { useNormalizeQuery };
