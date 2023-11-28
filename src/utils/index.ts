import type { rawTweet, IUser, ITweet } from '@/common/types';

export const shuffleArray = <T>(array: T[]) => {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const updateDocumentTitle = (newTitle: string) =>
  (document.title = newTitle);

// Parses raw tweets to ITweet
export const loadTweets = (tweets: rawTweet[], users: IUser[]) => {
  return tweets.map<ITweet>((tweet) => ({
    ...tweet,
    author: users.find((user) => user.id === tweet.authorID) ?? users[0],
    timestamp: new Date(tweet.timestamp)
  }));
};
