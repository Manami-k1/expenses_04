import { Box, BoxProps } from "@mui/material";
import styled from "styled-components";

// SumBoxPropsインターフェースをBoxPropsから継承し、colorプロパティを追加
interface SumBoxProps extends BoxProps {
  color: string;
}

export const SumBox = styled(Box)<SumBoxProps>`
  border-radius: 14px;
  color: #ffffff;
  width: 100%;
  aspect-ratio: 4 / 3;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.color};
  row-gap: 6px;
  & > div {
    margin: auto;
    min-width: 80px;
    & > span {
      font-size: 14px;
    }
    & > p {
      font-size: 20px;
      font-weight: bold;
    }
  }
`;

export default SumBox;
