import { useRouter } from "next/router";

import useSWR from "swr";

const useExtractFields = (fieldType, options = {}) => {
  /* General endpoints for pool of elements not too deeply nested */
  switch (fieldType) {
    case "playlists": {
      const url = "http://localhost:1337/api/playlists";

      const { data: arr } = useSWR(url);

      if (!arr) {
        return {
          playlists: undefined,
        };
      }

      const { data } = arr;

      const playlists = [...data].map(({ attributes }) => {
        return {
          name: attributes.name,
          description: attributes.description,
          slug: attributes.slug,
        };
      });

      return {
        playlists,
      };
    }

    case "snippets": {
      const url =
        "http://localhost:1337/api/audio-messages?populate[playlist][fields][0]=slug&populate[audio][fields][0]=alternativeText&populate[audio][fields][1]=url";

      const { data: latestMessages } = useSWR(url);

      if (!latestMessages) {
        return {
          snippets: undefined,
        };
      }

      const { data } = latestMessages;

      // Only 4 snippets can be exported
      const snippets = [...data].sort((a, b) => b.id - a.id).slice(0, 4);

      return {
        snippets: snippets.map(
          ({
            attributes: {
              title,
              slug,
              audio: {
                data: {
                  attributes: { alternativeText, url },
                },
              },
            },
          }) => {
            return {
              title,
              slug,
              alternativeText,
              url,
            };
          }
        ),
      };
    }

    case "next in queue": {
      const router = useRouter();

      if (options === {}) return;

      if (router.query.q) {
        const url = `http://localhost:1337/api/audio-messages?filters[playlist][slug][$eq]=${options.playlist}`;

        const { data: rawQueue } = useSWR(url);

        if (!rawQueue) {
          return {
            nextInqueue: undefined,
          };
        }

        const { data } = rawQueue;

        const normalizedQueue = [...data].map(({ attributes: { title, slug } }) => {
          return { title, slug };
        });

        const currentAudioPlayingIndex = [...data].findIndex(
          ({ attributes: { slug } }) => slug === router.query.slug
        );

        return {
          nextInqueue:
            normalizedQueue[parseInt(currentAudioPlayingIndex) + 1] ?? normalizedQueue[0],
        };
      }

      // define custom fetcher process for custom results
      const fetchNextAudioById = async () =>
        await fetch(
          `http://localhost:1337/api/audio-messages?filters[id][$eq]=${options.id}`
        ).then((res) => res.json());

      const fetchFromTop = () =>
        fetch(`http://localhost:1337/api/audio-messages?filters[id][$eq]=1`).then((res) =>
          res.json()
        );

      const fetcher = async () => {
        const initResponse = await fetchNextAudioById();

        if (initResponse?.data?.length === 0) return await fetchFromTop();

        return await fetchNextAudioById();
      };

      // use useSWR uniquely when fetching next audio to play
      const { data: raw } = useSWR("next", fetcher);

      if (!raw) {
        return {
          nextInqueue: undefined,
        };
      }

      return {
        nextInqueue: raw.data.map(({ attributes: { title, slug } }) => {
          return { title, slug };
        })[0],
      };
    }

    default: {
      /* Case specific endpoints */
      if (typeof fieldType === "object") {
        for (let key in fieldType) {
          /* For single playlist */
          if (key === "playlist") {
            const url = `http://localhost:1337/api/playlists?filters[slug]=${fieldType[key]}&populate[0]=audio_messages.audio`;

            const { data: playlist } = useSWR(url);

            if (!playlist) {
              return {
                playlist: undefined,
              };
            }

            const { data } = playlist;

            const mappedData = [...data].map(
              ({
                attributes: {
                  name,
                  description,
                  slug,
                  audio_messages: { data },
                },
              }) => {
                return {
                  name,
                  description,
                  slug,
                  audios: data.map(
                    ({
                      attributes: {
                        title,
                        description,
                        slug,
                        audio: {
                          data: {
                            attributes: { url },
                          },
                        },
                      },
                    }) => {
                      return {
                        title,
                        description,
                        slug,
                        url,
                      };
                    }
                  ),
                };
              }
            );

            return {
              playlist: mappedData[0],
            };
          }
        }
      }

      console.error(
        `field type ${fieldType} is not applicable in hook useExtractorFields`
      );
    }
  }
};

export { useExtractFields };
