import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { defaultValidateStatus } from '../../utils/query';
import { BASE_URL } from '../../utils/url';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  tagTypes: ['loginApi'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, FormData>({
      query: (formData) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: formData,
        validateStatus: (response) => defaultValidateStatus(response),
      }),
      invalidatesTags: [
        {
          id: 'loginApi/signIn',
          type: 'loginApi',
        },
      ],
    }),
  }),
});

export const { useLoginMutation } = loginApi;
