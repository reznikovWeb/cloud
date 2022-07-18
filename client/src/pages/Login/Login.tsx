import React, {useState} from "react";
import Input from "../../components/Input/Input";
import {getUserRoutine} from "../../store/authSlice";
import {useDispatch} from "react-redux";
import styles from "./Login.module.scss";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const dispatch = useDispatch();

    return (
        <div className={styles.login}>
            <form className={styles.form}>
                <h1 className={styles.form__title}>Login</h1>
                <div className={styles.form__item}>
                    <label>Введите email:</label>
                    <Input
                        type="text"
                        value={email}
                        onChange={setEmail}
                        placeholder="Введите email"
                    />
                </div>

                <div className={styles.form__item}>
                    <label>Введите пароль:</label>
                    <Input
                        type="password"
                        value={password}
                        onChange={setPassword}
                        placeholder="Введите пароль"
                    />
                </div>

                <button
                    type="submit"
                    className={styles.form__btn}
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(getUserRoutine({email, password}));
                    }}
                >
                    Войти
                </button>
            </form>
        </div>
    );
};

export default Login;
