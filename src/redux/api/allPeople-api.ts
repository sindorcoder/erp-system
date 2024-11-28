import { api } from ".";

const allPeopleApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllPeople: build.query<any, void>({
            query: () => ({
                url: "/contracts/all",
            }),
            providesTags: ["ERP"]
        })
    })
})

export const { useGetAllPeopleQuery } = allPeopleApi;
