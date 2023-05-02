export function convertToMinutesSeconds(duration) {
  if (isNaN(duration) || !duration) return null;

  let minutes = Math.floor(duration / 60);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let seconds = Math.floor(duration % 60);
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return `${minutes}:${seconds}`;
}