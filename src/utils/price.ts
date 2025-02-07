import { Item } from "@/types";

export const updateTotalPrice = (
  items: Item[],
  date: string,
  currentTotalPrice: { date: string; total: number }[]
) => {
  const totalPrice = items.reduce((sum, item) => {
    if (item.date.startsWith(date)) {
      return sum + item.price;
    }
    return sum;
  }, 0);

  return [
    ...currentTotalPrice.filter((item) => item.date !== date),
    { date, total: totalPrice },
  ];
};
