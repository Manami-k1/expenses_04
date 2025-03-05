export type Item = {
  id: string;
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

export type Category = {
  id: string;
  name: string;
  color: string;
};
export type CategoriesState = {
  categories: Category[];
};

export type PageType = {
  loading: boolean;
};
