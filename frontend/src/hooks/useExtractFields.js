import useSWR from "swr";

const useExtractFields = (fieldType) => {
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
