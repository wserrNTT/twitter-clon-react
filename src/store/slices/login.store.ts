import { createSlice } from '@reduxjs/toolkit';

// Types
import type { ILogin, IUser } from '@/common/types';
import type { RootState } from '@/store';
import type { PayloadAction } from '@reduxjs/toolkit';

const defaultUser: IUser = {
  _id: '',
  displayName: '',
  userName: '',
  followers: [],
  following: [],
  profilePicture: ''
};

const initialState: ILogin = {
  data: defaultUser,
  isLoggedIn: false,
  error: ''
};
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setError: (state: ILogin, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    login: (state: ILogin, action: PayloadAction<IUser>) => {
      state.data = action.payload;
      state.isLoggedIn = true;
      state.error = '';
    },
    logout: (state: ILogin) => {
      state.data = defaultUser;
      state.isLoggedIn = false;
      state.error = '';
    },
    updateFollowing: (state: ILogin, action: PayloadAction<string[]>) => {
      state.data.following = action.payload;
    }
  }
});

export const { login, logout, setError, updateFollowing } = loginSlice.actions;

export default loginSlice.reducer;

// Redux Selectors
export const selectLoginStore = (state: RootState) => state.login;
