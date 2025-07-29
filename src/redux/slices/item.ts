// import { createSelector } from '@reduxjs/toolkit'
// import { RootState } from '@/redux/store'

// const selectItems = (state: RootState) => state.item.items

// export const selectTotalMonthPrice = createSelector(
//     [selectItems, (_: RootState, year: number, month: number) => ({ year, month })],
//     (items, { year, month }) =>
//         items
//             .filter(i => {
//                 const d = new Date(i.date)
//                 return d.getFullYear() === year && d.getMonth() + 1 === month
//             })
//             .reduce((sum, i) => sum + i.price, 0)
// )

// export const selectTotalDayPrice = createSelector(
//     [selectItems, (_: RootState, year: number, month: number, day: number) => ({ year, month, day })],
//     (items, { year, month, day }) =>
//         items
//             .filter(i => {
//                 const d = new Date(i.date)
//                 return d.getFullYear() === year && d.getMonth() + 1 === month && d.getDate() === day
//             })
//             .reduce((sum, i) => sum + i.price, 0)
// )


// export const { totalMonthExp, totalDayExp, addExp } = expSlice.actions;
// export const expReducer = expSlice.reducer;

