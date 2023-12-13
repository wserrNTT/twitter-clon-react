// Formats timestamp
export const formatDate = (date: string) => {
  const dateConverted = new Date(date);
  const currentTime = new Date().valueOf();
  const seconds = (currentTime - dateConverted.valueOf()) / 1000;
  // format in case of seconds
  if (seconds <= 60) return `${Math.floor(seconds)}s`;
  // format in case of minutes
  if (seconds <= 3600) return `${Math.floor(seconds / 60)}m`;
  // format in case of hours
  if (seconds <= 86400) return `${Math.floor(seconds / 3600)}h`;
  return dateConverted
    .toLocaleString('default', { day: '2-digit', month: 'short' })
    .replace('-', ' ');
};

export const extractHashtags = (text: string) => {
  const result = [];
  let newString = '';

  for (const word of text.split(' ')) {
    if (word.startsWith('#')) {
      result.push(newString.trim());
      newString = '';
      result.push(word);
    } else {
      newString = `${newString} ${word}`;
    }
  }
  return result.length === 0 ? [newString.trim()] : result;
};
