"use client";
import { Left } from "@/components/Left";
import { Middle } from "@/components/Middle";
import { Right } from "@/components/Right";
import { getCurrentDateLocal } from "@/hooks/useCurrentDate";
import { fetchCategory } from "@/redux/slices/category";
import { fetchExp } from "@/redux/slices/exp";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";



// const Home = () => {
//   const [loading, setLoading] = useState(true);
//   const [selectedDate, setSelectedDate] = useState('')
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const fetchData = async () => {
//       await dispatch(fetchCategory());
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       await dispatch(fetchExp());
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   return (
//     <Box display="flex" height="100vh">
//       <Left loading={loading} />
//       <Middle loading={loading} selectedDate={selectedDate} />
//       <Right loading={loading} selectedDate={selectedDate} />
//     </Box>
//   );
// };



const Home = () => {
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
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

  useEffect(() => {
    setSelectedDate(getCurrentDateLocal());
  }, []);

  return (
    <Box display="flex" height="100vh">
      <Left
        loading={loading}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Middle
        loading={loading}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Right
        loading={loading}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </Box>
  );
};
export default Home;