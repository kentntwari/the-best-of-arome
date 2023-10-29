import useSWR from "swr";

const usePlaylistCatalogue = (playlist, options = null) => {
  const { data: catalogue } = useSWR(() => {
    if (options?.sortBy === "shortest")
      return `${process.env.NEXT_PUBLIC_EXTERNAL_RESSOURCES_URL}/api/playlists/${playlist}?sortBy=duration`;

    if (options?.sortBy === "longest")
      return `${process.env.NEXT_PUBLIC_EXTERNAL_RESSOURCES_URL}/api/playlists/${playlist}?sortBy=duration&order=desc`;

    if (options?.sortBy === "most-recent")
      return `${process.env.NEXT_PUBLIC_EXTERNAL_RESSOURCES_URL}/api/playlists/${playlist}?sortBy=id&order=desc`;

    if (options?.sortBy === "oldest")
      return `${process.env.NEXT_PUBLIC_EXTERNAL_RESSOURCES_URL}/api/playlists/${playlist}?sortBy=id`;

    return `${process.env.NEXT_PUBLIC_EXTERNAL_RESSOURCES_URL}/api/playlists/${playlist}`;
  });

  return catalogue;
};

export { usePlaylistCatalogue };
