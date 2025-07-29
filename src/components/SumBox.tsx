import { Box, BoxProps } from "@mui/material";
import styled from "styled-components";

// SumBoxPropsインターフェースをBoxPropsから継承し、colorプロパティを追加
interface SumBoxProps extends BoxProps {
  color: string;
}

export const SumBox = styled(Box) <SumBoxProps>`
  border-radius: 14px;
  color: #ffffff;
  width: 100%;
  padding: 0 12px;
  /* aspect-ratio: 4 / 3; */
  height: 94px;
  /* max-width: 130px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.color};
  row-gap: 6px;
  /* & > div {
    margin: 0 14px 0 14px; */
    /* min-width: 80px; */
    & > span {
      font-size: 13px;
      font-weight: bold;
      /* margin: 0 14px; */
    }
    & > p {
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      line-height: 22px;
      & > span {
        font-size: 0.86em;
        /* line-height: 36px; */
      }
      /* margin: 0 14px; */
      /* text-align: right; */
    }
  /* } */
`;

export default SumBox;
