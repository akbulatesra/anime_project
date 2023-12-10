import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/url';

export interface Anime {
  createdDate?: string;
  episodesAndDuration?: string;
  genres: string[];
  imageUrl: string;
  malId: string;
  preLine?: string;
  title: string;
  id?: string;
}
export const animesApi = createApi({
  reducerPath: 'animesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    listAnimes: builder.query<Anime[], void>({
      query: () => ({
        url: '/api/season',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyListAnimesQuery } = animesApi;
