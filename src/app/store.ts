import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import giphyReducer from '../features/giphy-browser/slice';

export const store = configureStore({
  reducer: {
    giphy: giphyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
