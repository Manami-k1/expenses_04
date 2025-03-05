"use client";
import { Left } from "@/components/Left";
import { Middle } from "@/components/Middle";
import { Right } from "@/components/Right";
import { fetchCategory } from "@/redux/slices/category";
import { fetchExp } from "@/redux/slices/exp";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategory());
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchExp());
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Box display="flex" height="100vh">
      <Left loading={loading} />
      <Middle loading={loading} />
      <Right loading={loading} />
    </Box>
  );
};

export default Home;
