import React, { FC, ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import style from "./SumBox.module.scss";

interface SumBoxProps extends BoxProps {
  children: ReactNode;
}
export const SumBox: FC<SumBoxProps> = ({ children, ...props }) => {
  return (
    <Box className={style.sumBox} {...props}>
      {children}
    </Box>
  );
};
