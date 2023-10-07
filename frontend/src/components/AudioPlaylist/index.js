import { useState, useEffect, useCallback } from "react";

import { useRouter } from "next/router";

import * as DialogPrimitive from "@radix-ui/react-dialog";

import Header from "./Header";
import Catalogue from "./Catalogue";

const AudioPlaylist = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const goBack = useCallback(
    () =>
      router.push(
        `/${router.query.slug ? `/audio-message/${router.query.slug}` : "/browse"}`
      ),
    [router.query]
  );

  useEffect(() => {
    let mounted = true;

    if (mounted && router.query.playlist) setOpen(true);
    else if (mounted && !router.query.playlist) setOpen(false);

    return () => {
      mounted = false;
    };
  }, [router.query]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed top-0 right-0 w-full h-full bg-gradient-to-l from-[rgba(106,69,34,.2)] base:from-[rgba(106,69,34,1)]
         dark:from-[rgba(0,0,0,.2)] base:dark:from-black-300 via-[rgba(106,69,34,.2)] base:via-[rgba(106,69,34,.4)]
          dark:via-[rgba(0,0,0,.2)] base:dark:via-[rgba(0,0,0,.4)] to-[rgba(106,69,34,.2)] base:to-[rgba(106,69,34,.4)]
           dark:to-[rgba(0,0,0,.2)] base:dark:to-[rgba(0,0,0,.4)] z-[9999]">
          <DialogPrimitive.Content
            onPointerDownOutside={goBack}
            onEscapeKeyDown={goBack}
            className="fixed top-20 bottom-0 base:top-0 right-0 w-full base:w-[65%] base:max-w-[34rem] xl:w-[37%] lg:h-full px-5 py-4 bg-lp-300 dark:bg-dp-200 z-40 lg:justify-self-end overflow-scroll">
            <>
              <DialogPrimitive.Close asChild>
                <button
                  type="button"
                  onClick={goBack}
                  className="mb-4 block outline-transparent underline underline-offset-3 text-sm text-neutral-200 dark:text-neutral-20 decoration-neutral-200">
                  Close & Exit
                </button>
              </DialogPrimitive.Close>

              <Header />
              <Catalogue />
            </>
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default AudioPlaylist;
