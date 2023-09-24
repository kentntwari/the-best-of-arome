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

    return () => {
      mounted = false;
    };
  }, [router.query]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed top-0 right-0 lg:w-full lg:h-full bg-gradient-to-l from-[rgba(106,69,34,1)] dark:from-black-300 via-[rgba(106,69,34,.4)] dark:via-[rgba(0,0,0,.4)] to-[rgba(106,69,34,.4)] dark:to-[rgba(0,0,0,.4)] z-[9999]">
          <DialogPrimitive.Content
            onPointerDownOutside={goBack}
            onEscapeKeyDown={goBack}
            className="lg:fixed lg:top-0 lg:right-0 lg:h-full row-span-full col-span-full px-5 py-4 bg-lp-300 lg:bg-white-300 dark:bg-dp-300 lg:dark:bg-dp-200 z-40 lg:w-[65%] xl:w-[37%] lg:justify-self-end">
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
