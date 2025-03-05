"use client";

import { addExpToDB } from "@/redux/slices/exp";
import { RootState } from "@/redux/store";
import {
  Box,
  Button,
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "./Select";
import { SumBox } from "./SumBox";
import { getCurrentMonth } from "@/hooks/useCurrentDate";
import { PageType } from "@/types";
import { Input } from "./Input";
import style from "./Left.module.scss";

type Inputs = {
  price: number;
  category: string;
  name?: string;
};
export const Left: FC<PageType> = ({ loading }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      price: 0, // 初期値を設定
    },
  });
  console.log("フォームエラー:", errors);

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
    console.log("onSubmit が呼ばれました"); // このログを確認
    console.log("送信データ:", data);

    const newItem = {
      name: data.name,
      price: Number(data.price),
      category: data.category,
      date: new Date().toISOString().slice(0, 10),
    };

    dispatch(addExpToDB(newItem));
  };

  return (
    <Box className={style.leftStyle}>
      <Box bgcolor="#74839F" height="120px" p="70px 0 30px">
        <Container maxWidth="sm">
          <Typography fontSize="30px" fontWeight="bold" color="#fff">
            家計簿
          </Typography>
        </Container>
      </Box>
      <Container>
        <Box
          display="flex"
          marginTop="-50px"
          justifyContent="space-between"
          columnGap="20px"
        >
          <SumBox color="skyblue">
            <div>
              <span>収入</span>
              <Typography>¥10,000</Typography>
            </div>
          </SumBox>
          <SumBox color="pink">
            <div>
              <span>支出</span>
              {loading ? (
                <Skeleton />
              ) : (
                <Typography>
                  ¥
                  {totalMonthPrice
                    .filter((t) => t.date.startsWith(getCurrentMonth()))
                    .map((item) => item.total)}
                </Typography>
              )}
            </div>
          </SumBox>
        </Box>
      </Container>
      {/* <Container> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box width="66%" m="60px auto">
          <Stack gap={2}>
            <Typography fontWeight="bold">アイテムを追加</Typography>

            <Controller
              name="price"
              control={control}
              rules={{ required: "価格は必須です" }}
              render={({ field }) => <Input {...field} placeholder="1000" />}
            />
            {errors.price && errors.price.message}
            <Input placeholder="洗剤" {...register("name")} />
            <Select options={categories} {...register("category")} />

            <Stack direction="row" spacing={2} m="10px auto">
              <Button type="submit" variant="contained" disableElevation>
                追加
              </Button>
              <Button type="reset">キャンセル</Button>
            </Stack>
          </Stack>
        </Box>
      </form>
      {/* </Container> */}
    </Box>
  );
};
