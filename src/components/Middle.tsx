// "use client";

// import { Box } from "@chakra-ui/react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import style from "./Middle.module.scss";

// export const Middle = () => {
//   return (
//     <Box className={style.middleStyle}>
//       <FullCalendar
//         plugins={[dayGridPlugin]} // pluginsにdayGridPluginを設定する
//         headerToolbar={{
//           right: "dayGridMonth,dayGridWeek",
//         }}
//         initialView="dayGridMonth" // 初期表示のモードを設定する
//         events={"https://fullcalendar.io/api/demo-feeds/events.json"}
//       />
//     </Box>
//   );
// };

"use client";

import { Box } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import style from "./Middle.module.scss";

export const Middle = () => {
  return (
    <Box className={style.middleStyle}>
      <Box maxH="500px" h="100%">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale="ja"
          dayCellContent={(e) => {
            return e.dayNumberText.replace("日", ""); // "日" を削除して日付のみ表示
          }}
          height="100%"
        />
      </Box>
    </Box>
  );
};
