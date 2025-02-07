export type Item = {
  id: number;
  name?: string;
  price: number;
  category: number;
  date: string;
};

export type ExpsState = {
  items: Item[];
  totalMonthPrice: { date: string; total: number }[];
  totalDayPrice: { date: string; total: number }[];
};
