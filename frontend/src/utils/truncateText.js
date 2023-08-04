export function truncateText(
  text,
  desiredNumberOfCharater = 0,
  enableTrailingDots = true
) {
  if (typeof desiredNumberOfCharater !== 'number')
    console.error('number of character to truncate must be of type number');

  if (desiredNumberOfCharater === 0) {
    console.warn(
      'provide at least a number of character greater than 0 to see better text truncating results'
    );

    return text;
  }

  if (text?.length > desiredNumberOfCharater) {
    return `${text.substring(0, desiredNumberOfCharater)}${enableTrailingDots && '...'}`;
  }

  return text;
}
