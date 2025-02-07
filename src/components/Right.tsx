"use client";

import { Box, Button, Input, Text } from "@chakra-ui/react";
import style from "./Right.module.scss";
// import { Select } from "./Select";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  category: string;
  color: string;
};

export const Right = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <Box className={style.rightStyle}>
      <Box p=" 100px 20px 0">
        <Text>カテゴリを追加</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <form> */}
          <Input
            placeholder="カテゴリ名"
            // {...register("category", { required: true })}
          />
          <Input type="color" />
          <Button type="submit">追加</Button>
          <Button>キャンセル</Button>
        </form>
      </Box>
    </Box>
  );
};
