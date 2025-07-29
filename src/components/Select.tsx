import * as React from "react";
import ListDivider from "@mui/joy/ListDivider";
import { Select as MUISelect, SelectOption } from "@mui/joy";
import Option from "@mui/joy/Option";
import { FC } from "react";
import { Box } from "@mui/material";
import { Category } from "@/types";

type SelectProps = {
  options: Category[];
  field: {
    name: string;
    value: string;
    onChange: (value: any) => void;
    onBlur: () => void;
    ref: React.Ref<any>;
  };
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

export const Select: FC<SelectProps> = ({ options, field }) => {
  return (
    <MUISelect

      {...field}
      value={field.value ?? ""}
      onChange={(_, newValue) => field.onChange(newValue)}
      size="sm"
      variant="soft"
      renderValue={(selected) => {
        if (!selected) return null;

        const selValue = typeof selected === 'object'
          ? selected.value
          : String(selected);
        const o = options.find(opt => opt.id === selValue) ?? null;
        return o ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 16, height: 16,
                backgroundColor: o.color,
                borderRadius: '50%', mr: 1,
                m: 0,
                outline: o.color === '#ffffff' ? '1px solid #999' : undefined,
              }}
            />
            {o.name}
          </Box>
        ) : null;
      }}

    >
      {options.map((o, idx) => (
        <Box key={o.id} p='0'>
          {idx > 0 && <ListDivider inset="startContent" />}
          <Option value={o.id.toString()} label={o.name} >
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: o.color,
                borderRadius: "50%",
                mr: 1,
                outline: o.color === "#ffffff" ? "1px solid #d7d7d7" : undefined,
              }}
            />
            {o.name}
          </Option>
        </Box>
      ))}
    </MUISelect>
  );
};
