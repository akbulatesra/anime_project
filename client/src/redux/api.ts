import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/url';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<void, FormData>({
      query: (FormData) => ({
        url: '/api/auth/register',
        method: 'POST',
        body: FormData,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
