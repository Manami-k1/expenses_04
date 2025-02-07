"use client";

import { Box, HStack, createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { FC } from "react";

type SelectProps = {
  onChange?: () => void;
};

const SelectValueItem = () => (
  <SelectValueText placeholder="Select movie">
    {(items: Array<{ label: string; color: string }>) => {
      const { label, color } = items[0];
      return (
        <HStack>
          <Box w="16px" h="16px" bg={color} borderRadius="999px" />
          {label}
        </HStack>
      );
    }}
  </SelectValueText>
);

export const Select: FC<SelectProps> = ({ onChange, ...props }) => {
  return (
    <SelectRoot
      collection={frameworks}
      defaultValue={["React.js"]}
      positioning={{ sameWidth: true }}
      {...props}
    >
      <SelectTrigger>
        <SelectValueItem />
      </SelectTrigger>
      <SelectContent portalled={false}>
        {frameworks.items.map((item, i) => (
          <SelectItem item={item} key={i} justifyContent="flex-start">
            <Box w="16px" h="16px" bg={item.color} borderRadius="999px" />
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react", color: "#555" },
    { label: "Vue.js", value: "vue", color: "#d88989" },
    { label: "Angular", value: "angular", color: "#89d8c9" },
    { label: "Svelte", value: "svelte", color: "#5dc98c" },
  ],
  itemToString: (item) => item.label,
  itemToValue: (item) => item.label,
});
