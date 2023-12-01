//Fisher-Yates Shuffle Algorithm
export const shuffleArray = <T>(array: T[]) => {
  // Creates new array
  const newArray = array.slice();
  // Loops from last item to first
  for (let i = newArray.length - 1; i > 0; i--) {
    // random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swaps items at 'i' and 'j'
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
