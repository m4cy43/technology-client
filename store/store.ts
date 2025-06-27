import { configureStore } from '@reduxjs/toolkit';
import { mainPageApi } from './features/mainPageApi';

export const createStore = () => {
  return configureStore({
    reducer: {
      [mainPageApi.reducerPath]: mainPageApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(mainPageApi.middleware);
    },
  });
};

export const store = createStore();

// Infer the type of makeStore
export type AppStore = ReturnType<typeof createStore>;
// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
