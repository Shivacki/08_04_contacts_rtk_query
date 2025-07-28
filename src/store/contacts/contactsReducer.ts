// import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ContactDto } from 'src/types/dto/ContactDto';
import { FETCH_PATHS } from 'src/constants/fetchPaths'


export const contactsApiSlice = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({baseUrl: FETCH_PATHS.base}),
  endpoints: (builder) => ({ 
    getContacts: builder.query<ContactDto[], void>({    // типизируем возвращаемые из query данные (ContactDto[]) и то, что query без пар-ров (void)
      query: () => ({url: FETCH_PATHS.contactsShort})
    }),
  }),
});

export const { useGetContactsQuery } = contactsApiSlice;

