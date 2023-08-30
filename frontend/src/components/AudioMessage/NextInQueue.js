import Link from "next/link";
import { useRouter } from "next/router";

import { useNormalizeQuery } from "@/hooks/useNormalizeQuery";

import { ChevronRightIcon } from "@heroicons/react/24/solid";

const NextInQueue = ({ id, playlist }) => {
  const router = useRouter();

  const { nextInQueue } = useNormalizeQuery("get next message", {
    id,
    playlist: !router.query.q ? "" : playlist,
  });

  if (!nextInQueue || nextInQueue === {}) return;

  return (
    <>
      <Link
        href={`/audio-message/${encodeURIComponent(nextInQueue.slug)}${
          router.query.q ? "?q=" + router.query.q : ""
        }`}>
        <div
          className="px-2 py-3 rounded bg-ls-300 dark:bg-dp-200 flex items-center justify-between"
          role="next message in queue">
          <div className="max-w-[59.7%] flex flex-col gap-2">
            <span className="text-xs text-neutral-40">Next up</span>
            <span className="font-bold text-sm text-white-300">
              {nextInQueue.title ?? "loading..."}
            </span>
          </div>

          <ChevronRightIcon className="w-5 text-white-300" />
        </div>
      </Link>
    </>
  );
};

export default NextInQueue;
