import { Item } from '@/types'
import { api } from './baseApi'

const itemsApi = api.injectEndpoints({
    endpoints: builder => ({
        getItemsByMonth: builder.query<Item[], { year: number, month: number }>({
            query: ({ year, month }) => `items?year=${year}&month=${month}`,
            providesTags: (res, err, arg) => res?.length ? [{ type: 'Items', id: `month-${arg.year}-${arg.month}` }] : []
        }),
        getItemsByDay: builder.query<Item[], { year: number, month: number, day: number }>({
            query: ({ year, month, day }) => `items?year=${year}&month=${month}&day=${day}`,
            providesTags: (res, err, arg) => res?.length ? [{ type: 'Items', id: `day-${arg.year}-${arg.month}-${arg.day}` }] : []
        })
    }),
    overrideExisting: false
})

export const { useGetItemsByMonthQuery, useGetItemsByDayQuery } = itemsApi