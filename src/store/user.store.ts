import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Types
import type { IUser } from '@/common/types';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {
      username: '',
      displayname: '',
      profilePicture: ''
    },
    isLoggedIn: false
  } as IUser,
  reducers: {
    login: (
      state: IUser,
      action: PayloadAction<{
        username: string;
        displayname: string;
        profilePicture: string;
      }>
    ) => {
      state.data = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state: IUser) => {
      state.isLoggedIn = false;
      state.data = null;
    }
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
