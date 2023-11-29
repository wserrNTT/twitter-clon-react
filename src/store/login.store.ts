import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Types
import type { ILogin, IUser } from '@/common/types';

const defaultUser: IUser = {
  id: 0,
  displayname: '',
  username: '',
  followers: 0,
  following: 0,
  profilePicture: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: defaultUser,
    isLoggedIn: false
  } as ILogin,
  reducers: {
    login: (state: ILogin, action: PayloadAction<IUser>) => {
      state.data = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state: ILogin) => {
      state.isLoggedIn = false;
      state.data = defaultUser;
    }
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
