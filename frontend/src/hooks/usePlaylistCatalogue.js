import useSWR from "swr";

const usePlaylistCatalogue = (playlist, options = null) => {
  const { data: catalogue } = useSWR(() => {
    if (options?.sortBy === "shortest")
      return `https://the-best-of-arome.onrender.com/api/playlists/${playlist}?sortBy=duration`;

    if (options?.sortBy === "longest")
      return `https://the-best-of-arome.onrender.com/api/playlists/${playlist}?sortBy=duration&order=desc`;

    if (options?.sortBy === "most-recent")
      return `https://the-best-of-arome.onrender.com/api/playlists/${playlist}?sortBy=id&order=desc`;

    if (options?.sortBy === "oldest")
      return `https://the-best-of-arome.onrender.com/api/playlists/${playlist}?sortBy=id`;

    return `https://the-best-of-arome.onrender.com/api/playlists/${playlist}`;
  });

  return catalogue;
};

export { usePlaylistCatalogue };
