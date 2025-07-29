// "use client";

// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import style from "./Middle.module.scss";
// import { Box, Skeleton } from "@mui/material";
// // import { RootState } from "@/redux/store";
// import { useDispatch, useSelector } from "react-redux";
// import { FC, useEffect } from "react";
// import { PageType } from "@/types";
// import { setSelectedDate } from "@/redux/slices/date";
// import { fetchExp, selectDailyTotals } from "@/redux/slices/exp";
// import { useAppDispatch } from "@/hooks/useAppDispatch";
// import { RootState } from "@reduxjs/toolkit/query";

// export const Middle: FC<PageType> = ({ loading, selectedDate }) => {

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     await dispatch(fetchExp());
//   //     setLoading(false);
//   //   };

//   //   fetchData();
//   // }, []);
//   const dispatch = useAppDispatch();

//   const handleDateClick = (arg) => {
//     dispatch(setSelectedDate(arg.dateStr)); // Redux に保存
//   };

//   useEffect(() => {
//     dispatch(fetchExp({ year: 2025, month: 6 }));
//   }, []);

//   const dailyTotals = useSelector((state: RootState) =>
//     selectDailyTotals(state, 2025, 6)
//   )

//   const events = dailyTotals.map(item => ({
//     title: `¥${item.total}`,
//     start: item.date,
//     backgroundColor: "transparent",
//     borderColor: "transparent",
//     textColor: "#F27979",
//   }))

//   return (
//     <Box className={style.middleStyle}>
//       <Box maxHeight="500px" height="100%">
//         {loading ? (
//           <Skeleton />
//         ) : (
//           <FullCalendar
//             plugins={[dayGridPlugin, interactionPlugin]}
//             initialView="dayGridMonth"
//             locale="ja"
//             dayCellContent={(e) => {
//               return e.dayNumberText.replace("日", "");
//             }}
//             height="100%"
//             dateClick={handleDateClick}
//             events={events}
//             eventDidMount={(info) => {
//               info.el.style.justifyContent = "flex-end";
//               info.el.style.display = "flex";
//               info.el.style.alignItems = "center";
//               info.el.style.fontSize = "14px";
//             }}
//           />
//         )}
//       </Box>
//     </Box>
//   );
// };

// "use client";

// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import style from "./Middle.module.scss";
// import { Box, Skeleton } from "@mui/material";
// import { FC, useEffect } from "react";
// import { PageType } from "@/types";
// import { fetchExp, selectDailyTotals } from "@/redux/slices/exp";
// import { useAppDispatch } from "@/hooks/useAppDispatch";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store"; // 正しい path に修正

// export const Middle: FC<PageType> = ({ loading, selectedDate, setSelectedDate }) => {
//   const dispatch = useAppDispatch();

//   const handleDateClick = (arg: { dateStr: string }) => {
//     setSelectedDate(arg.dateStr); // Redux を使わず、親の state を更新
//   };

//   useEffect(() => {
//     dispatch(fetchExp({ year: 2025, month: 6 }));
//   }, [dispatch]);

//   const dailyTotals = useSelector((state: RootState) =>
//     selectDailyTotals(state, 2025, 6)
//   );

//   const events = dailyTotals.map(item => ({
//     title: `¥${item.total}`,
//     start: item.date,
//     backgroundColor: "transparent",
//     borderColor: "transparent",
//     textColor: "#F27979",
//   }));

//   return (
//     <Box className={style.middleStyle}>
//       <Box maxHeight="500px" height="100%">
//         {loading ? (
//           <Skeleton />
//         ) : (
//           <FullCalendar
//             plugins={[dayGridPlugin, interactionPlugin]}
//             initialView="dayGridMonth"
//             locale="ja"
//             dayCellContent={(e) => e.dayNumberText.replace("日", "")}
//             height="100%"
//             dateClick={handleDateClick}
//             events={events}
//             eventDidMount={(info) => {
//               info.el.style.justifyContent = "flex-end";
//               info.el.style.display = "flex";
//               info.el.style.alignItems = "center";
//               info.el.style.fontSize = "14px";
//             }}
//           />
//         )}
//       </Box>
//     </Box>
//   );
// };

"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import style from "./Middle.module.scss";
import { Box, Skeleton } from "@mui/material";
import { FC, useEffect } from "react";
import { PageType } from "@/types";
import { fetchExp, totalMonthExp } from "@/redux/slices/exp";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // 正しい path に修正

export const Middle: FC<PageType> = ({ loading, selectedDate, setSelectedDate }) => {
  const dispatch = useAppDispatch();

  const handleDateClick = (arg: { dateStr: string }) => {
    setSelectedDate(arg.dateStr);
  };

  useEffect(() => {
    dispatch(fetchExp({ year: 2025, month: 6 }));
  }, [dispatch]);

  // const dailyTotals = useSelector((state: RootState) =>
  //   selectDailyTotals(state, 2025, 6)
  // );

  const totalDayExp = useSelector((state: RootState) => state.exp.totalDayPrice);

  const events = totalDayExp.map(item => ({
    title: `¥${item.total}`,
    start: item.date,
    backgroundColor: "transparent",
    borderColor: "transparent",
    textColor: "#F27979",
  }));

  return (
    <Box className={style.middleStyle}>
      <Box maxHeight="500px" height="100%">
        {loading ? (
          <Skeleton />
        ) : (
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale="ja"
            dayCellContent={(e) => e.dayNumberText.replace("日", "")}
            height="100%"
            dateClick={handleDateClick}
            events={events}
            eventDidMount={(info) => {
              info.el.style.justifyContent = "flex-end";
              info.el.style.display = "flex";
              info.el.style.alignItems = "center";
              info.el.style.fontSize = "14px";
            }}
          />
        )}
      </Box>
    </Box>
  );
};

