export function convertToMinutesSeconds(timeElapsed) {
  if (isNaN(timeElapsed) || !timeElapsed) return null;

  let minutes = Math.floor(timeElapsed / 60);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let seconds = Math.floor(timeElapsed % 60);
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return `${minutes}:${seconds}`;
}
