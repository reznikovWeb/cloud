import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div>CLOUD</div>
      <NavLink to="login">Войти</NavLink>
      <NavLink to="registration">Регистрация</NavLink>
    </div>
  );
};

export default Navbar;