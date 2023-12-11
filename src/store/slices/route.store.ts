import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Hooks
import type { routeName } from '@/common/types';
import type { RootState } from '@/store';

interface routeState {
  currentRoute: routeName;
}
const routeSlice = createSlice({
  name: 'routes',
  initialState: {
    currentRoute: 'home'
  } as routeState,
  reducers: {
    setCurrentRoute: (state: routeState, action: PayloadAction<routeName>) => {
      state.currentRoute = action.payload;
    }
  }
});

export const { setCurrentRoute } = routeSlice.actions;

export default routeSlice.reducer;

export const selectCurrentRoute = (state: RootState) => state.routeStore.currentRoute;
