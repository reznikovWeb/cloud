import React, { useState } from "react";
import Input from "../../components/Input/Input";
import { registration } from "../../api/auth";

const Registration = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div>
      <label>Введите email</label>
      <Input type="text" value={email} onChange={setEmail} />
      <label>Введите пароль</label>
      <Input type="password" value={password} onChange={setPassword} />

      <button
        onClick={() => {
          registration(email, password);
        }}
      >
        Зарегестрироваться
      </button>
    </div>
  );
};

export default Registration;
