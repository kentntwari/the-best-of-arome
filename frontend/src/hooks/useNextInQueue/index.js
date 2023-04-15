import useSWR from 'swr';

// Get the next audio in a playlist queue
const useNextInQueue = (playlist, audioSlug) => {
  // Define url that will be the basis of the requests
  const url = `http://localhost:1337/api/playlists?filters[slug][$eq]=${playlist}&populate[1]=audio_messages.audio`;

  // Retrieve data from strapi
  const { data, isLoading, error } = useSWR(url, getAsyncAudioFromPlaylist);

  // Asynchronously get the audio in the playlist...
  async function getAsyncAudioFromPlaylist() {
    const fetchAudioInPlaylist = await fetch(url).then((res) => res.json());
    return await getNested(fetchAudioInPlaylist?.data[0]);
  }

  // Define the function that will produce the array...
  // ...nested with the playlist
  function getNested(data) {
    if (data?.attributes) {
      const {
        attributes: {
          audio_messages: {
            data: [...nestedAudio],
          },
        },
      } = data;

      return nestedAudio;
    }
  }

  // sort the array and get the next element following...
  // ...the current audio, otherwise restart from top
  function getNextAudio(arr) {
    // Second get the id of the current audio...
    // ...from a sorted array
    const currentAudioID = arr
      ?.sort((a, b) => b?.id - a?.id)
      ?.findIndex((data) => data?.attributes?.slug === audioSlug);

    return (arr &&= arr[currentAudioID + 1] ?? arr[0]);
  }

  return {
    nextAudio: getNextAudio(data),
    isAPILoading: isLoading,
    isAPIerror: error,
  };
};

export default useNextInQueue;
