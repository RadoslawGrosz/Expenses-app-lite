import { React, useEffect } from "react";
import "../css/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({
  isNewExpenseFormVisible,
  setIsNewExpenseFormVisible,
  setIsLoginFormVisible,
  user,
  setUser,
}) => {
  const handleToggleForm = () => {
    setIsNewExpenseFormVisible(!isNewExpenseFormVisible);
  };

  const handleLogin = () => {
    if (user.id) return setUser({});
    setIsLoginFormVisible(true);
  };

  useEffect(() => {
    if (isNewExpenseFormVisible) window.scrollTo(0, document.body.scrollHeight);
  }, [isNewExpenseFormVisible]);

  return (
    <header className="site-header">
      <h2 className="site-header__title">Wydatki</h2>
      <ul className="site-header__list">
        <li className="site-header__list__item">
          {user.id && (
            <button
              href=""
              className="site-header__list__item__link site-header__list__item__link--add"
              onClick={handleToggleForm}
            >
              <FontAwesomeIcon
                icon={faPlusCircle}
                className="site-header__list__item__link__icon site-header__list__item__link__icon--add"
              />
              Dodaj
            </button>
          )}
        </li>
        <li className="site-header__list__item">
          <button className="site-header__list__item__link site-header__list__item__link--login">
            <FontAwesomeIcon
              icon={user && user.id ? faSignOutAlt : faSignInAlt}
              className="site-header__list__item__link__icon site-header__list__item__link__icon--login"
              onClick={handleLogin}
            />
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
