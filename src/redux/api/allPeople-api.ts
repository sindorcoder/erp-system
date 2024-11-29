import { api } from ".";
import { GetDataTypes } from "../../types";

const allPeopleApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllPeople: build.query<GetDataTypes, string>({
      query: (search) => ({
        url: `${import.meta.env.VITE_BASE_URL_GETALL}?search=${search}`,
      }),
      providesTags: ["ERP"],
    }),
    uploader: build.mutation<GetDataTypes, any>({
      query: (data) => ({
        url: import.meta.env.VITE_BASE_URL_UPLOAD,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ERP"],
    }),
    createContract: build.mutation<GetDataTypes, any>({
      query: (data) => ({
        url: import.meta.env.VITE_BASE_URL_CREATE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ERP"],
    }),
    updateContract: build.mutation<GetDataTypes, any>({
      query: (data) => ({
        url: `${import.meta.env.VITE_BASE_URL_UPDATE}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ERP"],
    }),
    getById: build.query<GetDataTypes, number>({
      query: (id) => ({
        url: `${import.meta.env.VITE_BASE_URL_GETID}/${id}`,
      }),
      providesTags: ["ERP"],
    }),
    getCourse: build.query<GetDataTypes, void>({
      query: () => ({
        url: import.meta.env.VITE_BASE_URL_GETCOURSE,
      }),
    }),
  }),
});

export const {
  useGetAllPeopleQuery,
  useUploaderMutation,
  useCreateContractMutation,
  useUpdateContractMutation,
  useGetByIdQuery,
  useGetCourseQuery,
} = allPeopleApi;
