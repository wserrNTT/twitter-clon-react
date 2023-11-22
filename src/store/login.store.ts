import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Types
import type { ILogin, IUser } from '@/common/types';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isLoggedIn: false
  } as ILogin,
  reducers: {
    login: (state: ILogin, action: PayloadAction<IUser>) => {
      state.data = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state: ILogin) => {
      state.isLoggedIn = false;
      state.data = null;
    }
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
