
export type Item = {
  id: string;
  name?: string;
  price: number;
  category: number;
  date: string;
};

type TotalPriceItem = {
  date: string;
  total: number;
};

export type ExpsState = {
  items: Item[];
  totalMonthPrice: TotalPriceItem[];
  totalDayPrice: TotalPriceItem[];
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
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};
