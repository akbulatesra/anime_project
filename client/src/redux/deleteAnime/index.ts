import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/url';

export const deleteAnimeApi = createApi({
  reducerPath: 'deleteAnimeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  endpoints: (builder) => ({
    deleteAnime: builder.mutation<
      void,
      {
        malId: number;
      }
    >({
      query: (newBody) => ({
        url: '/api/anime/delete',
        method: 'DELETE',
        body: newBody,
      }),
    }),
  }),
});

export const { useDeleteAnimeMutation } = deleteAnimeApi;
