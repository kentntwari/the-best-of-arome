import { forwardRef } from 'react';

const AudioModal = forwardRef((props, ref) => {
  const { title, url } = props;

  return (
    <dialog ref={ref} className="w-[335px] h-[400px]">
      <span>{title}</span>
      <br />
      <span>{url}</span>
    </dialog>
  );
});

export default AudioModal;
