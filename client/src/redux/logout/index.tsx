import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { defaultValidateStatus } from '../../utils/query';
import { BASE_URL } from '../../utils/url';

export const logoutApi = createApi({
  reducerPath: 'logoutApi',

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/api/auth/log-out',
        method: 'POST',

        validateStatus: (response) => defaultValidateStatus(response),
      }),
    }),
  }),
});

export const { useLogoutMutation } = logoutApi;
