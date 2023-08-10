import Link from "next/link";

import { useExtractFields } from "@/hooks/useExtractFields";

import { ChevronRightIcon } from "@heroicons/react/24/solid";

const NextInQueue = ({ id, playlist }) => {
  const { nextInqueue } = useExtractFields("next in queue", { id, playlist });

  if (!nextInqueue) return;

  return (
    <>
      <Link href={`/audio-message/${encodeURIComponent(nextInqueue.slug)}`}>
        <div
          className="px-2 py-3 rounded bg-ls-300 flex items-center justify-between"
          role="next message in queue">
          <div className="max-w-[59.7%] flex flex-col gap-2">
            <span className="text-xs text-neutral-40">Next up</span>
            <span className="font-bold text-sm text-white-300">
              {nextInqueue.title ?? "loading..."}
            </span>
          </div>

          <ChevronRightIcon className="w-5 text-white-300" />
        </div>
      </Link>
    </>
  );
};

export default NextInQueue;
