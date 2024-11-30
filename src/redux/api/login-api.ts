import { api } from ".";

const loginApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: `${import.meta.env.VITE_BASE_URL_AUTH}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ERP"],
    }),
  }),
});

export const { useLoginMutation } = loginApi;
