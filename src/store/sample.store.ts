import { createSelector, createSlice } from '@reduxjs/toolkit';
import { trends } from '@/data/trends.json';
import { users } from '@/data/users.json';

// Types
import type { ITrend, IUser } from '@/common/types';
import type { RootState } from '@/store';

// Utils
import { shuffleArray } from '@/utils';

interface sampleData {
  trends: ITrend[];
  users: IUser[];
}

const initialState: sampleData = {
  trends: trends,
  users: users
};

export const sampleSlice = createSlice({
  name: 'samples',
  initialState,
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
