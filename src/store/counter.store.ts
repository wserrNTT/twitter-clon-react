import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  count: number;
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0
  } as CounterState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    incrementBy: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    }
  }
});

export const { increment, incrementBy } = counterSlice.actions;

export default counterSlice.reducer;
