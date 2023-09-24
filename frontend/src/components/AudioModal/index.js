import { useState, useCallback } from "react";

import Link from "next/link";

import useSWR from "swr";

import { useCue } from "@/hooks/useCue";

import {
  XCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import AudioWavesAnimation from "./AudioWavesAnimation";
import * as AudioPlayer from "@/components/AudioPlayer";

const AudioModal = ({
  children,
  fileID,
  fileSlug,
  cue = null,
  showCueControls = true,
}) => {
  const [options, setOptions] = useState({ id: null, slug: null });

  const set = useCallback(() =>
    setOptions((prev) => {
      return { ...prev, id: fileID, slug: fileSlug };
    }, [])
  );

  const reset = useCallback(() =>
    setOptions((prev) => {
      return { ...prev, id: null, slug: null };
    }, [])
  );

  console.log(options);

  const { data: currentAudio } = useSWR(() =>
    options.slug ? `http://localhost:1337/api/audio-messages?q=${options.slug}` : null
  );

  const { prev: previous, next } = useCue({ audioID: options.id, playlist: cue });

  return (
    <>
      <DialogPrimitive.Root onOpenChange={set}>
        <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>

        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed w-full h-full top-0 left-0 z-[9999] bg-[rgba(106,69,34,0.5)] dark:bg-[rgba(0,0,0,.5)]">
            <DialogPrimitive.Content
              onPointerDownOutside={reset}
              onEscapeKeyDown={reset}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="group lg:flex lg:items-center lg:gap-10">
                {showCueControls ? (
                  <>
                    <button
                      className="lg:order-first"
                      onClick={() =>
                        setOptions((prev) => {
                          return {
                            ...prev,
                            id: previous?.id,
                            slug: previous?.slug,
                          };
                        })
                      }
                      type="button"
                      role="previous-audio-message"
                      title={previous?.title}
                      disabled={previous ? false : true}>
                      <span
                        className={`lg:w-[72px] lg:h-[72px] bg-white-300 dark:bg-black-100 ${
                          previous ? "visible" : "invisible"
                        } flex items-center justify-center rounded-full opacity-60 group-hover:opacity-100`}>
                        <ChevronLeftIcon className="lg:w-10 lg:order-first" />
                      </span>
                    </button>
                    <button
                      className="lg:order-last"
                      onClick={() =>
                        setOptions((prev) => {
                          return {
                            ...prev,
                            id: next?.id,
                            slug: next?.slug,
                          };
                        })
                      }
                      type="button"
                      role="next-audio-message"
                      title={next?.title}
                      disabled={next ? false : true}>
                      <span
                        className={`lg:w-[72px] lg:h-[72px] bg-white-300 dark:bg-black-100 ${
                          next ? "visible" : "invisible"
                        } flex items-center justify-center rounded-full opacity-60 group-hover:opacity-100`}>
                        <ChevronRightIcon className="lg:w-10 lg:order-last" />
                      </span>
                    </button>
                  </>
                ) : null}

                <section className="relative w-[335px] lg:w-[600px] m-auto p-0 bg-ls-500 dark:bg-black-300 shadow-lp dark:shadow-dp border-none appearance-none">
                  <DialogPrimitive.Close className="w-6 absolute top-1 right-1 text-neutral-10 cursor-pointer">
                    <XCircleIcon />
                  </DialogPrimitive.Close>

                  <AudioWavesAnimation />

                  {currentAudio && (
                    <>
                      <div className="bg-white-300 p-3 flex flex-col gap-10">
                        <div className="flex flex-col gap-4 lg:gap-6">
                          <span className="font-semibold text-base lg:text-lg lg:text-center lg:[text-wrap:balance] text-ls-500 dark:text-ds-500">
                            {currentAudio.at(0).title}
                          </span>

                          <AudioPlayer.Board
                            title={currentAudio.at(0).title}
                            fileDuration={currentAudio.at(0).duration}
                            publicID={currentAudio.at(0).publicID}
                            autoPlay={true}
                          />
                        </div>

                        <Link
                          href={{
                            pathname: "/audio-message/[slug]/",
                            query: {
                              slug: currentAudio.at(0).slug,
                              q: cue ? cue : null,
                            },
                          }}
                          className="flex self-center">
                          <span className="text-sm text-neutral-100">
                            See full description
                          </span>
                          <ArrowTopRightOnSquareIcon className="ml-2 w-4 text-netural-100" />
                        </Link>
                      </div>
                    </>
                  )}
                </section>
              </div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Overlay>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
};

export default AudioModal;
