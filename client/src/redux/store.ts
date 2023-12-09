import { configureStore } from '@reduxjs/toolkit';
import { animesApi } from './animes';
import { loginApi } from './signin';
import { authApi } from './signup';

export const store = configureStore({
  reducer: {
    [authApi?.reducerPath]: authApi.reducer,
    [animesApi?.reducerPath]: animesApi.reducer,
    [loginApi?.reducerPath]: loginApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      animesApi.middleware,
      loginApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
