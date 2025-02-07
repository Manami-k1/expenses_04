type Item = {
  id: number;
  name: string;
  price: number;
  category: number;
  date: string;
};

type ExpsState = {
  items: Item[];
  totalMonthPrice: [];
  totalDayPrice: [];
};

const data: ExpsState = {
  items: [
    {
      id: 1,
      name: "商品3",
      price: 2000,
      category: 1,
      date: "2025-02-02T12:30:00",
    },
    {
      id: 2,
      name: "商品1",
      price: 1000,
      category: 1,
      date: "2025-02-03T08:15:30",
    },
    {
      id: 3,
      name: "商品2",
      price: 2000,
      category: 1,
      date: "2025-03-03T14:45:00",
    },
  ],
  totalMonthPrice: [],
  totalDayPrice: [],
};

const Test = () => {
  const totalCategoryPrice = data.items.reduce(
    (acc, item) => (item.category === 1 ? acc + item.price : acc),
    0
  );
  const totalMonthPrice = data.items.reduce(
    (acc, item) => (item.date.startsWith("2025-02") ? acc + item.price : acc),
    0
  );
  return (
    <>
      <p>{totalCategoryPrice}</p>
      <p>{totalMonthPrice}</p>
    </>
  );
};

export default Test;
