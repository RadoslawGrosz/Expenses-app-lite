import React, { useEffect } from "react";
import "../css/header.css";
import { setUser } from "../store/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../store/store";

interface Props {
  isNewExpenseFormVisible: boolean;
  setIsNewExpenseFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({
  isNewExpenseFormVisible,
  setIsNewExpenseFormVisible,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isNewExpenseFormVisible) window.scrollTo(0, document.body.scrollHeight);
  }, [isNewExpenseFormVisible]);

  return (
    <header className="site-header">
      <h2 className="site-header__title">Wydatki</h2>
      <ul className="site-header__list">
        <li className="site-header__list__item">
          <button
            className="site-header__list__item__link site-header__list__item__link--add"
            onClick={() => setIsNewExpenseFormVisible(!isNewExpenseFormVisible)}
          >
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="site-header__list__item__link__icon site-header__list__item__link__icon--add"
            />
            Dodaj
          </button>
        </li>
        <li className="site-header__list__item">
          <button className="site-header__list__item__link site-header__list__item__link--login">
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="site-header__list__item__link__icon site-header__list__item__link__icon--login"
              onClick={() => dispatch(setUser({}))}
            />
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
