import Link from "next/link";
import useSWR from "swr";
import { actions as storeActions } from "@/store";
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
  global = false,
  scoped = false,
}) => {
  const [cueData, cueActions] = useCue({
    initID: fileID,
    initSlug: fileSlug,
    playlist: cue,
    global,
    scoped,
  });

  const { data: previousMessage } = useSWR(() =>
    cueData?.prev?.slug
      ? `${process.env.NEXT_PUBLIC_EXTERNAL_RESSOURCES_URL}/api/audio-messages?q=${cueData?.prev?.slug}`
      : null
  );

  const { data: nextMessage } = useSWR(() =>
    cueData?.next?.slug
      ? `${process.env.NEXT_PUBLIC_EXTERNAL_RESSOURCES_URL}/api/audio-messages?q=${cueData?.next?.slug}`
      : null
  );

  if ((!global && !scoped) || (global && scoped))
    throw new Error("AudioModal must be either global or scoped");

  return (
    <>
      <Dialog.Root onOpenChange={cueActions.set}>
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed w-full h-full top-0 left-0 z-[9999] bg-[rgba(106,69,34,0.5)] dark:bg-[rgba(167,139,139,0.5)]">
            <Dialog.Content
              onPointerDownOutside={cueActions.reset}
              onEscapeKeyDown={cueActions.reset}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative group lg:flex lg:items-center lg:gap-10">
                {showCueControls ? (
                  <>
                    <AudioMessage.Cued
                      position="previous"
                      data={cueData?.prev}
                      className="fixed top-2/4 md:top-1/3 -left-12 md:-left-24 z-50"
                      onClick={() => {
                        cueActions.setPrevious();

                        // load the audio
                        const audioID = previousMessage?.at(0)?.publicID;
                        const title = previousMessage?.at(0)?.title;

                        if (global)
                          return storeActions.loadPreviousAudio("GLOBAL", audioID, title);

                        return storeActions.loadPreviousAudio("SCOPED", audioID, title);
                      }}
                    />

                    <AudioMessage.Cued
                      position="next"
                      data={cueData?.next}
                      className="fixed top-2/4 md:top-1/3 -right-12 md:-right-24 z-50"
                      onClick={() => {
                        cueActions.setNext();

                        // load the audio
                        const audioID = nextMessage?.at(0)?.publicID;
                        const title = nextMessage?.at(0)?.title;

                        if (global)
                          return storeActions.loadNextAudio("GLOBAL", audioID, title);

                        return storeActions.loadNextAudio("SCOPED", audioID, title);
                      }}
                    />
                  </>
                ) : null}

                <section className="relative w-[335px] lg:w-[600px] m-auto p-0 bg-ls-500 dark:bg-black-300 shadow-lp dark:shadow-dp border-none appearance-none">
                  <Dialog.Close className="w-6 absolute top-1 right-1 text-neutral-10 cursor-pointer">
                    <XCircleIcon />
                  </Dialog.Close>

                  {global ? <AudioWavesAnimation global /> : null}
                  {scoped ? <AudioWavesAnimation scoped /> : null}

                  {cueData?.current && (
                    <>
                      <div className="bg-white-300 dark:bg-black-200 p-3 flex flex-col gap-10">
                        <div className="flex flex-col gap-4 lg:gap-6">
                          <span className="font-semibold text-base lg:text-lg lg:text-center lg:text-balance text-ls-500 dark:text-white-300">
                            {cueData?.current?.title}
                          </span>

                          {global ? (
                            <AudioPlayer.Board
                              title={cueData?.current?.title}
                              fileDuration={cueData?.current?.duration}
                              publicID={cueData?.current?.publicID}
                              global
                            />
                          ) : null}

                          {scoped ? (
                            <AudioPlayer.Board
                              title={cueData?.current?.title}
                              fileDuration={cueData?.current?.duration}
                              publicID={cueData?.current?.publicID}
                              scoped
                            />
                          ) : null}
                        </div>

                        <Link
                          href={`/audio-message/${encodeURIComponent(
                            cueData?.current?.slug
                          )}?q=true`}
                          className="group flex self-center text-neutral-50">
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
