import { StrapiCompanyResponse, StrapiMainPageResponse } from '@/types/strapi';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const buildStrapiQuery = (
  endpoint: string,
  options: {
    populate?: string[] | '*' | 'deep';
    fields?: string[];
    filters?: Record<string, never>;
    sort?: string[];
    pagination?: { page?: number; pageSize?: number };
  }
) => {
  const params = new URLSearchParams();

  if (options.populate) {
    if (typeof options.populate === 'string') {
      params.append('populate', options.populate);
    } else {
      // Use indexed notation for multiple populate parameters
      options.populate.forEach((field, index) => {
        params.append(`populate[${index}]`, field);
      });
    }
  }

  if (options.fields) {
    params.append('fields', options.fields.join(','));
  }

  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      params.append(`filters[${key}]`, String(value));
    });
  }

  if (options.sort) {
    options.sort.forEach((field) => params.append('sort', field));
  }

  if (options.pagination) {
    if (options.pagination.page) {
      params.append('pagination[page]', options.pagination.page.toString());
    }
    if (options.pagination.pageSize) {
      params.append(
        'pagination[pageSize]',
        options.pagination.pageSize.toString()
      );
    }
  }

  return `${endpoint}?${params.toString()}`;
};

export const strapiApi = createApi({
  reducerPath: 'strapiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_STRAPI_HOST}/api`,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
  }),
  endpoints: (builder) => ({
    getMainPage: builder.query<StrapiMainPageResponse, void>({
      query: () => {
        return buildStrapiQuery('main-page', {
          populate: [
            'hero.image',
            'aboutUs.image',
            'whatWeDo.image',
            'whyChooseUs.image',
            'closing.image',
          ],
        });
      },
    }),
    getGlobalData: builder.query<StrapiCompanyResponse, void>({
      query: () => {
        return buildStrapiQuery('global', {
          populate: '*',
        });
      },
    }),
  }),
});

export const { useGetMainPageQuery, useGetGlobalDataQuery } = strapiApi;
