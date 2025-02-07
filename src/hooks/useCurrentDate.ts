import { useState, useEffect } from "react";
import axios from "axios";

const getCurrentDateFromAPI = async () => {
  try {
    const response = await axios.get("/api/getDate");
    return response.data.currentDate;
  } catch (error) {
    console.error("Error fetching date:", error);
    return null;
  }
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  return currentDate.toISOString();
};

export const getCurrentMonth = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // 月は0始まりなので1を足す
  return `${year}-${month}`;
};

export const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<string>(getCurrentMonth());

  useEffect(() => {
    const fetchDate = async () => {
      const date = await getCurrentDateFromAPI();
      setCurrentDate(date);
    };

    fetchDate();
  }, []);

  return { currentDate, currentMonth };
};
