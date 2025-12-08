import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api01.f8team.dev/api"
  }),
endpoints: (builder) => ({
  register: builder.mutation({
    query: (body) => ({
      url: "/auth/register",
      method: "POST",
      body,
    }),
  }),
  login: builder.mutation({
    query: (body) => ({
      url: "/auth/login",
      method: "POST",
      body,
    }),
  }),
  getCurrentUser: builder.query({
    query: () => ({ url: "/auth/me" }),
  }),
}),
});

export const { useRegisterMutation } = authApi;
export const { useLoginMutation, useGetCurrentUserQuery } = authApi;
export default authApi;


