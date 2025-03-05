import * as React from "react";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import { Select as MUISelect, SelectOption } from "@mui/joy";
import Option from "@mui/joy/Option";
import { FC } from "react";
import { Box } from "@mui/material";
import { Category } from "@/types";

type SelectProps = {
  options: Category[];
};

function renderValue(o: (SelectOption<string> & Category) | null) {
  if (!o) return null;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          width: 16,
          height: 16,
          backgroundColor: o.color,
          borderRadius: "50%",
          marginRight: 1,
          outlineOffset: "-1px",
          outline: o.color === "#ffffff" ? "1px solid #999" : undefined,
        }}
      />
      {o.name}
    </Box>
  );
}

export const Select: FC<SelectProps> = ({ options }) => {
  return (
    <MUISelect
      placeholder={options[0]?.name}
      size="sm"
      variant="soft"
      slotProps={{
        listbox: {
          sx: {
            backgroundColor: "#fff",
            maxHeight: "160px",
          },
        },
      }}
      sx={{ padding: "0 12px" }}
      renderValue={(selected) => {
        const selectedCategory = options.find(
          (o) => o.id.toString() === selected?.value
        );
        return renderValue(selectedCategory ?? null);
      }}
    >
      {options.map((o, index) => (
        <Box key={o.id}>
          {index !== 0 && <ListDivider inset="startContent" />}
          <Option
            value={o.id.toString()}
            label={o.name}
            sx={{
              backgroundColor: "#fff",
              alignItems: "center",
              lineHeight: "16px",
            }}
          >
            {/* <ListItemDecorator> */}
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: o.color,
                borderRadius: "50%",
                outlineOffset: "-1px",
                outline:
                  o.color === "#ffffff" ? "1px solid #d7d7d7" : undefined,
              }}
            />
            {/* </ListItemDecorator> */}
            {o.name}
          </Option>
        </Box>
      ))}
    </MUISelect>
  );
};
