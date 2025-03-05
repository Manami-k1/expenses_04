// "use client";

// import { Box, Button, Stack, Typography } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { MuiColorInput } from "mui-color-input";
// import { FC, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { PageType } from "../types/index";
// import style from "./Left.module.scss";
// import { Input } from "./Input";
// import { addCategoryToDB } from "@/redux/slices/category";

// type Inputs = {
//   name: string;
//   color: string;
// };

// export const Right: FC<PageType> = ({ loading }) => {
//   const [color, setColor] = useState("#ffffff");

//   const handleChange = (newValue) => {
//     setColor(newValue);
//   };

//   const onSubmit = (data: Inputs) => {
//     console.log(data);
//     dispatch(addCategoryToDB(data));
//   };

//   const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<Inputs>();

//   const categories = useSelector(
//     (state: RootState) => state.category.categories
//   );
//   return (
//     <Box className={style.leftStyle}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Box width="66%" m="60px auto">
//           <Stack gap={2}>
//             <Typography fontWeight="bold">カテゴリを追加</Typography>
//             <Input
//               placeholder="Category"
//               {...register("name", { required: true })}
//             />

//             <MuiColorInput
//               value={color}
//               onChange={handleChange}
//               format="hex"
//               variant="standard"
//               {...register("color", { required: true })}
//             />
//             {/* <Input type="color" {...register("color", { required: true })} /> */}
//             <Stack direction="row" spacing={2} m="10px auto">
//               <Button type="submit" variant="contained" disableElevation>
//                 追加
//               </Button>
//               <Button type="reset">キャンセル</Button>
//             </Stack>
//           </Stack>
//         </Box>
//       </form>

//       {/* // <h2>Categories:</h2>

//     // <form onSubmit={handleSubmit(onSubmit)}>
//     //   <Input
//     //     placeholder="Category"
//     //     {...register("name", { required: true })}
//     //   />

//     //   <MuiColorInput
//     //     value={value}
//     //     onChange={handleChange}
//     //     format="hex"
//     //     variant="standard"
//     //     {...register("color", { required: true })}
//     //   />
//     //   <Button type="submit">Submit</Button>
//     // </form>

//     // {categories.map((category) =>
//     //   loading ? (
//     //     <Skeleton key={category.id} />
//     //   ) : (
//     //     <div key={category.id}>
//     //       {category.name} - {category.color}
//     //     </div>
//     //   )
//     // )}

//     // </Container>
//     // </Box> */}
//     </Box>
//   );
// };

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { MuiColorInput } from "mui-color-input";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { PageType } from "../types/index";
import style from "./Left.module.scss";
import { Input } from "./Input";
import { addCategoryToDB } from "@/redux/slices/category";
import { Grid } from "@mui/joy";

type Inputs = {
  name: string;
  color: string;
};

export const Right: FC<PageType> = ({ loading }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log(data);
    dispatch(addCategoryToDB(data));
  };

  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  return (
    <Box className={style.leftStyle}>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box width="66%" m="60px auto">
            <Stack gap={2}>
              <Typography fontWeight="bold">カテゴリを追加</Typography>
              <Input
                placeholder="Category"
                {...register("name", { required: true })}
              />

              {/* Controllerを使用してMuiColorInputをラップ */}
              <Controller
                name="color"
                control={control}
                defaultValue="#ffffff"
                render={({ field }) => (
                  <MuiColorInput
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    format="hex"
                    variant="standard"
                  />
                )}
              />

              <Stack direction="row" spacing={2} m="10px auto">
                <Button type="submit" variant="contained" disableElevation>
                  追加
                </Button>
                <Button type="reset">キャンセル</Button>
              </Stack>
            </Stack>
          </Box>
        </form>
        <Box
          bgcolor="#fafafa"
          p="18px"
          borderRadius="14px"
          maxHeight="160px"
          overflow="scroll"
          minHeight="160px"
        >
          <Stack rowGap="8px">
            <Grid container spacing={1}>
              {categories.map((c) => (
                <Grid xs={6} key={c.id}>
                  <Stack direction="row" columnGap="8px" width="fit-content">
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        backgroundColor: c.color,
                        borderRadius: "50%",
                        outlineOffset: "-1px",
                        outline:
                          c.color === "#ffffff"
                            ? "1px solid #d7d7d7"
                            : undefined,
                      }}
                    />
                    {c.name}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Stack>
          {/* </Box> */}
        </Box>
      </Container>
    </Box>
  );
};
