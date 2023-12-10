import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/url';

export interface SubscribedAnime {
  lastCheckedEpisodeDate?: string;
  lastCheckedEpisodeNumber: number;
  imageUrl?: string;
  malId: number;
  _id: string;
  title: string;
}

export const subscribedApi = createApi({
  reducerPath: 'subscribedApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    listSubscribedAnimes: builder.query<{ data: SubscribedAnime[] }, void>({
      query: () => ({
        url: '/api/anime/list',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyListSubscribedAnimesQuery } = subscribedApi;
