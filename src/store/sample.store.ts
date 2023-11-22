import { createSelector, createSlice } from '@reduxjs/toolkit';
import { trends } from '@/data/trends.json';
import { users } from '@/data/users.json';

// Types
import { ITrend, IUser } from '@/common/types';
import { RootState } from '@/store';
import { shuffleArray } from '@/utils';

interface sampleData {
  trends: ITrend[];
  users: IUser[];
}

export const sampleSlice = createSlice({
  name: 'samples',
  initialState: {
    trends: trends,
    users: users
  } as sampleData,
  reducers: {}
});

export default sampleSlice.reducer;

export const selectRandomTrends = createSelector(
  (state: RootState) => state.samples.trends,
  (trends) => shuffleArray(trends).slice(0, 5)
);
export const selectRandomUsers = createSelector(
  (state: RootState) => state.samples.users,
  (users) => shuffleArray(users).slice(0, 5)
);
