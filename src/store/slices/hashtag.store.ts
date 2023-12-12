import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Utils
import { getHashtags } from '@/utils/axios';

// Types
import type { IHashtag } from '@/common/types';
import { RootState } from '@/store';

export const fetchHashtags = createAsyncThunk('hashtags/fetchHashtags', async () => {
  const { data } = await getHashtags();
  return data;
});

interface hashtagState {
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
  } as hashtagState,
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
