import { memo } from 'react';

import {
  PlayCircleIcon,
  PauseCircleIcon,
  ForwardIcon,
  BackwardIcon,
} from '@heroicons/react/24/solid';

const Back = memo(BackwardIcon);
const Play = memo(PlayCircleIcon);
const Pause = memo(PauseCircleIcon);
const Forward = memo(ForwardIcon);

export const Controls = {
  Play,
  Pause,
  Back,
  Forward,
};
