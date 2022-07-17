import React from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
