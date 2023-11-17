import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

// Types
import type { IUser } from '@/common/types';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    isLoggedIn: false
  } as IUser,
  reducers: {
    toggleLogin: (state: IUser) => {
      state.isLoggedIn = !state.isLoggedIn;
    }
  }
});

export const { toggleLogin } = userSlice.actions;

export default userSlice.reducer;
