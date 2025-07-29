// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const getCurrentDateFromAPI = async () => {
//   try {
//     const response = await axios.get("/api/getDate");
//     console.log(response.data.currentDate);
//     return response.data.currentDate;
//   } catch (error) {
//     console.error("Error fetching date:", error);
//     return null;
//   }
// };

// export const getCurrentDate = () => {
//   const currentDate = new Date();
//   const year = currentDate.getFullYear();
//   const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
//   //TODO:ゼロパディング
//   const date = ("00" + currentDate.getDate()).slice(-2);
//   console.log(date);
//   return `${year}-${month}-${date}`;
// };

// export const getCurrentMonth = () => {
//   const currentDate = new Date();
//   const year = currentDate.getFullYear();
//   const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
//   console.log(month);
//   return `${year}-${month}`;
// };

// export const useCurrentDate = () => {
//   const [currentDate, setCurrentDate] = useState<string | null>(null);
//   const [currentMonth, setCurrentMonth] = useState<string>(getCurrentMonth());

//   useEffect(() => {
//     const fetchDate = async () => {
//       const date = await getCurrentDateFromAPI();
//       console.log(date);
//       // const date = new Date();
//       setCurrentDate(date);
//       setCurrentMonth(date);
//     };

//     fetchDate();
//   }, []);

//   return { currentDate, currentMonth };
// };

import { useState, useEffect } from "react";
import axios from "axios";

// クライアントローカル時間で YYYY-MM-DD を取得
export const getCurrentDateLocal = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getCurrentMonth = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

export const getCurrentDateFromAPI = async (): Promise<string | null> => {
  try {
    const response = await axios.get("/api/getDate");
    const dateStr = response.data.currentDate;

    // 日付だけに整形（例：2025-06-18T00:00:00.000Z → YYYY-MM-DD）
    const localDate = new Date(dateStr);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error fetching date:", error);
    return null;
  }
};

// ✅ useCurrentDate: APIから取得し、失敗時はローカル
export const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<string>(getCurrentMonth());

  useEffect(() => {
    const fetchDate = async () => {
      const apiDate = await getCurrentDateFromAPI();
      const dateToUse = apiDate || getCurrentDateLocal(); // fallback
      setCurrentDate(dateToUse);
      setCurrentMonth(dateToUse.slice(0, 7)); // YYYY-MM
    };

    fetchDate();
  }, []);

  return { currentDate, currentMonth };
};
