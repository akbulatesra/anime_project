import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/url';

export const addAnimeApi = createApi({
  reducerPath: 'addAnimeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Token', '1');

      return headers;
    },
  }),

  endpoints: (builder) => ({
    addAnime: builder.mutation<
      {
        data: string;
      },
      {
        malId: number;
        title: string;
      }
    >({
      query: (newBody) => ({
        url: '/api/anime/add',
        method: 'POST',
        body: newBody,
      }),
    }),
  }),
});

export const { useAddAnimeMutation } = addAnimeApi;
