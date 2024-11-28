import { api } from ".";

const allPeopleApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllPeople: build.query<any, void>({
      query: () => ({
        url: import.meta.env.VITE_BASE_URL_GETALL,
      }),
      providesTags: ["ERP"],
    }),
    uploader: build.mutation<any, any>({
      query: (data) => ({
        url: import.meta.env.VITE_BASE_URL_UPLOAD,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ERP"],
    }),
    createContract: build.mutation<any, any>({
      query: (data) => ({
        url: import.meta.env.VITE_BASE_URL_CREATE,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllPeopleQuery,
  useUploaderMutation,
  useCreateContractMutation,
} = allPeopleApi;
