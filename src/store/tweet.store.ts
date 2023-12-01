import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Utils
import { getTweets } from '@/utils/axios';

// Types
import type { ITweet } from '@/common/types';
import { RootState } from '@/store';
import { loadTweets } from '@/utils/axios';

export const fetchTweets = createAsyncThunk(
  'tweets/fetchTweets',
  async (payload, { rejectWithValue }) => {
    const { data, status } = await getTweets();
    if (status !== 200) return rejectWithValue(status);
    return await loadTweets(data);
  }
);

interface tweetsData {
  tweets: ITweet[];
  status: 'IDLE' | 'LOADING' | 'SUCCEEDED' | 'FAILED';
  error: string;
}

const tweetSlice = createSlice({
  name: 'tweet',
  initialState: {
    tweets: [],
    status: 'IDLE',
    error: ''
  } as tweetsData,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTweets.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED';
        state.tweets = action.payload;
      })
      .addCase(fetchTweets.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message || 'Unknown Error';
      });
  }
});
export default tweetSlice.reducer;

export const selectTweets = (state: RootState) => state.tweetStore.tweets;
