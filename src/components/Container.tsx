import { Box, Container as MUIContainer } from "@mui/material";
import { FC, ReactNode } from "react";

type ContainerType = {
  maxWidth?: number;
  px?: number;
  py?: number;
  children: ReactNode;
};

export const Container: FC<ContainerType> = ({
  maxWidth,
  px = 0,
  py = 0,
  children,
}) => {
  return (
    <Box
      maxWidth={typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth}
      sx={{ px, py }}
    >
      {children}
    </Box>
  );
};
