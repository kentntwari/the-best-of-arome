import Piece from './Piece';
import Snippets from './Snippets';
import NextInQueue from './NextInQueue';

const AudioMessage = {
  // exports a Snippet of the message with just...
  // a play button and a duration of the audio...
  //...as well as a link to the full audio message post
  Snippets,
  // exports next audio message in playlist queue...
  // ...with just the title and link to the data...
  NextInQueue,
  // exports a piece of an a playlist audio message...
  // ...with just the title and the total duration
  Piece,
};

export default AudioMessage;
