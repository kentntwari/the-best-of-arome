import Link from 'next/link';

import AudioPlayer from '../AudioPlayer';

const Snippet = (props) => {
  const {
    attributes: {
      title,
      slug,
      audio: {
        data: {
          attributes: { alternativeText, url },
        },
      },
    },
  } = props;

  return (
    <div
      className="bg-la-300 dark:bg-dp-300 p-3 rounded-lg flex flex-col gap-6"
      title={`audio - ${alternativeText}`}>
      <p className="font-semibold text-base text-ls-400">{title}</p>

      <div className="flex items-center justify-between">
        <Link
          href={`/audio-message/${encodeURIComponent(slug)}`}
          className="bg-la-50 px-3 py-2 rounded text-xs text-ls-500">
          Read details
        </Link>

        <AudioPlayer playing={url} type="playonly" />
      </div>
    </div>
  );
};

export default Snippet;
