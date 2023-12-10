import { configureStore } from '@reduxjs/toolkit';
import { addAnimeApi } from './addAnime';
import { animesApi } from './animes';
import { deleteAnimeApi } from './deleteAnime';
import { loginApi } from './signin';
import { authApi } from './signup';
import { subscribedApi } from './subscribed';
export const store = configureStore({
  reducer: {
    [authApi?.reducerPath]: authApi.reducer,
    [animesApi?.reducerPath]: animesApi.reducer,
    [loginApi?.reducerPath]: loginApi.reducer,
    [addAnimeApi?.reducerPath]: addAnimeApi.reducer,
    [subscribedApi.reducerPath]: subscribedApi.reducer,
    [deleteAnimeApi.reducerPath]: deleteAnimeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      animesApi.middleware,
      loginApi.middleware,
      addAnimeApi.middleware,
      subscribedApi.middleware,
      deleteAnimeApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
