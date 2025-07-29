import { Box, Button,  Stack, styled, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { MuiColorInput } from "mui-color-input";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { PageType } from "../types/index";
import style from "./Right.module.scss";
import { Input } from "./Input";
import { addCategoryToDB, deleteCategoryFromDB } from "@/redux/slices/category";
import { Grid } from "@mui/joy";
import { deleteExpFromDB } from "@/redux/slices/exp";
import { Table, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { enqueueSnackbar } from "notistack";

type Inputs = {
  name: string;
  color: string;
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: 'none',
  '&:nth-of-type(odd)': {
    bgcolor: '#f5f5f5'
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.background.paper,
  },
}));

export const Right: FC<PageType> = ({ loading, selectedDate, setSelectedDate }) => {
  // const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  // const [lastFetchedDate, setLastFetchedDate] = useState("");
  // const [dailyTotals, setDailyTotals] = useState([]);
  const items = useSelector((state: RootState) => state.exp.items);

  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const categoryMap = React.useMemo(() => {
    const m: Record<string, { name: string; color: string }> = {};
    categories.forEach(c => {
      m[c.id] = { name: c.name, color: c.color };
    });
    return m;
  }, [categories]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log(data);
     dispatch(addCategoryToDB(data))
        .unwrap().then((payload) => {
    enqueueSnackbar('保存に成功しました！', { variant: 'success' });
  })
        .catch((err) => {
          console.error("保存失敗:", err);
          enqueueSnackbar('保存に失敗しました', { variant: 'error' });
        })
        .finally(() => {
          window.location.reload();
        });
  };


  const date = new Date(selectedDate);
  const dayOfMonth = date.getDate();  

  const matchedTotals = items.filter(item => item.date === selectedDate);
  const onItemDelete = (id) => {
    dispatch(deleteExpFromDB(id))
  }
  const onCategoryDelete = (id) => {
    dispatch(deleteCategoryFromDB(id))
  }

  return (
    <Box className={style.rightStyle}>
      <Box bgcolor="#74839F" height="44px" />

      <Box
        display="flex"
        margin='0 20px'
        marginTop="-20px"
        justifyContent="space-between"
        columnGap="16px"
      >
        <Box borderRadius='999px' bgcolor='#e38635' width='40px' height='40px' marginLeft='auto' />
      </Box>
      <Box width='100%' minWidth='260px' m="auto" padding='16px 20px 30px' display='flex' justifyContent='space-between' flexDirection='column' height='calc(100% - 64px)' boxSizing='border-box'>

        <Box width='100%' minWidth='260px' height='150px' minHeight='100px' overflow='hidden'>
          <Typography fontWeight="bold" margin='0 0 10px' textAlign='center'>{dayOfMonth}日</Typography>
          <Box overflow='scroll' bgcolor='#f5f5f5'
            height='100%'
            sx={{
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },

            }}>
            <TableContainer>
              <Table>
                <TableBody >
                  {matchedTotals.map((i, idx) => {
                    const cat = categoryMap[i.categoryId] ?? { name: '未分類', color: '#ccc' };
                    return (
                      <StyledTableRow key={i.id} sx={{
                        '&:hover .deleteBtn': {
                          visibility: 'visible',
                        },

                      }}>
                        <TableCell sx={{ padding: '6px', border: 'none', maxWidth: '50px' }}>
                          <Grid container alignItems="center">
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Box
                                sx={{
                                  width: 16,
                                  height: 16,
                                  minWidth: 16,
                                  bgcolor: cat.color,
                                  borderRadius: '50%',
                                  outline: cat.color === '#ffffff' ? '1px solid #d7d7d7' : undefined,
                                }}
                              />
                              <Typography variant="body2" fontSize='12px' width='fit-content' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '50px' }}>{cat.name}</Typography>
                            </Stack>
                          </Grid>
                        </TableCell>
                        <TableCell sx={{ padding: '0px', width: '24px', minWidth: 0, border: 'none' }}>
                          <Box>
                            <Button className="deleteBtn" onClick={() => onItemDelete(i.id)} size="small" sx={{ height: '100%', width: '24px', padding: '4px 0', minWidth: '24px', fontSize: '10px', color: '#EC5E6C', visibility: 'hidden', '&:hover': { backgroundColor: '#EC5E6C11' } }}>削</Button>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ padding: '6px 6px 6px 0', border: 'none' }}>
                          <Typography variant="body2" fontSize='12px'>{i.name}</Typography>
                        </TableCell>

                        <TableCell sx={{ padding: '6px 10px 6px 6px', border: 'none' }}>
                          <Typography variant="body2" fontSize='12px' color="#F27979" fontWeight='bold' textAlign='right'>¥{i.price}</Typography>
                        </TableCell>

                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box width="56%" m="30px auto" minWidth='170px'>
            <Stack gap={2}>
              <Typography fontWeight="bold">カテゴリを追加</Typography>
              <Input
                placeholder="Category"
                {...register("name", { required: true })}
              />

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
        {/* </Box> */}
        <Box width='260px' m='0 auto'>
          <Box
            bgcolor="#fafafa"
            p="18px"
            borderRadius="14px"
            maxHeight="100px"
            overflow="scroll"
            minHeight="100px"
            sx={{
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}

          >
            <Stack rowGap="8px">
              <Grid container spacing={1}>
                {categories.map((c) => (
                  <Grid xs={6} key={c.id}>
                    <Stack direction="row" columnGap="8px" width="fit-content" sx={{
                    alignItems:'center',
                        '&:hover .deleteBtn': {
                          visibility: 'visible',
                        },

                      }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          minWidth: 16,
                          bgcolor: c.color,
                          borderRadius: '50%',
                          outline: c.color === '#ffffff' ? '1px solid #d7d7d7' : undefined,
                        }}
                      />
                      <Typography variant="body2" fontSize='13px' width='fit-content'>{c.name}</Typography>
                      <Box>
                        <Button className="deleteBtn" onClick={() => onCategoryDelete(c.id)} size="small" sx={{ height: '100%', width: '24px', padding: '4px 0', minWidth: '24px', fontSize: '10px', color: '#EC5E6C', visibility: 'hidden', '&:hover': { backgroundColor: '#EC5E6C11' } }}>削</Button>
                      </Box>
                    </Stack>


            
                  </Grid>
                ))}
              </Grid>
            </Stack>

          </Box>
        </Box>
      </Box>

    </Box >
  );
};
