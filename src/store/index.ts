import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

// Middlewares
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// Stores
import loginStore from '@/store/slices/login.store';
import tweetStore from '@/store/slices/tweet.store';
import userStore from '@/store/slices/user.store';
import hashtagStore from '@/store/slices/hashtag.store';

// Config
const persistConfig = {
  key: 'rootStore',
  storage,
  whiteList: [loginStore]
};

const reducer = persistReducer(
  persistConfig,
  combineReducers({
    login: loginStore,
    tweetStore: tweetStore,
    userStore: userStore,
    hashtagStore: hashtagStore
  })
);

export const store = configureStore({
  reducer,
  middleware: [thunk]
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
