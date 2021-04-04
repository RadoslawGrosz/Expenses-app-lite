import { React } from "react";
import "../css/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="site-header">
      <h2 className="site-header__title">Wydatki</h2>
      <ul className="site-header__list">
        <li className="site-header__list__item">
          <button
            href=""
            className="site-header__list__item__link site-header__list__item__link--button"
          >
            {/* <i className="fas fa-plus-circle"></i> */}
            <FontAwesomeIcon icon={faPlusCircle} />
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
