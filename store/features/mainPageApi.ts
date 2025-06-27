import { StrapiMainPageResponse } from '@/types/strapi';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mainPageApi = createApi({
  reducerPath: 'mainPageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://technology-strapi.onrender.com/api/',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
  }),
  endpoints: (builder) => ({
    getMainPage: builder.query<StrapiMainPageResponse, void>({
      query: () => 'main-page?populate=*',
    }),
  }),
});

export const { useGetMainPageQuery } = mainPageApi;
