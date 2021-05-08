import React, { useState } from "react";
import "../css/login.css";
import { fetchUser } from "../store/userSlice";
import useAuthentication from "../hooks/useAuthentication";
import { useAppDispatch } from "../store/store";

const Login = () => {
  useAuthentication();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchUser({ login, password }));
  };

  return (
    <div className="login-form">
      <form onSubmit={handleLogin} className="login-form__form">
        <h1 className="login-form__form__title">Zaloguj się</h1>
        <input
          name="login"
          type="login"
          placeholder="Login"
          value={login}
          className="login-form__form__input"
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Hasło"
          value={password}
          className="login-form__form__input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          name="submit"
          value="Zaloguj"
          type="submit"
          className="login-form__form__button"
        />
      </form>
    </div>
  );
};

export default Login;
