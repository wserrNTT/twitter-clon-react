import { configureStore } from '@reduxjs/toolkit';

import loginStore from '@/store/login.store';
import sampleStore from '@/store/sample.store';
import tweetStore from '@/store/tweet.store';

export const store = configureStore({
  reducer: {
    login: loginStore,
    samples: sampleStore,
    tweetStore: tweetStore
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
