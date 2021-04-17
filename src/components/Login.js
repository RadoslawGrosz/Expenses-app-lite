import React from "react";
import AuthenticationService from "../security/AuthenticationService";
import "../css/login.css";
import { useDispatch } from "react-redux";
import { setUser } from "../actions/user";

const Login = ({ setIsLoginFormVisible }) => {
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    const loggedUser = await AuthenticationService.logIn(e);
    dispatch(setUser(loggedUser));
  };

  const handleHideLoginForm = (e) => {
    if (e.target !== e.currentTarget) return;
    setIsLoginFormVisible(false);
  };

  return (
    <div className="login-form" onClick={handleHideLoginForm}>
      <form onSubmit={handleLogin} className="login-form__form">
        <h1 className="login-form__form__title">Zaloguj się</h1>
        <input
          name="login"
          type="login"
          placeholder="Login"
          className="login-form__form__input"
        />
        <input
          name="password"
          type="password"
          placeholder="Hasło"
          className="login-form__form__input"
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
