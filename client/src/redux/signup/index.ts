import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { defaultValidateStatus } from '../../utils/query';
import { BASE_URL } from '../../utils/url';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<{ token: string }, FormData>({
      query: (formData) => ({
        url: '/api/auth/register',
        method: 'POST',
        body: formData,
        validateStatus: (response) => defaultValidateStatus(response),
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
