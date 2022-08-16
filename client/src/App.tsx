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
  // const authLoading = useSelector(authLoadingSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAuthRoutine());
  }, []);

  useEffect(() => {
    if (token) {
      navigate("/disk");
    }
  }, [token]);



  return (
    <div className={styles.app}>
      <Routes>
        {token && (
          <>
            <Route path="/disk" element={<Disk />} />
            <Route path="*" element={<Navigate to={"/disk"} />} />
          </>
        )}

        {!token && (
          <>
            <Route path="/registration" element={<Registration />} />

            <Route path="/login" element={<Login />} />

            <Route path="*" element={<Navigate to={"/login"} />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
