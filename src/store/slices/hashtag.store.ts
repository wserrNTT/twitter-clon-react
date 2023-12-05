import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

// Utils
import { getHashtags } from '@/utils/axios';
import { shuffleArray } from '@/utils';

// Types
import type { IHashtag } from '@/common/types';
import { RootState } from '@/store';

export const fetchHashtags = createAsyncThunk(
  'hashtags/fetchHashtags',
  async (payload, { rejectWithValue }) => {
    const { data, status } = await getHashtags();
    if (status !== 200) return rejectWithValue(status);
    return data;
  }
);

interface hashtagData {
  hashtags: IHashtag[];
  status: 'IDLE' | 'LOADING' | 'SUCCEEDED' | 'FAILED';
  error: string;
}

const hashtagSlice = createSlice({
  name: 'hashtags',
  initialState: {
    hashtags: [],
    status: 'IDLE',
    error: ''
  } as hashtagData,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHashtags.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchHashtags.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED';
        state.hashtags = action.payload;
        state.error = '';
      })
      .addCase(fetchHashtags.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message || 'Unknown Error';
      });
  }
});
export default hashtagSlice.reducer;

export const selectHashtagStore = (state: RootState) => state.hashtagStore;
export const selectRandomHashtags = createSelector(
  (state: RootState) => state.hashtagStore.hashtags,
  (hashtags) => shuffleArray(hashtags).slice(0, 5)
);
