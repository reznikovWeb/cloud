import React, { Dispatch, SetStateAction } from "react";
import styles from "./Input.module.scss";

type InputProps = {
  type: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  placeholder?: string;
};

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className={styles.input}
        placeholder={placeholder}
        required
      />
    </>
  );
};

export default Input;
