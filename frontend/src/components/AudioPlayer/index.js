import { usePlayerContext } from '@/hooks/usePlayerContext';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

const AudioPlayer = (props) => {
  const { Components } = useAudioPlayer(props.title, props.slug, props.url);
  const context = usePlayerContext();

  return (
    <>
      <div className="bg-la-100 p-5 flex flex-col gap-5">
        <div className="grid grid-cols-[35px_1fr_35px] items-center gap-1">
          <Components.CurrentTime />
          <Components.ProgressBar />
          <Components.Duration />
        </div>

        <div className="flex items-center justify-center gap-4">
          <Components.Back />
          {context.isAudioPlaying === true ? <Components.Pause /> : <Components.Play />}
          <Components.Forward />
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
