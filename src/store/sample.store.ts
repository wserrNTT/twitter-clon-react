import { createSelector, createSlice } from '@reduxjs/toolkit';
import { trends } from '@/data/trends.json';
import { users } from '@/data/users.json';
import { tweets } from '@/data/tweets.json';

// Types
import { ITrend, ITweet, IUser } from '@/common/types';
import { RootState } from '@/store';
import { shuffleArray } from '@/utils';

// Utils
import { loadTweets } from '@/utils';

interface sampleData {
  trends: ITrend[];
  users: IUser[];
  tweets: ITweet[];
}

export const sampleSlice = createSlice({
  name: 'samples',
  initialState: {
    trends: trends,
    users: users,
    tweets: loadTweets(tweets, users)
  } as sampleData,
  reducers: {}
});

export default sampleSlice.reducer;

// Redux selectors
export const selectRandomTrends = createSelector(
  (state: RootState) => state.samples.trends,
  (trends) => shuffleArray(trends).slice(0, 5)
);
export const selectRandomUsers = createSelector(
  (state: RootState) => state.samples.users,
  (users) => shuffleArray(users).slice(0, 3)
);
