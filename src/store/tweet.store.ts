import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import type { ITweet } from '@/common/types';
import { RootState } from '@/store';

interface tweetsData {
  tweets: ITweet[];
  tweetError: string;
}

const tweetSlice = createSlice({
  name: 'tweet',
  initialState: {
    tweets: [],
    tweetError: ''
  } as tweetsData,
  reducers: {
    setTweets: (state: tweetsData, action: PayloadAction<ITweet[]>) => {
      state.tweets = action.payload;
    },
    setTweetsError: (state: tweetsData, action: PayloadAction<string>) => {
      state.tweetError = action.payload;
    }
  }
});
export default tweetSlice.reducer;
export const { setTweets, setTweetsError } = tweetSlice.actions;

// Redux Selectors
export const selectTweets = (state: RootState) => state.tweetStore.tweets;
export const selectTweetsError = (state: RootState) => state.tweetStore.tweetError;
