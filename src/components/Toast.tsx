import { Button } from "@mui/material";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

export const Toast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("I love snacks.");
  };

  const handleClickVariant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("Success アイテムの追加に成功しました", { variant });
  };

  return (
    <>
      <Button onClick={handleClickVariant("success")}>ボタン</Button>
    </>
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Toast />
    </SnackbarProvider>
  );
}
