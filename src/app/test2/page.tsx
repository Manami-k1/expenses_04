"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { addExpToDB } from "@/redux/slices/exp";
import { Button, Input } from "@mui/material";
import { useForm } from "react-hook-form";
import { Select } from "@/components/Select";

type Inputs = {
  price: number;
  category: string;
  name?: string;
};

const Test2 = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const items = useSelector((state: RootState) => state.exp.items);
  const totalMonthPrice = useSelector(
    (state: RootState) => state.exp.totalMonthPrice
  );
  const totalDayPrice = useSelector(
    (state: RootState) => state.exp.totalDayPrice
  );
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const onSubmit = (data: Inputs) => {
    console.log(data);
    const newItem = {
      name: data.name,
      price: Number(data.price),
      //TODO: slice
      date: new Date().toISOString().slice(0, 10),
    };
    dispatch(addExpToDB(newItem));
  };

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          {item.date}：¥{item.price}
        </div>
      ))}
      <br />
      <>
        <div>
          {totalDayPrice.map((t, index) => (
            <div key={index}>
              {t.date}：{t.total}円
            </div>
          ))}
        </div>
        <div>
          {totalMonthPrice.map((t, index) => (
            <div key={index}>
              {t.date}：{t.total}円
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="1000"
            {...register("price", { required: true })}
          />
          <br />
          <Input placeholder="洗剤" {...register("name")} />
          <Select options={categories} />
          <Button type="submit">追加</Button>
          <Button>キャンセル</Button>
        </form>
      </>
    </div>
  );
};

export default Test2;
