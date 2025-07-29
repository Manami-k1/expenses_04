"use client";

import { addExpToDB } from "@/redux/slices/exp";
import { RootState } from "@/redux/store";
import {
  Box,
  Button,
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
import { useSnackbar } from "notistack";

type Inputs = {
  price: number;
  category: string;
  name?: string;
};
export const Left: FC<PageType> = ({ loading, selectedDate, setSelectedDate }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
    name: '',
    price: 0,     
    category: ''
  }
  });
  console.log("フォームエラー:", errors);


  const totalMonthExp = useSelector((state: RootState) => {
    if (!state.exp) {
      console.warn("Redux state.exp is undefined");
      return [];
    }
    return state.exp.totalMonthPrice ?? [];
  });
  // const totalDayPrice = useSelector(
  //   (state: RootState) => state.exp.totalDayPrice
  // );
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const onSubmit = (data: Inputs) => {
    console.log("onSubmit が呼ばれました"); // このログを確認
    console.log("送信データ:", data);


    const newItem = {
      name: data.name,
      price: Number(data.price),
      categoryId: data.category,
      date: selectedDate
    };
     dispatch(addExpToDB(newItem)).then((payload) => {
    enqueueSnackbar('保存に成功しました！', { variant: 'success' });
     window.location.reload();
  })
    .catch((err) => {
      console.error("保存失敗:", err);
      enqueueSnackbar('保存に失敗しました', { variant: 'error' });
    })

  };



  return (
    <Box className={style.leftStyle}>
      <Box bgcolor="#74839F" height="110px" p="66px 0 16px">
        <Box width='260px' m='auto'>
          <Typography fontSize="26px" fontWeight="bold" color="#fff">
            家計簿
          </Typography>
        </Box>
      </Box>
      <Box width='260px' m='auto'>
        <Box
          display="flex"
          marginTop="-50px"
          justifyContent="space-between"
          columnGap="16px"
        >
          <SumBox color="skyblue">
            <span>収入</span>
            <Typography><span>¥&nbsp;</span>120,000</Typography>

          </SumBox>
          <SumBox color="pink">
            <span>支出</span>
            {loading ? (
              <Skeleton />
            ) : (
              <Typography>
                <span>¥&nbsp;</span>
                {totalMonthExp
                  .filter((t) => t.date.startsWith(getCurrentMonth()))
                  .map((item) => item.total)
                }
              </Typography>
            )}
          </SumBox>
        </Box>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box width="56%" m="60px auto">
          <Stack gap={2}>
            <Typography fontWeight="bold">アイテムを追加</Typography>
            <Box display='flex' columnGap='6px'>
              <Controller
                name="price"
                control={control}
                rules={{ required: "価格は必須です" }}

                render={({ field }) => <Input {...field} placeholder="1000" sx={{'& input:-webkit-autofill': {
                    width: '108px !important',
                  }
                }} />}
              />
              <Box bgcolor='#EAABAB' color='#fff' fontWeight='bold' minWidth='34px' textAlign='center' lineHeight='32px' borderRadius='6px' fontSize='12px'>支出</Box>
            </Box>
            {errors.price && errors.price.message}
            <Input placeholder="洗剤" {...register("name")} />
            <Controller
              name="category"
              control={control}
              rules={{ required: "カテゴリを選択してください" }}
              render={({ field }) => (
                <Select options={categories} field={field} />
              )}
            />
            {errors.category && errors.category.message}
            <Typography textAlign='right'>{selectedDate}</Typography>
            <Stack direction="row" spacing={2} m="10px auto">
              <Button type="submit" variant="contained" disableElevation>
                追加
              </Button>
              <Button type="reset">キャンセル</Button>
            </Stack>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};
