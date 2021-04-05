import { React } from "react";
import "../css/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const Header = ({ isNewExpenseFormVisible, setIsNewExpenseFormVisible }) => {
  const handleToggleForm = () => {
    setIsNewExpenseFormVisible(!isNewExpenseFormVisible);
  };

  return (
    <header className="site-header">
      <h2 className="site-header__title">Wydatki</h2>
      <ul className="site-header__list">
        <li className="site-header__list__item">
          <button
            href=""
            className="site-header__list__item__link site-header__list__item__link--add"
            onClick={handleToggleForm}
          >
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="site-header__list__item__link__icon"
            />
            Dodaj
          </button>
        </li>
        <li className="site-header__list__item">
          <button className="site-header__list__item__link site-header__list__item__link--login">
            Zaloguj
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
