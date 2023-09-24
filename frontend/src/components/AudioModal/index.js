import Link from "next/link";

import { useCue } from "@/hooks/useCue";

import * as AudioPlayer from "@/components/AudioPlayer";
import * as AudioMessage from "@/components/AudioMessage";
import AudioWavesAnimation from "./AudioWavesAnimation";

import * as Dialog from "@radix-ui/react-dialog";
import { XCircleIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

const AudioModal = ({
  children,
  fileID,
  fileSlug,
  cue = null,
  showCueControls = true,
}) => {
  const [data, actions] = useCue({
    initID: fileID,
    initSlug: fileSlug,
    playlist: cue,
  });

  const { prev: previous, current, next } = data;

  return (
    <>
      <Dialog.Root onOpenChange={actions.set}>
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed w-full h-full top-0 left-0 z-[9999] bg-[rgba(106,69,34,0.5)] dark:bg-[rgba(0,0,0,.5)]">
            <Dialog.Content
              onPointerDownOutside={actions.reset}
              onEscapeKeyDown={actions.reset}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="group lg:flex lg:items-center lg:gap-10">
                {showCueControls ? (
                  <>
                    <AudioMessage.Cued
                      position="previous"
                      data={previous}
                      onClick={actions.setPrevious}
                    />

                    <AudioMessage.Cued
                      position="next"
                      data={next}
                      onClick={actions.setNext}
                    />
                  </>
                ) : null}

                <section className="relative w-[335px] lg:w-[600px] m-auto p-0 bg-ls-500 dark:bg-black-300 shadow-lp dark:shadow-dp border-none appearance-none">
                  <Dialog.Close className="w-6 absolute top-1 right-1 text-neutral-10 cursor-pointer">
                    <XCircleIcon />
                  </Dialog.Close>

                  <AudioWavesAnimation />

                  {current && (
                    <>
                      <div className="bg-white-300 p-3 flex flex-col gap-10">
                        <div className="flex flex-col gap-4 lg:gap-6">
                          <span className="font-semibold text-base lg:text-lg lg:text-center lg:[text-wrap:balance] text-ls-500 dark:text-ds-500">
                            {current?.title}
                          </span>

                          <AudioPlayer.Board
                            title={current?.title}
                            fileDuration={current?.duration}
                            publicID={current?.publicID}
                            autoPlay={true}
                          />
                        </div>

                        <Link
                          href={{
                            pathname: "audio-message/[slug]/",
                            query: {
                              slug: current?.slug,
                              q: cue ? cue : null,
                            },
                          }}
                          className="group flex self-center text-neutral-100">
                          <span className="text-sm ">See full description</span>
                          <ArrowTopRightOnSquareIcon className="ml-2 w-4" />
                        </Link>
                      </div>
                    </>
                  )}
                </section>
              </div>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default AudioModal;
