// Return array randomly sorted
export const shuffleArray = <T>(array: T[]) => {
  const newArray = array.slice();
  return newArray.sort(() => Math.random() - 0.5);
};
