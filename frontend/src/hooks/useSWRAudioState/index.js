import { useEffect } from 'react';
import useSWR from 'swr';

const useSWRAudioState = (
  key = 'queried',
  initialData = { title: '', slug: '', url: '', isAudioPlaying: false }
) => {
  const { data, mutate } = useSWR(key, () => initialData);

  return [
    data ?? initialData,
    (playerDetails) =>
      mutate(
        {
          ...data,
          title: playerDetails.title,
          slug: playerDetails.slug,
          url: playerDetails.url,
          isAudioPlaying: playerDetails.isAudioPlaying,
        },
        { revalidate: false }
      ),
  ];
};

export { useSWRAudioState };
