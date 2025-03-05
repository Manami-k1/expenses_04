"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const getCurrentDateFromAPI = async () => {
  try {
    const response = await axios.get("/api/getDate");
    console.log(response.data.currentDate);
    return response.data.currentDate;
  } catch (error) {
    console.error("Error fetching date:", error);
    return null;
  }
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  //TODO:ゼロパディング
  const date = ("00" + currentDate.getDate()).slice(-2);
  console.log(date);
  return `${year}-${month}-${date}`;
};

export const getCurrentMonth = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  console.log(month);
  return `${year}-${month}`;
};

export const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<string>(getCurrentMonth());

  useEffect(() => {
    const fetchDate = async () => {
      const date = await getCurrentDateFromAPI();
      console.log(date);
      // const date = new Date();
      setCurrentDate(date);
      setCurrentMonth(date);
    };

    fetchDate();
  }, []);

  return { currentDate, currentMonth };
};
