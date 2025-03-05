"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { Button, Input } from "@mui/material";
import { useForm } from "react-hook-form";
import { MuiColorInput } from "mui-color-input";
import { addCategoryToDB, fetchCategory } from "@/redux/slices/category";

type Inputs = {
  name: string;
  color: string;
};

const Test3 = () => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("#ffffff");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategory());
      setLoading(false);
    };

    fetchData();
  }, [categories]);

  const onSubmit = (data: Inputs) => {
    console.log(data);
    dispatch(addCategoryToDB(data));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Categories:</h2>
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <p>
              {category.name} - {category.color}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Category"
          {...register("name", { required: true })}
        />

        <MuiColorInput
          value={value}
          onChange={handleChange}
          format="hex"
          variant="standard"
          {...register("color", { required: true })}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Test3;
