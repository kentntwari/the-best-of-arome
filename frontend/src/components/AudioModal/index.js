import { forwardRef } from 'react';

import { XCircleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

import { useSWRAudioState } from '@/hooks/useSWRAudioState';
import { usePlayerContext } from '@/hooks/usePlayerContext';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

const AudioModal = forwardRef((props, ref) => {
  const context = usePlayerContext();
  const { Components } = useAudioPlayer();
  const [playerDetails] = useSWRAudioState();

  return (
    <dialog ref={ref} className="w-[335px] h-[400px] p-0 border-none appearance-none">
      <XCircleIcon className="w-6 absolute top-1 right-1 text-neutral-10" />
      <div className="bg-black-300 w-full h-32"></div>
      <section className="p-3 flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <span className="font-semibold text-base text-ls-500">
            {playerDetails.title}
          </span>
          <div className="flex items-center gap-2">
            <Components.CurrentTime variant="text-ls-500" />
            <Components.ProgressBar />
            <Components.Duration variant="text-ls-500" />
          </div>

          <div className="flex justify-center items-center gap-4">
            <Components.Back variant="text-ls-500" />

            {context.isAudioPlaying === false ? (
              <Components.Play variant="text-ls-500" />
            ) : (
              <Components.Pause variant="text-ls-500" />
            )}

            <Components.Forward variant="text-ls-500" />
          </div>
        </div>

        <a href="/" className="flex self-center">
          <span className="text-sm text-neutral-100">See full description</span>
          <ArrowTopRightOnSquareIcon className="ml-2 w-4 text-netural-100" />
        </a>
      </section>
    </dialog>
  );
});

export default AudioModal;
