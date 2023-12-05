import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

// Utils
import { getUsers } from '@/utils/axios';
import { shuffleArray } from '@/utils';

// Types
import type { IUser } from '@/common/types';
import { RootState } from '@/store';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (payload, { rejectWithValue }) => {
    const { data, status } = await getUsers();
    if (status !== 200) return rejectWithValue(status);
    return data;
  }
);

interface usersData {
  users: IUser[];
  status: 'IDLE' | 'LOADING' | 'SUCCEEDED' | 'FAILED';
  error: string;
}

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'IDLE',
    error: ''
  } as usersData,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED';
        state.users = action.payload;
        state.error = '';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message || 'Unknown Error';
      });
  }
});
export default userSlice.reducer;

export const selectUserStore = (state: RootState) => state.userStore;
export const selectRandomUsers = createSelector(
  (state: RootState) => state.userStore.users,
  (users) => shuffleArray(users).slice(0, 3)
);
