import useSWR from 'swr';

const useExtractFields = (fieldType) => {
  switch (fieldType) {
    case 'playlist': {
      /* fetch data on the client with swr...*/
      // construct url to be fetched fron audio...
      // ...from strapi audio-messages endpoint
      // const url =
      //   'http://localhost:1337/api/audio-messages?filters[playlist][slug][$eq]=prayer&populate[audio][fields][1]=url';

      // test-api
      const test_url = 'https://mocki.io/v1/9a099a38-3b65-4f9b-b7c9-974860923488';

      const { data: playlist } = useSWR(test_url);

      if (!playlist) {
        return {
          playlist: undefined,
        };
      }

      const { data } = playlist;

      const mappedData = [...data].map(
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
      );

      return {
        playlist: mappedData,
      };
    }

    case 'snippets': {
      /* fetch data on the client with swr...*/
      // construct url to be fetched for audio messages...
      // ...from strapi CMS with only the needed fields
      // const url =
      //   'http://localhost:1337/api/audio-messages?populate[playlist][fields][0]=slug&populate[audio][fields][0]=alternativeText&populate[audio][fields][1]=url';

      // for testing purposes
      const test_url = 'https://mocki.io/v1/82e531c2-4786-4c6c-b557-51d8e85e0823';

      const { data: latestMessages } = useSWR(test_url);

      if (!latestMessages) {
        return {
          snippets: undefined,
        };
      }

      // retrieve the nested array of the actual data we need
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
      console.error(
        `field type ${fieldType} is not applicable in hook useExtractorFields`
      );
    }
  }
};

export { useExtractFields };
