import { configureStore } from '@reduxjs/toolkit';

import loginStore from '@/store/login.store';

import tweetStore from '@/store/tweet.store';
import userStore from '@/store/user.store';
import hashtagStore from '@/store/hashtag.store';

export const store = configureStore({
  reducer: {
    login: loginStore,
    tweetStore: tweetStore,
    userStore: userStore,
    hashtagStore:hashtagStore
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
