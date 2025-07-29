import { Category } from '@/types'
import { api } from './baseApi'

const categoriesApi = api.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query<Category[], void>({
            query: () => 'categories',
            providesTags: ['Categories']
        })
    }),
    overrideExisting: false
})

export const { useGetCategoriesQuery } = categoriesApi