import { forwardRef } from 'react';

import { useSWRAudioState } from '@/hooks/useSWRAudioState';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

import { XCircleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

import AudioPlayer from '../AudioPlayer';
import AudioWavesAnimation from './AudioWavesAnimation';

const AudioModal = forwardRef((props, ref) => {
  const { methods } = useAudioPlayer();
  const [playerDetails] = useSWRAudioState();

  function closeModal() {
    methods.pauseAudio();
    ref.current.close();
    document.body.removeAttribute('style');
  }

  return (
    <dialog ref={ref} className="w-[335px] p-0 border-none rounded-lg appearance-none">
      <XCircleIcon
        className="w-6 absolute top-1 right-1 text-neutral-10 cursor-pointer"
        onClick={closeModal}
      />

      <AudioWavesAnimation />

      <section className="p-3 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-base text-ls-500">
            {playerDetails.title}
          </span>

          <AudioPlayer />
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
