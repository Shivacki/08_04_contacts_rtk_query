// import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { FETCH_PATHS } from 'src/constants/fetchPaths'


export const groupsApiSlice = createApi({
  reducerPath: 'groupsApi',
  baseQuery: fetchBaseQuery({baseUrl: FETCH_PATHS.base}),
  endpoints: (builder) => ({ 
    getGroups: builder.query<GroupContactsDto[], void>({    // типизируем возвращаемые из query данные (ContactDto[]) и то, что query без пар-ров (void)
      query: () => ({url: FETCH_PATHS.groupsShort})
    }),
  }),
});

export const { useGetGroupsQuery } = groupsApiSlice;

