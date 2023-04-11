import { useRouter } from 'next/router';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const AudioMessage = ({ data }) => {
  // access the router object to retrieve the playlist...
  //...passed in the router and pass it in the link
  const router = useRouter();

  // retrieve the data of the fetched audio message...
  // ...fro the nested response attributes in data
  const { title, description } = data[0].attributes;

  return (
    <article>
      <main className="px-5 py-4 bg-la-300 flex flex-col gap-[60px]" role="message">
        <div className="flex items-center gap-2 text-black-300">
          <Link
            href={`/playlist/${encodeURIComponent(router.query.playlist)}`}
            className="text-xs">
            Go back to playlist
          </Link>
          <ChevronRightIcon className="w-4" />
        </div>

        <div className="flex flex-col gap-3">
          <span className="w-fit px-3 py-2 rounded-full bg-white-300 text-xs text-black-300">
            Audio post
          </span>
          <h3 className="font-bold text-black-300">{title}</h3>
        </div>
      </main>

      <section className="p-5 flex flex-col gap-3" role="details">
        <div className="flex flex-col gap-3" role="description">
          <div>
            <p className="font-semibold text-base">Description</p>
          </div>
          <p className="text-sm text-justify text-black-300">{description}</p>
        </div>
      </section>
    </article>
  );
};

export async function getStaticPaths() {
  const res = await fetch('http://localhost:1337/api/audio-messages');
  const { data } = await res.json();

  // generate the paths
  const paths = data.map(({ attributes }) => ({
    params: {
      slug: attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // get matching data with the slug of the fecthed audio message
  const res = await fetch(
    `http://localhost:1337/api/audio-messages?filters[slug][$eq]=${params.slug}&populate[audio][fields][0]=alternativeText&populate[audio][fields][1]=url`
  );
  const { data } = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default AudioMessage;
