import useSWR from "swr";

const usePlaylistCatalogue = (playlist, options = null) => {
  const { data: catalogue } = useSWR(() => {
    if (options?.sortBy === "shortest")
      return `http://localhost:1337/api/playlists/${playlist}?sortBy=duration`;

    if (options?.sortBy === "longest")
      return `http://localhost:1337/api/playlists/${playlist}?sortBy=duration&order=desc`;

    if (options?.sortBy === "most-recent")
      return `http://localhost:1337/api/playlists/${playlist}?sortBy=id&order=desc`;

    if (options?.sortBy === "oldest")
      return `http://localhost:1337/api/playlists/${playlist}?sortBy=id`;

    return `http://localhost:1337/api/playlists/${playlist}`;
  });

  return catalogue;
};

export { usePlaylistCatalogue };
