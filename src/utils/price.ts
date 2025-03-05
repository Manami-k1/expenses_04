import { Item } from "@/types";

// export const updateTotalPrice = (
//   items: Item[],
//   date: string,
//   currentTotalPrice: { date: string; total: number }[]
// ) => {
//   const totalPrice = items.reduce((sum, item) => {
//     if (item.date.startsWith(date)) {
//       return sum + item.price;
//     }
//     return sum;
//   }, 0);

//   return [
//     ...currentTotalPrice.filter((item) => item.date !== date),
//     { date, total: totalPrice },
//   ];
// };
// export const updateTotalPrice = (
//   items: Item[],
//   currentTotalPrice: { date: string; total: number }[]
// ) => {
//   // 日付ごとにグループ化
//   const groupedByDate = items.reduce((acc, item) => {
//     if (!item.date) return acc; // date が存在しない場合はスキップ
//     const itemDate = item.date.slice(0, 10); // 日付部分だけを抽出 (例: 2025-03-02)

//     if (!acc[itemDate]) {
//       acc[itemDate] = [];
//     }
//     acc[itemDate].push(item.price); // 価格を日付ごとの配列に追加
//     return acc;
//   }, {} as { [key: string]: number[] });

//   // 月ごとにグループ化
//   const groupedByMonth = items.reduce((acc, item) => {
//     if (!item.date) return acc; // date が存在しない場合はスキップ
//     const itemMonth = item.date.slice(0, 7); // 月部分を抽出 (例: 2025-03)

//     if (!acc[itemMonth]) {
//       acc[itemMonth] = [];
//     }
//     acc[itemMonth].push(item.price); // 価格を月ごとの配列に追加
//     return acc;
//   }, {} as { [key: string]: number[] });

//   // 日付ごとの合計を計算
//   const dayResult = Object.keys(groupedByDate).map((key) => {
//     const total = groupedByDate[key].reduce((sum, price) => sum + price, 0);
//     return { date: key, total };
//   });

//   // 月ごとの合計を計算
//   const monthResult = Object.keys(groupedByMonth).map((key) => {
//     const total = groupedByMonth[key].reduce((sum, price) => sum + price, 0);
//     return { date: key, total };
//   });

//   console.log("日付ごとの合計:", dayResult);
//   console.log("月ごとの合計:", monthResult);

//   return { dayResult, monthResult }; // 日付ごとの合計と月ごとの合計を返す
// };

// updateTotalPrice関数
export const updateTotalPrice = (
  items: Item[],
  currentDate: string,
  type: "day" | "month" // 新しくtype引数を追加して、どちらの合計を計算するかを選択できるようにする
) => {
  // 月ごと、日ごとの処理を分ける
  const groupedByDate = items.reduce((acc, item) => {
    if (!item.date) return acc; // date が存在しない場合はスキップ
    const itemKey =
      type === "day" ? item.date.slice(0, 10) : item.date.slice(0, 7); // typeに応じて日付をスライス
    if (!acc[itemKey]) {
      acc[itemKey] = [];
    }
    acc[itemKey].push(item.price); // 価格を日付または月ごとの配列に追加
    return acc;
  }, {} as { [key: string]: number[] });

  // 合計を計算
  return Object.keys(groupedByDate).map((key) => {
    const total = groupedByDate[key].reduce((sum, price) => sum + price, 0);
    return { date: key, total };
  });
};
