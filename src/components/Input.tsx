// import { Input as MUIInput, InputProps as MUIInputProps } from "@mui/joy";
// import { FC } from "react";
// import styled from "styled-components";

// interface InputType extends MUIInputProps {}

// const MUIInputStyle = styled(MUIInput)`
//   margin: 0;
// `;
// export const Input: FC<InputType> = ({ placeholder }) => {
//   return (
//     <MUIInputStyle
//       variant="soft"
//       size="sm"
//       placeholder={placeholder}
//       slotProps={{
//         root: {
//           style: {
//             margin: 0,
//             padding: "0 12px",
//             display: "block",
//             lineHeight: "32px",
//           },
//         },
//       }}
//     />
//   );
// };

import { FC } from "react";
import { Input as MUIInput, InputProps as MUIInputProps } from "@mui/joy";
import styled from "styled-components";

interface InputType extends MUIInputProps {}

const MUIInputStyle = styled(MUIInput)`
  margin: 0;
`;

export const Input: FC<InputType> = ({
  placeholder,
  value,
  onChange,
  ...props
}) => {
  return (
    <MUIInputStyle
      variant="soft"
      size="sm"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      slotProps={{
        root: {
          style: {
            margin: 0,
            padding: "0 12px",
            display: "block",
            lineHeight: "32px",
          },
        },
      }}
      {...props}
    />
  );
};
