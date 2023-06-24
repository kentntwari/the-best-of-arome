import useSWR from 'swr';

const useSWRAudioState = (
  key = 'queried',
  initialData = { title: '', slug: '', url: '' }
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
        },
        { revalidate: false }
      ),
  ];
};

export { useSWRAudioState };
