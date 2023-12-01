import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Utils
import { getLoginUser } from '@/utils/axios';

// Types
import type { ILogin, IUser } from '@/common/types';
import type { RootState } from '@/store';

const defaultUser: IUser = {
  id: 0,
  displayName: '',
  userName: '',
  followers: [],
  following: [],
  profilePicture: ''
};

export const fetchLoginData = createAsyncThunk(
  'login/fetchLoginData',
  async (payload: { loginuser: string; loginpassword: string }, { rejectWithValue }) => {
    const { loginuser, loginpassword } = payload;
    const { data, status: loginStatus } = await getLoginUser(loginuser, loginpassword);
    if (loginStatus === 500) return rejectWithValue(data.message);

    return data.user;
  }
);

const initialState: ILogin = {
  data: defaultUser,
  status: 'IDLE',
  isLoggedIn: false,
  error: ''
};
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state: ILogin) => {
      state.isLoggedIn = false;
      state.data = defaultUser;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginData.pending, (state) => {
        state.status = 'LOADING';
        state.isLoggedIn = false;
      })
      .addCase(fetchLoginData.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED';
        state.data = action.payload ?? defaultUser;
        state.isLoggedIn = true;
      })
      .addCase(fetchLoginData.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message ?? 'Unknown error';
        state.isLoggedIn = false;
      });
  }
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;

// Redux Selectors
export const selectLoginStatus = (state: RootState) => state.login.status;
export const selectLoginError = (state: RootState) => state.login.error;
