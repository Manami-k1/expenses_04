"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import style from "./Middle.module.scss";
import { Box, Skeleton } from "@mui/material";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect } from "react";
import { PageType } from "@/types";

export const Middle: FC<PageType> = ({ loading }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await dispatch(fetchExp());
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, []);

  const totalDayPrice = useSelector(
    (state: RootState) => state.exp.totalDayPrice
  );
  console.log(totalDayPrice);

  const events = totalDayPrice.map((item) => ({
    title: `¥${item.total}`, // titleをtotalに設定
    start: item.date, // startをdateに設定
  }));

  return (
    <Box className={style.middleStyle}>
      <Box maxHeight="500px" height="100%">
        {loading ? (
          <Skeleton />
        ) : (
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locale="ja"
            dayCellContent={(e) => {
              return e.dayNumberText.replace("日", "");
            }}
            height="100%"
            events={events}
          />
        )}
      </Box>
    </Box>
  );
};
