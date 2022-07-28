import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import styles from "./App.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAuthRoutine } from "./store/authSlice";
import {
  authLoadingSelector,
  tokenSelector,
} from "./store/selectors/auth.selectors";
import Disk from "./pages/Disk/Disk";

function App() {
  const token = useSelector(tokenSelector);
  const authLoading = useSelector(authLoadingSelector);

  const dispatch = useDispatch();
  console.log(authLoading);
  useEffect(() => {
    dispatch(getAuthRoutine());
  }, []);

  return (
    <div className={styles.app}>
      {token ? (
        <Routes>
          <Route path="/disk" element={<Disk />} />

          <Route path="*" element={<Navigate to="/disk" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
