import React, {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import styles from "./App.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getAuthRoutine} from "./store/authSlice";
import {tokenSelector} from "./store/selectors/auth.selectors";

function App() {
    const token = useSelector(tokenSelector);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAuthRoutine());
    }, []);

    useEffect(() => {
        if (token) {
            navigate("/registration");
        }

    }, [token]);

    return (
        <div className={styles.app}>
            <Routes>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/" element={<Login/>}/>
            </Routes>
        </div>
    );
}

export default App;
