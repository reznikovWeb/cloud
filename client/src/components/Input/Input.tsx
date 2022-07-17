import React, { Dispatch, SetStateAction } from "react";

type InputProps = {
  type: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

const Input: React.FC<InputProps> = ({ type, value, onChange }) => {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </>
  );
};

export default Input;
