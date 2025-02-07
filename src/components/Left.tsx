"use client";

// import { Box, Button, Container, Flex, Input, Text } from "@chakra-ui/react";
// import style from "./Left.module.scss";
// import { SumBox } from "./SumBox";
// import { Select } from "./Select";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { addExp, totalExp } from "@/redux/slices/exp";
// import axios from "axios";

// type Inputs = {
//   price: number;
//   category: string;
//   name: string;
// };

// export const Left = () => {
//   const [date, setDate] = useState("");
//   const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<Inputs>();
//   const onSubmit: SubmitHandler<Inputs> = (data) => {
//     const newItem = {
//       id: Date.now(),
//       date: Date.now(),
//       name: data.name,
//       price: Number(data.price),
//     };
//     // dispatch(addExp(newItem));
//     try {
//       // Next.js API へデータ送信
//       const response = await axios.post("/api/exp", newItem);

//       // 成功時に Redux の状態を更新
//       if (response.status === 200) {
//         dispatch(addExp(newItem));
//       } else {
//         console.error("API error:", response.data);
//       }
//     } catch (error) {
//       console.error("Error sending data:", error);
//     }
//   };

//   const totalPrice = useSelector((state: any) => state.exp.totalPrice);
//   useEffect(() => {
//     const now = new Date(Date.now());

//     const year = now.getFullYear();
//     const month = (now.getMonth() + 1).toString().padStart(2, "0");
//     const day = now.getDate().toString().padStart(2, "0");

//     const formattedDate = `${year}-${month}-${day}`;
//     setDate(formattedDate);
//     dispatch(totalExp());
//   }, []);

//   if (date === null) {
//     return <div>Loading...</div>; // 初期状態
//   }

//   return (
//     <>
//       <Box className={style.leftStyle}>
//         <Box background="#74839F" h="200px" p="50px 0">
//           <Container>
//             <Text as="h1" fontSize="30px" fontWeight="bold" color="#fff">
//               家計簿
//             </Text>
//           </Container>
//         </Box>
//         <Container>
//           <Flex mt="-50px" justify="space-between">
//             <SumBox bg="skyblue">
//               収入
//               <br />
//               ¥10,000
//             </SumBox>
//             <SumBox bg="pink">
//               支出
//               <br />¥{totalPrice}
//             </SumBox>
//           </Flex>
//           <Box p="30px 0">
//             <Text>アイテムを追加</Text>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <Input
//                 placeholder="1000"
//                 {...register("price", { required: true })}
//               />
//               {/* <Input
//                 {...register("date", { required: true })}
//                 value={date}
//                 type="date"
//               /> */}

//               <Select />
//               <Input placeholder="洗剤" {...register("name")} />
//               <Text textAlign="right">{date}</Text>
//               <Button type="submit">追加</Button>
//               <Button>キャンセル</Button>
//             </form>
//           </Box>
//         </Container>
//       </Box>
//     </>
//   );
// };

import { Box, Button, Container, Flex, Input, Text } from "@chakra-ui/react";
import style from "./Left.module.scss";
import { SumBox } from "./SumBox";
import { Select } from "./Select";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { addExp } from "@/redux/slices/exp";
import { useCurrentDate } from "@/hooks/useCurrentDate";

type Inputs = {
  price: number;
  category: string;
  name?: string;
};

export const Left = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const currentDate = useCurrentDate();

    const newItem = {
      id: 1,
      name: data.name ?? "",
      price: Number(data.price),
      category: 1,
      date: currentDate,
    };
    // try {
    //   const response = await axios.post(
    //     "http://localhost:3000/api/exp",
    //     newItem
    //   );

    //   if (response.status === 200) {
    //     dispatch(addExp(newItem));
    //     console.log(newItem);
    //   } else {
    //     console.error("API error:", response.data);
    //   }
    // } catch (error) {
    //   console.error("Error sending data:", error);
    // } finally {
    //   setLoading(false); // ローディング状態を終了
    // }
  };

  const totalPrice = useSelector(
    (state: any) =>
      state.exp.totalMonthPrice.filter((item) => item.date === "2024-01")[0]
        ?.total
  );
  console.log(totalPrice);

  // useEffect(() => {
  // const now = new Date(Date.now());
  // const year = now.getFullYear();
  // const month = (now.getMonth() + 1).toString().padStart(2, "0");
  // const day = now.getDate().toString().padStart(2, "0");
  // const formattedDate = `${year}-${month}-${day}`;
  // setDate(formattedDate);
  // dispatch(totalExp());
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/exp");
        console.log(response);
        // 必要なデータを取得した場合の処理
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // データの取得が完了したらローディング終了
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <div>loading...</div>; // ローディング中は loading... を表示
  }

  return (
    <>
      <Box className={style.leftStyle}>
        <Box background="#74839F" h="200px" p="50px 0">
          <Container>
            <Text as="h1" fontSize="30px" fontWeight="bold" color="#fff">
              家計簿
            </Text>
            {/* <div>
              {totalPrice.map((item) => (
                <div key={item.date}>
                  <p>Date: {item.date}</p>
                  <p>Total: {item.total}</p>
                </div>
              ))}
            </div> */}
          </Container>
        </Box>
        <Container>
          <Flex mt="-50px" justify="space-between">
            <SumBox bg="skyblue">
              収入
              <br />
              ¥10,000
            </SumBox>
            <SumBox bg="pink">
              支出
              <br />¥{/* {totalPrice} */}
            </SumBox>
          </Flex>
          <Box p="30px 0">
            <Text>アイテムを追加</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="1000"
                {...register("price", { required: true })}
              />
              <Select />
              <Input placeholder="洗剤" {...register("name")} />
              {/* <Text textAlign="right"></Text> */}
              <Button type="submit">追加</Button>
              <Button>キャンセル</Button>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
};
