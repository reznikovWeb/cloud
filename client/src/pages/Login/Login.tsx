import React, { useState } from "react";
import Input from "../../components/Input/Input";


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div>
      <label>Введите email</label>
      <Input type="text" value={email} onChange={setEmail} />
      <label>Введите пароль</label>
      <Input type="password" value={password} onChange={setPassword} />

      <button>Войти</button>
    </div>
  );
};

export default Login;